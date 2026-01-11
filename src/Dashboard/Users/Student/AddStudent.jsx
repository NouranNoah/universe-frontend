import React, { useEffect, useRef, useState } from 'react'
import { addStudentFun } from '../../../services/usersService';
import profileDefault from '../../../assets/uploadimg.png';
import { getAllDepartment } from '../../../services/departmentService';


export default function AddStudent({setShowAddModal, getStudents}) {

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
            password: "",
            phone_number: "",
            nationalId: "",
            profileImage: profileDefault, 
            department: "", 
            level: "", 
            Gender: "", 
            Date_of_Birth: ""
        });
        setErrormsg("");
    };


    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log('data',
            form
        )
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
            !email.trim() ||
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
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("phone_number", form.phone_number);
        formData.append("nationalId", form.nationalId);
        formData.append("department", form.department); 
        formData.append("level", form.level);
        formData.append("Gender", form.Gender);
        formData.append("Date_of_Birth", form.Date_of_Birth);

        if (form.profileImage instanceof File) {
        formData.append("profileImage", form.profileImage);
        }

        try{
            const data = await addStudentFun(formData);
            resetAll(); 
            getStudents(); 
            setShowAddModal(false);
        }catch(err){
            console.log(err.response?.data);
            if(err.response?.data?.errors && err.response.data.errors.length > 0){
                setErrormsg(err.response.data.errors[0].msg);
            } else {
                setErrormsg(err.response?.data?.msg || "Failed to add student");
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
        <h3>Add New Student</h3>

        {errormsg && <p className="error">{errormsg}</p>}
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
                        placeholder="Ex: student@mail.com"
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
                        <select name="level" value={form.level} onChange={handleChange}>
                            <option value="">Select Level:</option>
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
