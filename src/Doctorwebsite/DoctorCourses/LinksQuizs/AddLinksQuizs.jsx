import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { addLinkQuizsDocCourseFun } from '../../../services/DoctorServices/coursesDocService';

export default function AddLinksQuizs({getCourse,setShowAddModalLink,nameCourse}) {
    const {id} = useParams();
    const [form, setForm] = useState({
        link:"",
    });
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);
    

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (!form.link.trim()) {
            setErrormsg("Please fill the Link input ,required field");
        return;
        }
        setLoading(true);
        setErrormsg('');
    
        try{
            await addLinkQuizsDocCourseFun(id,{ link:form.link})
            getCourse();
            setShowAddModalLink(false);
        }catch(err){
            console.log(err);
            setErrormsg(
            err.response?.data?.msg || "Failed to add link"
            );
        }finally{
            setLoading(false);
        }
    }
    const resetAll = () => {
    setForm({
        link: ""
    });
    setErrormsg("");
    };

  return (
    <div className='notDoc'>
        <div className='modal-box'>
        <i
            className="closeicon fa-solid fa-xmark"
            onClick={() => setShowAddModalLink(false)}
        ></i>

        <h3>Add Link Quiz in {nameCourse}</h3>
        {errormsg && <p className="error">{errormsg}</p>}
        <form onSubmit={handleSubmit}>
            {/* link */}
            <div className="notiLab">
                <label>Link:</label>
                <input
                    type="url"
                    value={form.link}
                    onChange={(e)=> setForm({...form,link:e.target.value})}
                    className="small"
                    placeholder="write Link"
                />
            </div>

            {/* Buttons */}
            <div className="btns-group">
                <button type="button" className="left-btn" onClick={resetAll}>
                    <i className="fa-solid fa-repeat"></i> Reset all
                </button>

                <button
                    type="submit"
                    className="right-btn"
                    disabled={loading|| !form.link.trim()}
                >
                {loading ? "Loading..." : "Add"}
            </button>
            </div>
        </form>
        </div>
    </div>
  )
}
