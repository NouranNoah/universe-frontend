import React, { useEffect, useMemo, useState } from 'react'
import { getInstructorsFun } from '../../../services/usersService';
import profileDefult from '../../../assets/default-profile-picture.jpg'
import SkeletonTable from '../../SkeletonTable';
import Pagination from '../../../Components/Pagination/Pagination';
import ProfileInstructor from './ProfileInstructor';
import AddInstructor from './AddInstructor';

export default function Instructors() {

    const [searchTerm, setSearchTerm] = useState("");
    const [instructors , setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [instructorsId,setInstructorsId] =useState('')

    // ===== Pagination state =====
    const [currentPage, setCurrentPage] = useState(1);
    const instructorsPerPage = 4;
    
    const filteredInstructors = useMemo(()=>{
        const term = searchTerm.toLowerCase();
        return instructors.filter((instructor) =>
            instructor.name.toLowerCase().includes(term) ||
            instructor.email.toLowerCase().includes(term) ||
            instructor.phone_number.includes(term)
        );
    },[searchTerm,instructors])

    const getInstructors = async ()=>{
        setLoading(true);
        try{
            const data = await getInstructorsFun();
            setInstructors(data.allDoctors);
        }catch(err){
            console.log("error", err);
            setError(err.response?.data?.errors?.[0]?.msg|| "Failed to fetch Instructors!");
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getInstructors();
    },[])

    // ===== Pagination calculations =====
    const totalPages = Math.ceil(filteredInstructors.length / instructorsPerPage);

    const indexOfLastInstructors = currentPage * instructorsPerPage;
    const indexOfFirstInstructors = indexOfLastInstructors - instructorsPerPage;
    const currentInstructors = filteredInstructors.slice(
        indexOfFirstInstructors,
        indexOfLastInstructors
    );
        
  return (
    <div className='User-content'>
        <div className='Admins-header'>
            <h2>Instructors</h2>
            <div>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                type="text"
                placeholder='Search for name or phone or E-mail'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <button className='btn-add' onClick={() => setShowAddModal(true)}>Add new Instructors</button>
        </div>

        <table className="admins-table">
            <thead>
                <tr>
                    <th>Instructors Name</th>
                    <th>E-mail</th>
                    <th>Phone Number</th>
                    <th>Department</th>
                    <th>Status</th>
                </tr>
            </thead>
        
            <tbody>
                {loading ? (
                    <SkeletonTable rows={5} columns={5} />
                ) : currentInstructors.length > 0 ? (
                    currentInstructors.map(Instructor => (
                        <tr key={Instructor._id} onClick={() => { setShowProfileModal(true); setInstructorsId(Instructor._id); }}>
                            <td>
                                <div className="admin-info">
                                    <img src={Instructor.profileImage || profileDefult} alt={Instructor.name} />
                                    {Instructor.name}
                                </div>
                            </td>
                            <td>{Instructor.email}</td>
                            <td>{Instructor.phone_number}</td>
                            <td>{Instructor.department}</td>
                            <td>{Instructor.active? <p className='activebtn'>Active</p> : <p className='inactivebtn'>Inactive</p>}</td>
                        </tr>
                    ))
                ) : (
                        <tr><td colSpan={3}>No Instructors found</td></tr>
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
        {showAddModal && (
            <div className="modal-overlay">
                <AddInstructor
                    setShowAddModal={setShowAddModal}
                    getInstructors={getInstructors}
                />
            </div>
        )}
        {showProfileModal && (
            <div className="modal-overlay">
                <ProfileInstructor setShowProfileModal={setShowProfileModal} instructorsId={instructorsId} getInstructors={getInstructors}/>
            </div>
        )}
    </div>
  )
}
