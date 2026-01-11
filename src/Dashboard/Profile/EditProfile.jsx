import React, { useEffect, useRef, useState } from 'react'
import profileDefault from '../../assets/default-profile-picture.jpg'
import { editProfilefun, getProfilefun } from '../../services/adminService';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const [form ,setForm] =useState({
        name:'',
        email:'',
        phone_number:'',
        profileImage:null
    })
    const {state} = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (state) {
            setForm({
            name: state.name || "",
            email: state.email || "",
            phone_number: state.phone_number || "",
            profileImage: state.profileImage || null,
            });
        }
    }, [state]);
    useEffect(() => {
        if (!state) {
            navigate("/dashboard/profile");
        }
    }, [state, navigate]);

    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fileInputRef = useRef();
    const validatePhone = (value) => value.replace(/[^0-9]/g, "");
    const isValidPhone = (phone) => /^[0-9]{11}$/.test(phone);


    const handleImageClick = () => {
        fileInputRef.current.click();
    };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({ ...form, profileImage: file });
    }
  };
    const [errormsg,setErrormsg]= useState('');
    const [ loading, setLoading ] = useState(false);

    const handleSubmit =async(e)=>{
        e.preventDefault();

        if (!form.name || !form.phone_number || !form.email) {
            setErrormsg("Please fill all data!");
            return;
        }

        if (!isValidPhone(form.phone_number)) {
            setErrormsg("Phone number must be 11 digits.");
            return;
        }

        setLoading(true);
        setErrormsg("");
        try{
            const formData = new FormData();
            formData.append('name' , form.name)
            formData.append('phone_number', form.phone_number)
            formData.append('email', form.email)
            if (form.profileImage instanceof File) {
                formData.append("profileImage", form.profileImage);
            }
            const data =await editProfilefun(formData);
            console.log("Admin Updated:", data);
            navigate('/dashboard/profile');

        } catch (err) {
            setErrormsg(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    }
    const displayImage = form.profileImage instanceof File
        ? URL.createObjectURL(form.profileImage)
        : form.profileImage || profileDefault;
   return (
    <div className="ProfileAdminContent">
        <h3>Edit Admin</h3>
        {errormsg && <p className="error">{errormsg}</p>}

        <form onSubmit={handleSubmit}>
        <div className="dataProfile">
            <div className="imguser">
            <img
                src={displayImage}
                alt="admin profile"
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

            <div className="datarow1">
            <div>
                <label>Admin Name:</label>
                <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                />
            </div>

            <div>
                <label>Email:</label>
                <input 
                type="email" 
                value={form.email} 
                name='email'
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Admin Phone:</label>
                <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={(e) =>
                    setForm({
                    ...form,
                    phone_number: validatePhone(e.target.value),
                    })
                }
                />
            </div>

            </div>
        </div>

        <div className="btns-group">
            <button type="button" className="left-btn" onClick={() => navigate(-1)}>
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
