import React, { useEffect, useRef, useState } from 'react'
import profileDefault from '../../../assets/uploadimg.png';
import { getAllDepartment } from '../../../services/departmentService';
import { addInstructorFun } from '../../../services/usersService';


export default function addInstructor({getInstructors, setShowAddModal}) {
    const [errormsg , setErrormsg] = useState('')
    const [departments , setDepartments] = useState([]);
    const [loading , setLoading] = useState(false)
    const [form , setForm] =useState({
        name: "",
        email: "",
        phone_number: "",
        nationalId: "",
        profileImage: profileDefault, 
        department: "", 
        level: "", 
        Gender: "", 
        Date_of_Birth: ""
    })
    
    const handleChange  = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }
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
    const displayImage = form.profileImage instanceof File
        ? URL.createObjectURL(form.profileImage)
        : form.profileImage || profileDefault;
    
    const resetAll = () => {
        setForm({
            name: "",
            email: "",
            phone_number: "",
            nationalId: "",
            profileImage: profileDefault, 
            department: "", 
            type: "", 
            Gender: "", 
            Date_of_Birth: ""
        });
        setErrormsg("");
    };
    
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log('data',form)
        const {
            name,
            email,
            phone_number,
            nationalId,
            department,
            type,
            Gender,
            Date_of_Birth
        } = form;
    
        if (
            !name.trim() ||
            !email.trim() ||
            !phone_number.trim() ||
            !nationalId.trim() ||
            !department ||
            !type
        ) {
            setErrormsg("Please fill all data!");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("phone_number", form.phone_number);
        formData.append("nationalId", form.nationalId);
        formData.append("department", form.department); 
        formData.append("type", form.type);
        formData.append("Gender", form.Gender);
        formData.append("Date_of_Birth", form.Date_of_Birth);

        if (form.profileImage instanceof File) {
        formData.append("profileImage", form.profileImage);
        }

        try{
            const data = await addInstructorFun(formData);
            resetAll(); 
            getInstructors(); 
            setShowAddModal(false);
        }catch(err){
            console.log(err.response?.data);
            if(err.response?.data?.errors && err.response.data.errors.length > 0){
                setErrormsg(err.response.data.errors[0].msg);
            } else {
                setErrormsg(err.response?.data?.msg || "Failed to add Instructor");
            }
        }finally{
            setLoading(false);
        }
    }

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

    return (
        <div className="modal-boxs">
            <i
                className="closeicon fa-solid fa-xmark"
                onClick={() => setShowAddModal(false)}
            ></i>
            <h3>Add New Instructor</h3>
    
            {errormsg && <p className="error">{errormsg}</p>}

            <form onSubmit={handleSubmit}>
                <div className='row1'>
                    <div className='imguser'>
                        <img
                        src={displayImage}
                        alt="Instructor profile"
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
                            placeholder="Your Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            />
                        </div>
                        <div className='emailuserin'>
                            <label>Email:</label>
                            <input
                            type="email"
                            placeholder="Ex: Instructor@mail.com"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            />
                        </div>
                        <div className='natId'>
                            <label>NationalId:</label>
                            <input
                                type="text"
                                placeholder="12341224133512"
                                name="nationalId"
                                value={form.nationalId}
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
                            placeholder="Ex: 01012345678"
                            name="phone_number"
                            value={form.phone_number}
                            onChange={handleChange}
                            />
                        </div>
                        <div className='birth'>
                            <label>Birthday Date:</label>
                            <input
                            type="date"
                            placeholder="Date_of_Birth"
                            name="Date_of_Birth"
                            value={form.Date_of_Birth}
                            onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='box2'>
                        <div>
                            <select name="Gender" value={form.Gender} onChange={handleChange}>
                                <option value="">Select Gender:</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <select name="type" value={form.type} onChange={handleChange}>
                                <option value="">Select type:</option>
                                <option value="doctor">Doctor</option>
                                <option value="teaching assistant">Teaching assistant</option>
                            </select>
                        </div>
                    </div>
                    <div className='box2'>
                        <div>
                            <select name="department" value={form.department} onChange={handleChange}>
                                <option value="">Select Department:</option>
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
                    <button
                    type="button"
                    className="left-btn"
                    onClick={resetAll}
                    >
                        <i className="fa-solid fa-repeat"></i> Reset all
                    </button>
    
                    <button type="submit" className="right-btn" disabled={loading}>
                        {loading ? "Loading.." : "Add"}
                    </button>
                </div>
            </form>        
        </div>
      );
    }
    