import React, { useEffect, useMemo, useState } from 'react'
import SkeletonTable from '../SkeletonTable';
import { getNotificationFun } from '../../services/notificationsService';
import Pagination from '../../Components/Pagination/Pagination';
import AddNotifications from './AddNotifications';
import './Notifications.css'
export default function Notifications() {
    const [searchTerm, setSearchTerm] = useState("");
    const [notifications,setNotifications]= useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [notifId,setnotifId] =useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const NotifsPerPage = 8;

    const filteredNotif = useMemo(()=>{
        const term = searchTerm.toLowerCase();
        return notifications.filter((notification) =>
            notification.subject.toLowerCase().includes(term)
        );
    },[searchTerm,notifications])

    const totalPages = Math.ceil(filteredNotif.length / NotifsPerPage);

    const indexOfLastNotifi = currentPage * NotifsPerPage;
    const indexOfFirstNotifi = indexOfLastNotifi - NotifsPerPage;
    const currentNotif = filteredNotif.slice(
        indexOfFirstNotifi,
        indexOfLastNotifi
    );

    const getNotif = async ()=>{
        try{
            const data = await getNotificationFun();
            setNotifications(data);
        }catch(err){
            console.log("error", err);
            setError("Failed to fetch Notifications");
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getNotif();
    },[])
  return (
    <div className='Admins-content'>
        <div className='Admins-header'>
            <h2>Notifications</h2>
            <div>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    placeholder='Search for name'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <button className='btn-add' onClick={() => setShowAddModal(true)}>Add new Notification</button>
        </div>
        <table className="admins-table">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Send by</th>
                    <th>Send to</th>
                    <th>Send at</th>
                </tr>
            </thead>
    
            <tbody>
                {loading ? (
                    <SkeletonTable rows={4} columns={4}/>
                ) : currentNotif.length > 0 ? (
                        currentNotif.map(notification => (
                            <tr key={notification._id} onClick={() => { setnotifId(notification._id); }}>
                                <td style={{textAlign:'start'}}>{notification.subject}</td>
                                <td style={{textAlign:'start'}}>{notification.user.name}</td>
                                <td style={{textAlign:'start'}}>{notification.sendTo}</td>
                                <td style={{textAlign:'start'}}>{notification.createdAt.split("T")[0]}</td>
                            </tr>
                        ))
                ) : (
                    <tr><td colSpan={3}>No notifications found</td></tr>
                )}
            </tbody>
    
        </table>

        {error && <p className="error">{error}</p>}
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxVisiblePages={3}
        />
        {
            showAddModal && (
                <div className="modal-overlay">
                    <AddNotifications
                        setShowAddModal={setShowAddModal}
                        getNotif={getNotif}
                    />
                </div>
            )
        }
    </div>
  )
}
