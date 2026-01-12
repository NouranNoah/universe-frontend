import React, { useState } from 'react';
import './ConfirmPassword.css'
import imgpass from '../../assets/imgforgotpasss.png';
import imgEmail from '../../assets/emailpass.png';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import axios from "axios";
import Cookies from "js-cookie";

export default function ConfirmPassword() {

    const [errorPost, seterrorpost] = useState(null);
    const [loading, setLoading] = useState(false);
    const getToken = Cookies.get('resetToken');

    const [code, setCode] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
    });

    const Navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        if (!/^[0-9]?$/.test(value)) return;

        setCode(prev => ({ ...prev, [name]: value }));

        if (value && e.target.nextElementSibling) {
            e.target.nextElementSibling.focus();
        }
    }


    async function handlesubmit(e) {
        e.preventDefault();
        setLoading(true);

        const fullCode = 
            code.first + code.second + code.third + code.fourth + code.fifth + code.sixth;

        try {
            let res = await axios.post(
                `https://uni-verse-rho.vercel.app/auth/verifycode`,
                { resetCode: fullCode },
                {
                    headers: {
                    Authorization: getToken
                }
                }
            );

            if (res.status === 200) {
                Cookies.set('resetToken', res.data.token, { path: '/' });
                Navigate('/SetNewPass');
            } else {
                seterrorpost("Please enter the correct code.");
            }

        } catch (error) {
            console.error(error);
            seterrorpost(error.response.data.message ||"Please enter the correct code.");
            setCode({
                first:'',
                second:'',
                third:'',
                fourth:'',
                fifth:'',
                sixth:''
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='login-container'>
            <div className='logImgF'>
                <img src={imgpass} alt="forgot password image" />
            </div>

            <div className='logBox'>
                <div className='logo-back'>
                    <div className='logo'>
                        <img src={logo} alt="logo" />
                        <p>UniVerse</p>
                    </div>
                    <div className='backLog'>
                        <p>Already Have an account?</p>
                        <Link to='/login'>Login</Link>
                    </div>
                </div>

                <div className='logForm'>
                    <div className='logText'>
                        <img src={imgEmail} alt="image Email" />
                        <h2>Check your email</h2>
                        <p>Enter the code that was sent to your email</p>
                    </div>

                    {errorPost && <p className="error">{errorPost}</p>}

                    <form onSubmit={handlesubmit} className='code-inputs'>
                        <div className='inputcode'>
                        {["first", "second", "third", "fourth", "fifth", "sixth"].map((inputName) => (
                        <input 
                            key={inputName}
                            type="text" 
                            maxLength="1" 
                            name={inputName} 
                            value={code[inputName]} 
                            onChange={handleChange} 
                        />
                        ))}
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Reset Password..." : "Reset Password"}
                        </button>
                    </form>

                    <div className='contbox'>
                        <p>Created By UniVerse Team</p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
