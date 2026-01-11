import React, { cache, useEffect, useState } from 'react';
import './Admins.css';
import profileDefault from '../../assets/default-profile-picture.jpg';
import EditAdmin from './EditAdmin';
import { deleteAdmins, getTheAdmin } from '../../services/adminService';

export default function ProfileModal({ setShowProfileModal ,adminId ,getAdmin }) {
  
  const[showDeleteCon ,setShowDeleteCon] =useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [errormsg,setErrormsg] = useState('');
  
    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        phone_number: "",
        profileImage: ""
    });
    
    const deleteAdmin = async ()=>{
        try{
            const data = await deleteAdmins(adminId);
            console.log('Admin deleted');
            getAdmin();
        }catch(err){
            console.log('error',err.response);
            setShowDeleteCon(false);
            setErrormsg(err.response?.data?.message);
        }
    }

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const data = await getTheAdmin(adminId)
        setAdmin(data.admin);
      } catch (err) {
        console.log('error to get the admin', err.response?.data);
      }
    };
    getAdmin();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-box profile-modal">
        <i
          className="closeicon fa-solid fa-xmark"
          onClick={() => {setShowProfileModal(false)}}
        ></i>
        <h3>{admin.name} (Admin)</h3>
        <p className='error'>{errormsg ? errormsg :''}</p>
        <div className='dataAdminBox'>
            <div className="imgAdmin">
                <img src={admin.profileImage ? admin.profileImage : profileDefault} alt="admin profile" />
            </div>
          <div className='dataAdmin'>
            <label>Name:</label>
            <input type="text" value={admin.name} readOnly />

            <label>Phone:</label>
            <input type="text" value={admin.phone_number} readOnly />

            <label>Email:</label>
            <input type="email" value={admin.email} readOnly />
          </div>
        </div>

        <div className="btns-group">
          <button type="button" className="left-btn" onClick={()=> setShowDeleteCon(true)}>
            <i className="fa-solid fa-ban"></i> Delete Admin
          </button>

          <button type="button" className="right-btn" onClick={() => setShowEditModal(true)}>
            <i className="fa-regular fa-pen-to-square"></i> Edit Admin
          </button>
        </div>
      </div>

      {
        showDeleteCon && (
            <div className='deletemsg'>
                <p>Are You sure you want to delete admin?</p>
                <div>
                    <button className="left-btn" onClick={()=>{
                        deleteAdmin()
                        setShowProfileModal(false)
                    }
                    }>Delete</button>
                    <button className="right-btn" onClick={()=> setShowDeleteCon(false)}>Cancle</button>
                </div>
            </div>
        )
      }

      {
      showEditModal && (
        <div className="modal-overlay">
          <EditAdmin
            admin={admin}
            adminId={adminId}
            getAdmin={getAdmin}
            setShowEditModal={setShowEditModal}
          />
        </div>
      )}
    </div>
  );
}
