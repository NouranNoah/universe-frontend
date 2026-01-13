import React, { useContext, useState } from 'react'
import { editPassfun } from '../../services/adminService'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Auth/AuthContext/authContext';

export default function EditPass() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {logout} =  useContext(AuthContext);
    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errormsg, setErrormsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
            setErrormsg("Please fill all fields!");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            setErrormsg("Passwords do not match!");
            return;
        }

        setLoading(true);
        setErrormsg("");

        try {
            await editPassfun({
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
            confirmPassword: form.confirmPassword
            });

            // success logout and login agin
            logout();
            navigate('/');
        } catch (err) {
            setErrormsg(err.response?.data?.errors?.[0]?.msg|| "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="passAdminContent">
            <h3>Edit Password</h3>
            {errormsg && <p className="error">{errormsg}</p>}

            <form onSubmit={handleSubmit}>
                <div className="passData">
                    <div className="passAdmin">
                        <div>
                            <label>Current Password</label>
                            <div className="password-field">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="oldPassword"
                                    value={form.oldPassword}
                                    onChange={handleChange}
                                    placeholder='*******************'
                                />
                                <i
                                    className={`fa-solid ${showPassword ? "fa-eye" :"fa-eye-slash"}`}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                        </div>

                        <div>
                            <label>New Password</label>
                            <div className="password-field">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    placeholder='*******************'
                                />
                                <i
                                    className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password</label>
                            <div className="password-field">
                                <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder='*******************'
                                />
                                <i
                                    className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
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
    );
}
