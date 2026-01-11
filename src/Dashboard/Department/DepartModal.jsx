import React, { useEffect, useState } from 'react'
import { deleteDepartment, getDepartment } from '../../services/departmentService';
import EditDepartment from './EditDepartment';

export default function DepartModal({setShowProfileModal ,departmentId, getDepartments}) {
    const [department ,setDepartment] = useState({
        name: "",
    })
    const [errormsg,setErrormsg] = useState('');
    const[showDeleteCon ,setShowDeleteCon] =useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(()=>{
        const getDepart = async () =>{
        try{
            const data = await getDepartment(departmentId);        
            setDepartment(data.department)
        }catch(err){
            console.log(err);
            setErrormsg(
                err.response?.data?.errors?.[0]?.msg ||
                err.response?.data?.message ||
                "Failed to get department"
            );
        }
    }
    getDepart();
    },[])

    const deleteDepart = async () =>{
        try{
            const data = await deleteDepartment(departmentId);
            getDepartments();
        }catch(err){
            console.log('error',err.response);
            setShowDeleteCon(false);
            setErrormsg(err.response?.data?.message);
        }
    }


  return (
    <div className="modal-overlay">
        <div className='modal-boxd profile-modal'>

        <i
          className="closeicon fa-solid fa-xmark"
          onClick={() => {setShowProfileModal(false)}}
        ></i>
        <h3>{department?.name}</h3>
        <p className='error'>{errormsg ? errormsg :''}</p>
        
            <div className='datadepart'>
                <label>Department Name:</label>
                <input
                type="text"
                readOnly
                value={department?.name || ''}
                />
            </div>
            <div className="btns-group">
                <button type="button" className="left-btn" onClick={()=> setShowDeleteCon(true)}>
                <i className="fa-solid fa-ban"></i> Delete
                </button>

                <button type="button" className="right-btn" onClick={() => setShowEditModal(true)}>
                <i className="fa-regular fa-pen-to-square"></i> Edit 
                </button>
            </div>
        </div>

        {
            showDeleteCon && (
                <div className='deletemsgD'>
                    <p>Are You sure you want to delete {department.name}?</p>
                    <div>
                        <button className="left-btn" onClick={()=>{
                            deleteDepart()
                            setShowProfileModal(false)
                        }
                        }>Delete
                        </button>
                        <button className="right-btn" onClick={()=> setShowDeleteCon(false)}>Cancle</button>
                    </div>
                </div>
            )
        }
        
        {
            showEditModal && (
                <div className="modal-overlay">
                    <EditDepartment
                        department={department}
                        departmentId={departmentId}
                        getDepartments={getDepartments}
                        setShowEditModal={setShowEditModal}
                        setShowProfileModal={setShowProfileModal}
                    />
                </div>
            )
        }
    </div>
  )
}
