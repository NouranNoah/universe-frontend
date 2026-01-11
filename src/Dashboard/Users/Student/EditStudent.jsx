import React, { useEffect, useRef, useState } from 'react'
import profileDefault from '../../../assets/default-profile-picture.jpg';
import { getAllDepartment } from '../../../services/departmentService';
import { editStudentFun } from '../../../services/usersService';


export default function EditStudent({student ,StudentId ,getStudent ,setShowEditModal,getStudents}) {
    const [form, setForm] = useState({
        name: student.name,
        email: student.email,
        password: student.password,
        phone_number: student.phone_number,
        nationalId: student.nationalId,
        profileImage: student.profileImage, 
        department: student.department,
        level: student.level,
        Gender: student.Gender,
        Date_of_Birth: student.Date_of_Birth
    });
    
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [departments , setDepartments] = useState([]);
    const originalEmailRef = useRef(student.email);
    
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
            console.log(data.allDepartments);
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
            email,
            phone_number,
            nationalId,
            department,
            level,
            Gender,
            Date_of_Birth
        } = form;

        if (
            !name.trim() ||
            !email.trim()||
            !phone_number.trim() ||
            !nationalId.trim() ||
            !department ||
            !level ||
            !Gender ||
            !Date_of_Birth
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
        formData.append("password", form.password);
        formData.append("phone_number", form.phone_number);
        formData.append("nationalId", form.nationalId);
        formData.append("department", form.department); 
        formData.append("level", form.level);
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
            const data = await editStudentFun(StudentId,formData)
            getStudent();
            setShowEditModal();
            getStudents();
        }catch(err){
            console.log(err.response?.data);
            if(err.response?.data?.errors && err.response.data.errors.length > 0){
                setErrormsg(err.response.data.errors[0].msg);
            } else {
                setErrormsg(err.response?.data?.msg || "Failed to edit student");
            }
        }finally{
            setLoading(false)
        }
    }
return (
    <div className="modal-boxs">
        {errormsg && <p className="error">{errormsg}</p>}
        <h3>{student.name} (Student)</h3>

        <form onSubmit={handleSubmit}>
            <div className='row1'>
                <div className='imguser'>
                    <img
                        src={displayImage}
                        alt="student profile"
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
                            value={form.Date_of_Birth.split("T")[0]}
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
                        <select name="level" value={form.level} onChange={handleChange}>
                            <option value={form.level}>{form.level}</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            {/* <option value="5th Year">5th Year</option> */}
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
