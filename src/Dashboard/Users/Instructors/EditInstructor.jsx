import React, { useEffect, useRef, useState } from 'react'
import profileDefault from '../../../assets/default-profile-picture.jpg';
import { getAllDepartment } from '../../../services/departmentService';
import { editInstructorFun } from '../../../services/usersService';

export default function EditInstructor({instructor,instructorsId,getInstructor,getInstructors,setShowEditModal,setShowProfileModal}) {
    const [form, setForm] = useState({
        name: instructor.name,
        email: instructor.email,
        phone_number: instructor.phone_number,
        nationalId: instructor.nationalId,
        profileImage: instructor.profileImage, 
        department: instructor.department,
        type: instructor.type,
        Gender: instructor.Gender,
        Date_of_Birth: instructor.Date_of_Birth
    });
        
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [departments , setDepartments] = useState([]);
    const originalEmailRef = useRef(instructor.email);
        
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const displayImage = form.profileImage instanceof File
        ? URL.createObjectURL(form.profileImage)
        : form.profileImage || profileDefault;
        
    const fileInputRef = useRef();
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setForm({ ...form, profileImage: file });
        }
    };
    
    const getDepartments = async ()=>{
        try{
            const data = await getAllDepartment();
            setDepartments(data.allDepartments);
        }catch(err){
            console.log("error", err);
            setErrormsg(err.response?.data?.message || "Failed to fetch departments");
        }
    }
    useEffect(()=>{
        getDepartments();
    },[])
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {
            name,
            phone_number,
            nationalId,
            department,
            type,
            Gender,
            Date_of_Birth
        } = form;
    
        if (
            !name.trim() ||
            !phone_number.trim() ||
            !nationalId.trim() ||
            !department ||
            !type 
        ) {
            setErrormsg("Please fill all data!");
            return;
        }
        setLoading(true);
        setErrormsg('')
        const formData = new FormData();
        formData.append("name", form.name);
        if (form.email !== originalEmailRef.current) {
            formData.append("email", form.email);
        }

        formData.append("phone_number", form.phone_number);
        formData.append("nationalId", form.nationalId);
        formData.append("department", form.department); 
        formData.append("type", form.type);
        formData.append("Gender", form.Gender);
        if (form.Date_of_Birth) {
            formData.append(
                "Date_of_Birth",
                new Date(form.Date_of_Birth).toISOString()
            );
        }

        if (form.profileImage instanceof File) {
        formData.append("profileImage", form.profileImage);
        }
        try{
            const data = await editInstructorFun(instructorsId,formData)
            getInstructor();
            setShowEditModal();
            getInstructors();
        }catch(err){
            console.log(err.response?.data);
            if(err.response?.data?.errors && err.response.data.errors.length > 0){
                setErrormsg(err.response.data.errors[0].msg);
            } else {
                setErrormsg(err.response?.data?.msg || "Failed to edit instructor");
            }
        }finally{
                setLoading(false)
            }
    }
    return (
        <div className="modal-boxs">
            {errormsg && <p className="error">{errormsg}</p>}
            <h3>{instructor.name} (instructor)</h3>
    
            <form onSubmit={handleSubmit}>
                <div className='row1'>
                    <div className='imguser'>
                        <img
                            src={displayImage}
                            alt="instructor profile"
                            style={{ cursor: "pointer" }}
                            onClick={handleImageClick}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className='datarow1'>
                        <div className='phone'>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                value={form.name}
                                name='name'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='emailuserin'>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={form.email}
                                name='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='natId'>
                            <label>NationalId:</label>
                            <input
                                type="text"
                                value={form.nationalId}
                                name='nationalId'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
    
                <div className='row2'>
                    <div className='box1'>
                        <div className='phone'>
                            <label>phone:</label>
                            <input
                                type="text"
                                value={form.phone_number}
                                name='phone_number'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='birth'>
                            <label>Birthday Date:</label>
                            <input
                                type="text"
                                value={form.Date_of_Birth? form.Date_of_Birth?.split("T")[0]:'Not defined'}
                                name='Date_of_Birth'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='box2'>
                        <div>
                            <select name="Gender" value={form.Gender} onChange={handleChange}>
                                <option value={form.Gender}>{form.Gender}</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <select name="type" value={form.type} onChange={handleChange}>
                                <option value={form.type}>{form.type}</option>
                                <option value="doctor">Doctor</option>
                                <option value="teaching ">Teaching</option>
                                <option value="assistant">Assistant</option>
                            </select>
                        </div>
                    </div>
                    <div className='box2'>
                        <div>
                            <select name="department" value={form.department} onChange={handleChange}>
                                <option value={form.department}>{form.department}</option>
                                {
                                    departments? 
                                    departments.map(department =>(
                                        <option value={department.name} key={department._id}>{department.name}</option>
                                    ))
                                    : ''
                                }
                            </select>
                        </div>
                    </div>
                </div>
    
                <div className="btns-group">
                    <button type="button" className="left-btn" onClick={() => setShowEditModal(false)}>
                    Cancel
                    </button>
                    <button type="submit" className="right-btn">
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    )
}
    