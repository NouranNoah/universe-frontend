import React, { useState } from 'react'
import { addComponentFun } from '../../../services/DoctorServices/gradeDocService';

export default function AddComponent({ courseId, setShowAddModal, getComponent }) {
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    percentage: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const resetAll = () => {
    setForm({
      name: "",
      percentage: ""
    });
    setErrormsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const percentageNumber = Number(form.percentage);

    /* ---------- Validation ---------- */
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
      await addComponentFun(courseId, {
        component: {
          name: form.name.trim(),
          percentage: percentageNumber
        }
      });

      getComponent(); // refresh list
      setShowAddModal(false);
    } catch (err) {
      setErrormsg(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Failed to add component"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notDoc comp">
        <div className="modal-box">
            <i
            className="closeicon fa-solid fa-xmark"
            onClick={() => setShowAddModal(false)}
            ></i>

            <h3>Add New Component</h3>

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
                <button type="button" className="left-btn" onClick={resetAll}>
                <i className="fa-solid fa-repeat"></i> Reset
                </button>

                <button type="submit" className="right-btn" disabled={loading}>
                {loading ? "Adding..." : "Add"}
                </button>
            </div>
            </form>
        </div>
    </div>
  );
}
