import React, { useState } from 'react'
import { updateSpecificComponentFun } from '../../../services/DoctorServices/gradeDocService';
import { log10 } from 'chart.js/helpers';

export default function EditComponent({componentpercentage,componentName,courseId,componentId,setShowEdit,getComponent}) {
    const [errormsg, setErrormsg] = useState("");
    const [form ,setForm] = useState({
        name:componentName,
        percentage: componentpercentage
    })
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const percentageNumber = Number(form.percentage);

        if (!form.name.trim()) {
            setErrormsg("Component name is required");
            return;
        }

        if (!percentageNumber || percentageNumber <= 0) {
            setErrormsg("Percentage must be greater than 0");
            return;
        }

        if (percentageNumber > 100) {
            setErrormsg("Percentage cannot exceed 100%");
            return;
        }
    
        setLoading(true);
        setErrormsg("");
        
        try {
            const data = await updateSpecificComponentFun(courseId,componentId, form); 
            console.log("component Updated:", data.components);

            getComponent();
            setShowEdit(false);
        } catch (err) {
            setErrormsg(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="notDoc comp">
        <div className="modal-box">
            <h3>{componentName}</h3>

            {errormsg && <p className="error">{errormsg}</p>}

            <form onSubmit={handleSubmit}>
                {/* NAME */}
                <div className="notiLab">
                    <label>Name</label>
                    <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Midterm"
                    />
                </div>

                {/* PERCENTAGE */}
                <div className="notiLab">
                    <label>Percentage</label>
                    <input
                    type="number"
                    name="percentage"
                    value={form.percentage}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                    min="1"
                    max="100"
                    />
                </div>

                {/* BUTTONS */}
                <div className="btns-group">
                    <button type="button" className="left-btn" onClick={() => setShowEdit(false)}>
                        Cancel
                    </button>
                    <button type="submit" className="right-btn">
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
