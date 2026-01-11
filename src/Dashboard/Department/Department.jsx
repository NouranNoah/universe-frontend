import React, { useEffect, useMemo, useState } from 'react'
import './Department.css'
import SkeletonTable from '../SkeletonTable';
import { getAllDepartment } from '../../services/departmentService';
import AddDepartment from './AddDepartment';
import DepartModal from './DepartModal';

export default function Department() {
    const [searchTerm, setSearchTerm] = useState("");
    const [departments , setDepartments] = useState([]);
    const [departmentId , setdepartmentId] =useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    
    
    const filteredDepartments = useMemo(()=>{
      const term = searchTerm.toLowerCase();
      return departments.filter(department =>
        department.name.toLowerCase().includes(term) 
      );
    },[searchTerm,departments])

    const getDepartments = async ()=>{
      setLoading(true);
      try{
        const data = await getAllDepartment();
        console.log(data.allDepartments);
        setDepartments(data.allDepartments);
      }catch(err){
        console.log("error", err);
        setError(err.response?.data?.message || "Failed to fetch departments");
      }finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
      getDepartments();
    },[])

  return (
    <div className='Admins-content'>
        <div className='Admins-header'>
            <h2>Departments list</h2>
            <div>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                type="text"
                placeholder='Search for department name'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className='btn-add'
              onClick={()=> setShowAddModal(true)}>
                Add new department
            </button>
        </div>
        <table className="admins-table">
          <thead>
            <tr>
              <th>Department Name</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonTable rows={5} columns={1} />
            ) : filteredDepartments.length > 0 ? (
              filteredDepartments.map(department => (
                <tr key={department._id} onClick={() => 
                {
                  setShowProfileModal(true)
                  setdepartmentId(department._id)
                }
                } >
                  <td>
                    <div className="admin-infor">
                      {department.name}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={3}>No Departments found</td></tr>
            )}
          </tbody>
        </table>
        {error && <p className="error">{error}</p>}

        {showAddModal && (
            <div className="modal-overlay">
              <AddDepartment setShowAddModal={setShowAddModal} getDepartments={getDepartments}/>
            </div>
        )}

        {showProfileModal && (
          <div className="modal-overlay">
            <DepartModal setShowProfileModal={setShowProfileModal} departmentId={departmentId} getDepartments={getDepartments}/>
          </div>
        )}
    </div>
  )
}
