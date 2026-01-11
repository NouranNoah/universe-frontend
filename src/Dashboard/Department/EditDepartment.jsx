import React, { useState } from 'react'
import { editDepartment } from '../../services/departmentService';

export default function EditDepartment({department , departmentId, getDepartments , setShowEditModal, setShowProfileModal}) {
    const [errormsg, setErrormsg] = useState("");
    const [departmentName ,setDepartmentName] = useState({
            name: department.name
    })
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
    setDepartmentName({ ...departmentName, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (departmentName.name === '') {
          setErrormsg("Please fill all data!");
          return;
        }
    
        setLoading(true);
        setErrormsg("");
    
        try {
            const data = await editDepartment(departmentId, departmentName); 
            console.log("depart Updated:", data);
    
            getDepartments();
            setShowEditModal(false);
            setShowProfileModal(false);
    
        } catch (err) {
          setErrormsg(err.response?.data?.message || "Update failed");
        } finally {
          setLoading(false);
        }
    };
  return (
    <div className="modal-boxd">
        <h3>Edit Department</h3>
        {errormsg && <p className="error">{errormsg}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Department Name:</label>
                <input
                type="text"
                placeholder="Department Name"
                name="name"
                value={departmentName.name}
                onChange={handleChange}
                />
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
