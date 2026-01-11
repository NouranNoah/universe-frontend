import React, { useState } from 'react'
import { addDepartment } from '../../services/departmentService';

export default function AddDepartment({setShowAddModal , getDepartments}) {
    const [name ,setName] = useState('');
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);

    const resetAll = () =>{
        setName('');
        setErrormsg('');
    }

    const handleChange = (e)=>{
        setName(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(name==='') {
            setErrormsg('Please fill all data!');
            return;
        }
        setLoading(true);
        try{
            const data = await addDepartment({name: name});
            resetAll();
            getDepartments();
            setShowAddModal(false);
        }catch(err){
            console.log(err);
            setErrormsg(
                err.response?.data?.errors?.[0]?.msg ||
                err.response?.data?.message ||
                "Failed to add department"
            );
        }finally{
            setLoading(false);
        }

    }

  return (
    <div className="modal-box">
        <i className="closeicon fa-solid fa-xmark"
            onClick={() => setShowAddModal(false)}>
        </i>
        <h3>Add New Department</h3>
            {errormsg && <p className="error">{errormsg}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Department Name:</label>
                <input
                type="text"
                placeholder="Department Name"
                name="name"
                value={name}
                onChange={handleChange}
                />
            </div>
            <div className="btns-group">
                <button
                type="button"
                className="left-btn"
                onClick={resetAll}
                >
                <i className="fa-solid fa-repeat"></i> Reset all
                </button>

                <button type="submit" className="right-btn">
                {loading ? "Loading.." : "Add"}
                </button>
            </div>
        </form>
    </div>
  )
}
