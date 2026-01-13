import React, { useEffect, useState } from 'react'
import { deleteDepartment, getDepartment } from '../../services/departmentService';
import EditDepartment from './EditDepartment';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";


export default function DepartModal({setShowProfileModal ,departmentId, getDepartments}) {
    const [department ,setDepartment] = useState({
        name: "",
    })
    const [errormsg,setErrormsg] = useState('');
    const [loading ,setLoading]= useState(false)
    const[showDeleteCon ,setShowDeleteCon] =useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(()=>{
        setLoading(true)
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
        }finally{
            setLoading(false)
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
        {
            loading? 
            <div className='modal-boxd profile-modal'>
                <Skeleton height={38} width={180} style={{marginLeft:200, marginBottom: 20 }} />

                <div style={{ marginBottom: 40,marginTop:20 }}>
                    <Skeleton height={50} />
                </div>

                <div style={{ display: "flex", justifyContent:'space-between',gap: 12 }}>
                    <Skeleton height={40} width={120} />
                    <Skeleton height={40} width={120} />
                </div>
            </div>
            :
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
        }

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
