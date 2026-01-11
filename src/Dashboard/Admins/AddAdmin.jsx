import React, { useState } from "react";
import "./Admins.css";
import { addAdmins } from "../../services/adminService";

export default function AddAdmin({ setShowAddModal, getAdmin }) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone_number: ""
    });

    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);

    const resetAll = () => {
        setForm({
            name: "",
            email: "",
            password: "",
            phone_number: ""
        });
        setErrormsg("");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validatePhone = (value) => {
        return value.replace(/[^0-9]/g, "");
    };

    const isValidPhone = (phone) => /^[0-9]{11}$/.test(phone);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1) Check empty fields
        if (Object.values(form).some((v) => v.trim() === "")) {
            setErrormsg("Please fill all data!");
            return;
        }

        // 2) Check phone format
        if (!isValidPhone(form.phone_number)) {
            setErrormsg("Phone number must be 11 digits.");
            return;
        }

        setLoading(true);

        try {
            const data = await addAdmins(form);
            console.log("add Admin Done:", data);

            resetAll();
            setShowAddModal(false);
            getAdmin();

        } catch (err) {
            console.log("error:", err.response?.data);

            if (err.response?.data?.message?.includes("duplicate")) {
            setErrormsg("This email is already registered as admin!");
            return;
            }

            setErrormsg(err.response?.data?.errors?.[0]?.msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-box">
            <i
            className="closeicon fa-solid fa-xmark"
            onClick={() => setShowAddModal(false)}
            ></i>

            <h3>Add New Admin</h3>

            <form onSubmit={handleSubmit}>
            {errormsg && <p className="error">{errormsg}</p>}

            <div>
                <label>Admin Name:</label>
                <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                />
            </div>

            <div>
                <label>Admin Phone:</label>
                <input
                type="text"
                placeholder="Ex: 01012345678"
                value={form.phone_number}
                onChange={(e) =>
                    setForm({
                    ...form,
                    phone_number: validatePhone(e.target.value)
                    })
                }
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                type="email"
                placeholder="Ex: admin@mail.com"
                name="email"
                value={form.email}
                onChange={handleChange}
                />
            </div>

            <div>
                <label>Password:</label>
                <input
                type="password"
                placeholder="************"
                name="password"
                value={form.password}
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
    );
}
