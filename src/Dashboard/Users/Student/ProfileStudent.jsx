import React, { useEffect, useState } from 'react'
import { deleteStudentFun, getStudentFun } from '../../../services/usersService';
import profileDefault from '../../../assets/default-profile-picture.jpg';
import EditStudent from './EditStudent';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function ProfileStudent({setShowProfileModal, StudentId , getStudents}) {
    const [student , setStudent] = useState({
        name: "",
        email: "",
        phone_number: "",
        nationalId: "",
        profileImage: profileDefault, 
        department: "", 
        level: "", 
        Gender: "", 
        Date_of_Birth: ""
    });
    const [errormsg , setErrormsg] = useState('');
    const [loading ,setLoading] = useState(false);
    const[showDeleteCon ,setShowDeleteCon] =useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const getStudent = async ()=>{
        setLoading(true);
        try{
            const data =await getStudentFun(StudentId);
            setStudent(data.student)
        }catch(err){
            console.log('error to get the student', err.response?.data);
            setErrormsg('error to get the student')
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getStudent();
    },[])

    const deleteStudent = async ()=>{
        try{
            const data = await deleteStudentFun(StudentId);
            console.log('student is Deleted!')
            getStudents();
            setShowProfileModal(false);
        }catch(err){
            console.log('error',err.response);
            setShowDeleteCon(false);
            setErrormsg(err.response?.data?.message);
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
                <h3>{student.name} (Student)</h3>
                <div className='row1'>
                    <div className='imguser'>
                        <img
                        src={student.profileImage? student.profileImage : profileDefault}
                        alt="student profile"
                        />
                    </div>
                    <div className='datarow1'>
                        <div className='phone'>
                            <label>Full Name:</label>
                            <input
                            type="text"
                            value={student.name}
                            readOnly
                            />
                        </div>
                        <div className='emailuserin'>
                            <label>Email:</label>
                            <input
                            type="email"
                            readOnly
                            value={student.email}
                            />
                        </div>
                        <div className='natId'>
                            <label>NationalId:</label>
                            <input
                                type="text"
                                readOnly
                                value={student.nationalId}
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
                            value={student.phone_number}
                            />
                        </div>
                        <div className='birth'>
                            <label>Birthday Date:</label>
                            <input
                            type="text"
                            readOnly
                            value={student.Date_of_Birth.split("T")[0]}
                            />
                        </div>
                    </div>
                    <div className='box2'>
                        <div>
                            <select name="Gender" value={student.Gender} disabled>
                                <option value={student.Gender}>{student.Gender}</option>
                            </select>
                        </div>
                        <div>
                            <select name="level" value={student.level} disabled >
                                <option value={student.level}>{student.level}</option>
                            </select>
                        </div>
                    </div>
                    <div className='box2'>
                        <div>
                            <select name="department" value={student.department} disabled>
                                <option value={student.department}>{student.department}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="btns-group">
                    <button type="button" className="left-btn" onClick={()=> setShowDeleteCon(true)}>
                    <i className="fa-solid fa-ban"></i> {student.active? "Block" : 'Unblock'}
                    </button>

                    <button type="button" className="right-btn" onClick={() => setShowEditModal(true)}>
                    <i className="fa-regular fa-pen-to-square"></i> Edit Student
                    </button>
                </div>
            </div>
        }

        {
            showDeleteCon && (
                <div className='deletemsg'>
                    {
                        student.active? 
                        <p>Are You sure you want to block Student?</p>
                        :
                        <p>Are You sure you want to unblock Student?</p>
                    }
                    <div>
                        <button className="left-btn" onClick={()=>deleteStudent()}>
                            {student.active? "Block":'Unblock'}
                        </button>
                        <button className="right-btn" onClick={()=> setShowDeleteCon(false)}>Cancle</button>
                    </div>
                </div>
        )}
        
        {
            showEditModal && (
                <div className="modal-overlay">
                    <EditStudent
                    student={student}
                    StudentId={StudentId}
                    getStudent={getStudent}
                    setShowEditModal={setShowEditModal}
                    setShowProfileModal={setShowProfileModal}
                    getStudents={getStudents}
                    />
                </div>
        )}
    </div>
  )
}
