import React, { useContext, useEffect, useState } from 'react'
import './PrfileDoc.css'
import { getProfileDoctorFun } from '../../services/DoctorServices/ProfileServices';
import { AuthContext } from '../../Auth/AuthContext/authContext';
import { useNavigate } from 'react-router-dom';
import iconEmail from '../../assets/iconEmail.png'
import Skeleton from 'react-loading-skeleton';
export default function PrfileDoc() {
    const [dataDoc ,setDataDoc] = useState({
        name:'',
        phone_number:'',
        nationalId:'',
        profileImage:'',
        department:'',
        type:'',
        Gender:'',
        Date_of_Birth:'',
        email:''
    });
    const [loading,setLoading]= useState(false);

    const getDataDoc = async()=>{
        setLoading(true)
        try{
            const data = await getProfileDoctorFun(); 
            setDataDoc(data);
        }catch(err){
            console.log('failed to get data prfile!');
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getDataDoc();
    },[])

    //logout
    const {logout} =  useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();         
        navigate("/"); 
    };

    //LOading
    const ProfileSkeleton = () => (
        <div className="profileUser">
            <div style={{ display: 'flex', gap: '70%', justifyContent:'space-between', width:"100%"}}>
                <Skeleton  width={200} height={200} />
                <div style={{ flex: 1  , flexDirection: 'column'}}>
                <Skeleton height={50} width={100} style={{marginTop:"50%"}} />
                <Skeleton height={20} width={150} style={{ marginTop: 15 ,marginLeft:"-15%"}} />
                </div>
            </div>
    
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                <Skeleton height={50} width={550} />
                <Skeleton height={50} width={550} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                <Skeleton height={50} width={550} />
                <Skeleton height={50} width={550} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                <Skeleton height={50} width={550} />
                <Skeleton height={50} width={550} />
            </div>
            <div style={{ display: 'flex', marginTop: 50 }}>
                <Skeleton height={50} width={350} />
            </div>
        </div>
    );
  return (
    <div className='ProfileDoc'>
        {
            loading?
                <ProfileSkeleton />
            :
            <>
                <div className='headProfileDoc'>
                    <div className='headProfileDocbox1'>
                        <img src={dataDoc.profileImage} alt={dataDoc.name} />
                        <div>
                            <h3>{dataDoc.name}</h3>
                            <p>{dataDoc.department}</p>
                        </div>
                    </div>
                    <div className='headProfileDocbox2'>
                        <button onClick={handleLogout}>Logout</button>
                        <p>For data changes, visit Student Affairs. ❤️</p>
                    </div>
                </div>

                <div className='dataProfileDoc'>
                    <div className='dataProfileDocCard'>
                        <div className='dataBox'>
                            <label>Full Name</label>
                            <input type="text" value={dataDoc.name} readOnly />
                        </div>
                        <div className='dataBox'>
                            <label>Gender</label>
                            <input type="text" value={dataDoc.Gender} readOnly/>
                        </div>
                        <div className='dataBox'>
                            <label>Role</label>
                            <input type="text" value={dataDoc.type} readOnly/>
                        </div>
                    </div>
                    <div className='dataProfileDocCard'>
                        <div className='dataBox'>
                            <label>Phone</label>
                            <input type="text" value={dataDoc.phone_number} readOnly/>
                        </div>
                        <div className='dataBox'>
                            <label>Birthday Date</label>
                            <input type="text"  value={dataDoc.Date_of_Birth.split('T')[0]} readOnly/>
                        </div>
                        <div className='dataBox'>
                            <label>National Number</label>
                            <input type="text" value={dataDoc.nationalId} readOnly/>
                        </div>
                    </div>
                </div>
                <div className='emailProfileDocCard'>
                    <h4>Email Address</h4>
                    <div>
                        <img src={iconEmail} alt="iconEmail" />
                        <p>{dataDoc.email}</p>
                    </div>
                </div>
            </>
        }
    </div>
  )
}
