import React, { useEffect, useState } from 'react';
import SkeletonTable from '../../SkeletonTable';
import profileDefault from '../../../assets/default-profile-picture.jpg';
import Pagination from '../../../Components/Pagination/Pagination';
import { getAllComplaintFun } from '../../../services/reportService';

export default function ComplaintReports() {
  const [ComplaintData, setComplaintData] = useState({
    count:0,
    data: []
  });

  const [activeFilter, setActiveFilter] = useState('student');
  const [loading, setLoading] = useState(true);
  const [compId,setcompId] =useState('')
  const [errmsg, setErrmsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const[showDeleteCon ,setShowDeleteCon] =useState(false);
  

  const reportsPerPage = 4;

  
    const fetchComplaint = async () => {
        try {
            setLoading(true);
            const data = await getAllComplaintFun(activeFilter);
            setComplaintData(data);
            setCurrentPage(1);
        } catch (err) {
            setErrmsg('Failed to fetch reports');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchComplaint();
    }, [activeFilter]);


    const totalPages = Math.ceil(
        (ComplaintData.data?.length || 0) / reportsPerPage
    );


    const indexOfLast = currentPage * reportsPerPage;
    const indexOfFirst = indexOfLast - reportsPerPage;
    const currentReports = (ComplaintData.data || []).slice(
        indexOfFirst,
        indexOfLast
    );




  return (
    <div className='reportcontent'>
      <div className="headReports">
        <h3>
            Complaint list ({ComplaintData.count})
        </h3>
        <div className="btn-filter">
            <button
                className={activeFilter === 'student' ? 'active' : ''}
                onClick={() => setActiveFilter('student')}
            >
                Students
            </button>

            <button
                className={activeFilter === 'professor' ? 'active' : ''}
                onClick={() => setActiveFilter('professor')}
            >
                Instructors
            </button>
        </div>
      </div>
      <h4>Complaint Reports / {activeFilter}</h4>
      {/* Table */}
      <table className="admins-table">
        <thead>
            <tr>
                <th>Report Date</th>
                <th>{activeFilter} name</th>
                <th>Complaints details</th>
            </tr>
        </thead>

        <tbody>
          {loading ? (
            <SkeletonTable rows={4} columns={3} />
          ) : currentReports.length > 0 ? (
            currentReports.map(comp => (
              <tr key={comp._id}>
                <td style={{textAlign:'start'}}>{comp.createdAt.split('T')[0]}</td>
                <td>
                  <div className="course-infor">
                    <img
                      src={comp.user?.profileImage || profileDefault}
                      alt={comp.user?.name}
                    />
                    {comp.user?.name}
                  </div>
                </td>
                <td style={{textAlign:'start'}}>{comp.subject}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No Complaints found</td>
            </tr>
          )}
        </tbody>
      </table>

      {errmsg && <p className="error">{errmsg}</p>}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        maxVisiblePages={3}
      />
        {/* {
            showDeleteCon && (
                <div className='deletemsg'>
                    <p>Are You sure you want to delete complaint?</p>
                    <div>
                        <button className="left-btn" onClick={()=>{
                            deletComplaint()
                            setShowProfileModal(false)
                        }
                        }>Delete</button>
                        <button className="right-btn" onClick={()=> setShowDeleteCon(false)}>Cancle</button>
                    </div>
                </div>
            )
        } */}

        
    </div>
  );
}
