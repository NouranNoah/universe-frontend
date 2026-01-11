import React, { useEffect, useState } from 'react'
import './Profile.css'
import profileDefault from '../../assets/default-profile-picture.jpg'
import { getProfilefun } from '../../services/adminService'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
    const [dataProfile, setDataProfile] =useState({
        email:"",
        name: '',
        phone_number:'',
        profileImage:null
    })
    const [loading, setLoading] = useState(false);
    const [ errormsg ,setErrormsg] =useState('')
    const navigate = useNavigate();

    const getProfileAdmin = async()=>{
        setLoading(true);
        try{
            const data = await getProfilefun();
            setDataProfile(data.admin);
        }catch(err){
            console.log("error", err);
            setErrormsg("Failed to fetch Admin Profile!");
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getProfileAdmin();
    },[])
    const ProfileSkeleton = () => (
        <div className="profileUser">
            <div style={{ display: 'flex', gap: '20px' }}>
                <Skeleton  width={350} height={250} />
                <div style={{ flex: 1  , flexDirection: 'column'}}>
                <Skeleton height={65} width={600} />
                <Skeleton height={65} width={600} style={{ marginTop: 25 }} />
                <Skeleton height={65} width={600} style={{ marginTop: 25 }} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 200 }}>
                <Skeleton height={60} width={250} />
                <Skeleton height={60} width={250} />
            </div>
        </div>
    );
    
  return (
    <div className='ProfileAdminContent'>
        
        {
            loading?
            <ProfileSkeleton /> 
            :
            <>
                <h3>Profile Admin</h3>
                {errormsg && <p className="error">{errormsg}</p>}
                <div className='dataProfile'>
                    <div className='imguser'>
                        <img
                        src={dataProfile.profileImage? dataProfile.profileImage : profileDefault}
                        alt="Admin profile"
                        />
                    </div>
                    <div className='datarow1'>
                        <div>
                            <label>Name</label>
                            <input
                            type="text"
                            value={dataProfile.name}
                            readOnly
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                            type="email"
                            readOnly
                            value={dataProfile.email}
                            />
                        </div>
                        <div>
                            <label>Phone</label>
                            <input
                                type="text"
                                readOnly
                                value={dataProfile.phone_number}
                            />
                        </div>
                    </div>
                </div>
                <div className="btns-group">
                    <button className="left-btn"
                    onClick={()=> navigate('/dashboard/edit-password')}>
                        <i className="fa-regular fa-pen-to-square"></i>
                        Edit password
                    </button>
                    <button className="right-btn"
                    onClick={()=> navigate('/dashboard/edit-profile',{
                        state: dataProfile,
                    })}>
                        <i className="fa-regular fa-pen-to-square"></i>
                        Edit profile
                    </button>
                </div>
            </>
        }

        
    </div>
  )
}
