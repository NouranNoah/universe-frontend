import React, { useEffect, useState } from 'react'
import profileDefault from '../../../assets/default-profile-picture.jpg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getInstructorFun, updateInstructorStatusFun } from '../../../services/usersService';
import EditInstructor from './editInstructor';

export default function ProfileInstructor({instructorsId , getInstructors , setShowProfileModal}) {
    const [instructor , setInstructor] = useState({
            name: "",
            email: "",
            phone_number: "",
            nationalId: "",
            profileImage: profileDefault, 
            department: "", 
            type: "", 
            Gender: "", 
            Date_of_Birth: ""
        });
        const [errormsg , setErrormsg] = useState('');
        const [loading ,setLoading] = useState(false);
        const[showDeleteCon ,setShowDeleteCon] =useState(false);
        const [showEditModal, setShowEditModal] = useState(false);
    
        const getInstructor = async ()=>{
            setLoading(true);
            try{
                const data =await getInstructorFun(instructorsId);
                setInstructor(data.doctor)
            }catch(err){
                console.log(err.response?.data?.errors?.[0]?.msg|| "Failed to fetch Instructors!");
                setErrormsg(err.response?.data?.errors?.[0]?.msg|| "Failed to fetch Instructors!")
                
            }finally{
                setLoading(false);
            }
        }
        useEffect(()=>{
            getInstructor();
        },[])
    
        const editInstructor = async ()=>{
            try{
                const data = await updateInstructorStatusFun(instructorsId);
                console.log('instructor is Deleted!')
                getInstructors();
                setShowProfileModal(false);
            }catch(err){
                console.log('error',err.response);
                setShowDeleteCon(false);
                setErrormsg(err.response?.data?.errors?.[0]?.msg|| "Failed To Update Instructor Status!");
            }
        }
    
        const ProfileSkeleton = () => (
            <div className="profileUser">
            <div style={{ display: 'flex', gap: '20px' }}>
                <Skeleton  width={300} height={200} />
                <div style={{ flex: 1  , flexDirection: 'column'}}>
                <Skeleton height={50} width={400} />
                <Skeleton height={50} width={400} style={{ marginTop: 15 }} />
                <Skeleton height={50} width={400} style={{ marginTop: 15 }} />
                </div>
            </div>
    
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                <Skeleton height={50} width={350} />
                <Skeleton height={50} width={350} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                <Skeleton height={50} width={350} />
                <Skeleton height={50} width={350} />
            </div>
            <div style={{ display: 'flex', marginTop: 30 }}>
                <Skeleton height={50} width={750} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                <Skeleton height={40} width={150} />
                <Skeleton height={40} width={150} />
            </div>
            </div>
        );
    
    
      return (
        <div className="modal-boxs">
            {
                loading? 
                <ProfileSkeleton /> 
                :
                < div className='profileUser'>
                    <i className="closeicon fa-solid fa-xmark" onClick={() => setShowProfileModal(false)}></i>
                    <h3>{instructor.name} (instructor)</h3>
                    <div className='row1'>
                        <div className='imguser'>
                            <img
                            src={instructor.profileImage? instructor.profileImage : profileDefault}
                            alt="instructor profile"
                            />
                        </div>
                        <div className='datarow1'>
                            <div className='phone'>
                                <label>Full Name:</label>
                                <input
                                type="text"
                                value={instructor.name}
                                readOnly
                                />
                            </div>
                            <div className='emailuserin'>
                                <label>Email:</label>
                                <input
                                type="email"
                                readOnly
                                value={instructor.email}
                                />
                            </div>
                            <div className='natId'>
                                <label>NationalId:</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={instructor.nationalId}
                                />
                            </div>
                        </div>
                    </div>
    
                    <div className='row2'>
                        <div className='box1'>
                            <div className='phone'>
                                <label>phone:</label>
                                <input
                                type="text"
                                readOnly
                                value={instructor.phone_number}
                                />
                            </div>
                            <div className='birth'>
                                <label>Birthday Date:</label>
                                <input
                                type="text"
                                readOnly
                                value={instructor.Date_of_Birth? instructor.Date_of_Birth?.split("T")[0]:'Not defined'}                                />
                            </div>
                        </div>
                        <div className='box2'>
                            <div>
                                <select name="Gender" value={instructor.Gender} disabled>
                                    <option value={instructor.Gender}>{instructor.Gender}</option>
                                </select>
                            </div>
                            <div>
                                <select name="type" value={instructor.type} disabled >
                                    <option value={instructor.type}>{instructor.type}</option>
                                </select>
                            </div>
                        </div>
                        <div className='box2'>
                            <div>
                                <select name="department" value={instructor.department} disabled>
                                    <option value={instructor.department}>{instructor.department}</option>
                                </select>
                            </div>
                        </div>
                    </div>
    
                    <div className="btns-group">
                        <button type="button" className="left-btn" onClick={()=> setShowDeleteCon(true)}>
                        <i className="fa-solid fa-ban"></i> {instructor.active? "Block" : 'Unblock'}
                        </button>
    
                        <button type="button" className="right-btn" onClick={() => setShowEditModal(true)}>
                        <i className="fa-regular fa-pen-to-square"></i> Edit instructor
                        </button>
                    </div>
                </div>
            }
    
            {
                showDeleteCon && (
                    <div className='deletemsg'>
                        {
                            instructor.active? 
                            <p>Are You sure you want to block instructor?</p>
                            :
                            <p>Are You sure you want to unblock instructor?</p>
                        }
                        <div>
                            <button className="left-btn" onClick={()=>editInstructor()}>
                                {instructor.active? "Block":'Unblock'}
                            </button>
                            <button className="right-btn" onClick={()=> setShowDeleteCon(false)}>Cancle</button>
                        </div>
                    </div>
            )}
            
            {
                showEditModal && (
                    <div className="modal-overlay">
                        <EditInstructor
                        instructor={instructor}
                        instructorsId={instructorsId}
                        getInstructor= {getInstructor}
                        getInstructors = {getInstructors}
                        setShowEditModal={setShowEditModal}
                        setShowProfileModal={setShowProfileModal}
                        />
                    </div>
            )}
        </div>
      )
}