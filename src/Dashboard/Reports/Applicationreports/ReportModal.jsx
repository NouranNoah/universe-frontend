import React, { useEffect, useState } from 'react'
import { deletereportFun, getreportFun } from '../../../services/reportService';

export default function ReportModal({reportId,setShowProfileModal,reportsData,fetchReports}) {
  const [report ,setReport] = useState({
      title:'',
      ratings:0,
      type:''
    })
    const [errormsg,setErrormsg] = useState('');
    const[showDeleteCon ,setShowDeleteCon] =useState(false);


    useEffect(()=>{
        const getreport = async () =>{
        try{
            const data = await getreportFun(reportId);        
            setReport(data)
        }catch(err){
            console.log(err);
            setErrormsg(
                err.response?.data?.errors?.[0]?.msg ||
                err.response?.data?.message ||
                "Failed to get report"
            );
        }
    }
    getreport();
    },[])

    const deleteReport = async () =>{
        try{
            const data = await deletereportFun(reportId);
            fetchReports();
            setShowProfileModal(false)
        }catch(err){
            console.log('error',err.response);
            setShowDeleteCon(false);
            setErrormsg(err.response?.data?.message);
        }
    }


  return (
    <div className="modal-overlay">
        <div className='modal-box profile-modal'>

        <i
          className="closeicon fa-solid fa-xmark"
          onClick={() => {setShowProfileModal(false)}}
        ></i>
        <h3>Report</h3>
        <p className='error'>{errormsg ? errormsg :''}</p>
        
            <div className='datadepart'>
                <label>Report Title:</label>
                <input
                type="text"
                readOnly
                value={report?.title || ''}
                />
            </div>
            <div className='datadepart'>
                <label>Report Type:</label>
                <input
                type="text"
                readOnly
                value={report?.type || ''}
                />
            </div>
            <div className='datadepart'>
                <label>Ratings</label>
                <input
                type="text"
                readOnly
                value={report?.ratings || ''}
                />
            </div>
            <div className="btns-group">
                <button type="button" className="left-btn" onClick={()=> setShowDeleteCon(true)}>
                <i className="fa-solid fa-ban"></i> Delete
                </button>
            </div>
        </div>

        {
            showDeleteCon && (
                <div className='deletemsgD'>
                    <p>Are You sure you want to delete this report?</p>
                    <div>
                        <button className="left-btn" onClick={()=>{
                            deleteReport()
                            setShowProfileModal(false)
                        }
                        }>Delete
                        </button>
                        <button className="right-btn" onClick={()=> setShowDeleteCon(false)}>Cancle</button>
                    </div>
                </div>
            )
        }
    </div>
  )
}
