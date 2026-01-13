import React, { useState } from 'react'
import { addReportFun } from '../../services/reportService';
import AddRating from '../../Components/StarRating/AddRating';
import './RatingWebSite.css'


export default function RatingWebSite({setshowRatingModal}) {
    const [form, setForm] = useState({
        title: "",
        ratings:0
    });

    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);
        
    const resetAll = () => {
        setForm({
            title: "",
            ratings:0
        });
        setErrormsg("");
    };
        
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
        
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!form.ratings) {
            setErrormsg("Please select a rating!");
            return;
        }

        
        setLoading(true);

        try {
            const data = await addReportFun(form);
            console.log("Done:", data);
            resetAll();
            setshowRatingModal(false)

        } catch (err) {
            console.log("error:", err.response?.data);
            if(err.response && err.response.status === 404){
                setErrormsg("You already created a rating");
            }
            else{setErrormsg(err.response?.data?.errors?.[0]?.msg);}
        } finally {
            setLoading(false);
        }
    };
    return (
    <div className="modal-boxR">
        <i
            className="closeicon fa-solid fa-xmark"
            onClick={() => setshowRatingModal(false)}
        ></i>

        <h3>Review Website</h3>

        <form onSubmit={handleSubmit}>
        {errormsg && <p className="error">{errormsg}</p>}

        <div className='ratingWeb'>
            <h3>Rate the website</h3>
            <AddRating
                rating={form.ratings}
                setRating={(value) =>
                setForm({ ...form, ratings: value })
                }
            />
        </div>

        <div className='dataRate'>
            <label>Subject:</label>
            <input
            type="text"
            placeholder="EX: focuses on building software using objects, classes, and reusable structures."
            name="title"
            value={form.name}
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
            {loading ? "Loading.." : "Send"}
            </button>
        </div>
        </form>
    </div>
    );
}
