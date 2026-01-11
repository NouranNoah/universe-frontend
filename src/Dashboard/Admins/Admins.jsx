import React, { useEffect, useMemo, useState } from 'react'
import './Admins.css'
import profileDefult from '../../assets/default-profile-picture.jpg'
import AddAdmin from './AddAdmin';
import ProfileModal from './ProfileModal';
import { getAdmins } from '../../services/adminService';
import SkeletonTable from '../SkeletonTable';


export default function Admins() {
    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [adminId,setAdminId] =useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
    const getAdmin = async()=>{
        setLoading(true);
        try{
            const data = await getAdmins();
            setAdmins(data);
        }catch(err){
            console.log("error", err);
            setError("Failed to fetch admins");
        }finally {
            setLoading(false);
        } 
    }

    useEffect(()=>{
    getAdmin();
    },[])

    
    const filteredAdmins = useMemo(()=>{
        const term = searchTerm.toLowerCase();
        return admins.filter((admin) =>
            admin.name.toLowerCase().includes(term) ||
            admin.email.toLowerCase().includes(term) ||
            admin.phone_number.includes(term)
        );
    },[searchTerm,admins])

   return (
    <div className='Admins-content'>
        <div className='Admins-header'>
            <h2>Admins</h2>
            <div>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                type="text"
                placeholder='Search for name or phone or E-mail'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <button className='btn-add' onClick={() => setShowAddModal(true)}>Add new admin</button>
        </div>
        <table className="admins-table">
            <thead>
                <tr>
                <th>Admin Name</th>
                <th>Admin E-mail</th>
                <th>Admin Phone</th>
                </tr>
            </thead>

            <tbody>
                {loading ? (
                    <SkeletonTable />
                ) : filteredAdmins.length > 0 ? (
                    filteredAdmins.map(admin => (
                        <tr key={admin._id} onClick={() => { setShowProfileModal(true); setAdminId(admin._id); }} >
                            <td>
                                <div className="admin-infor">
                                    <img src={admin.profileImage || profileDefult} alt={admin.name} />
                                    {admin.name}
                                </div>
                            </td>
                            <td style={{textAlign:'start'}}>{admin.email}</td>
                            <td style={{textAlign:'start'}}>{admin.phone_number}</td>
                        </tr>
                    ))
                ) : (
                        <tr><td colSpan={3}>No admins found</td></tr>
                )}
            </tbody>

        </table>
        {error && <p className="error">{error}</p>}

        {showAddModal && (
            <div className="modal-overlay">
            <AddAdmin setShowAddModal={setShowAddModal} getAdmin={getAdmin}/>
            </div>
        )}
        {showProfileModal && (
            <div className="modal-overlay">
                <ProfileModal setShowProfileModal={setShowProfileModal} adminId={adminId} getAdmin={getAdmin}/>
            </div>
        )}
    </div>
  )
}
