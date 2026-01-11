import React, { useEffect, useState } from 'react';
import { getAllReportsFun } from '../../../services/reportService';
import SkeletonTable from '../../SkeletonTable';
import profileDefault from '../../../assets/default-profile-picture.jpg';
import Pagination from '../../../Components/Pagination/Pagination';
import StarRating from '../../../Components/StarRating/StarRating';
import ReportModal from './ReportModal';

export default function Applicationreports() {
  const [reportsData, setReportsData] = useState({
    reports: [],
    stats: { totalReports: 0 }
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [reportId,setreportId] =useState('')
  const [errmsg, setErrmsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const reportsPerPage = 4;

  
    const fetchReports = async () => {
        try {
        setLoading(true);
        const data = await getAllReportsFun(activeFilter);
        setReportsData(data);
        setCurrentPage(1);
        } catch (err) {
        setErrmsg('Failed to fetch reports');
        } finally {
        setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchReports();
    }, [activeFilter]);

  
  const totalPages = Math.ceil(
    reportsData.reports.length / reportsPerPage
  );

  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;

  const currentReports = reportsData.reports.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div className='reportcontent'>
      <div className="headReports">
        <h3>
            Reports list ({reportsData?.stats?.totalReports || 0})
        </h3>

        <div className="btn-filter">
            <button
                className={activeFilter === 'all' ? 'active' : ''}
                onClick={() => setActiveFilter('all')}
            >
                All
            </button>

            <button
                className={activeFilter === 'student' ? 'active' : ''}
                onClick={() => setActiveFilter('student')}
            >
                Students
            </button>

            <button
                className={activeFilter === 'doctor' ? 'active' : ''}
                onClick={() => setActiveFilter('doctor')}
            >
                Instructors
            </button>
        </div>
      </div>
      <h4>Application reports / {activeFilter}</h4>
      {/* Table */}
      <table className="admins-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Instructor name</th>
            <th>Review details</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <SkeletonTable rows={4} columns={5} />
          ) : currentReports.length > 0 ? (
            currentReports.map(report => (
              <tr key={report._id} onClick={()=>{ setreportId(report._id), setShowProfileModal(true)}}>
                <td style={{textAlign:'start'}}>ID #{report._id.slice(-6).toUpperCase()}</td>
                <td style={{textAlign:'start'}}>{report.createdAt.split('T')[0]}</td>
                <td>
                  <div className="course-infor">
                    <img
                      src={report.user?.profileImage || profileDefault}
                      alt={report.user?.name}
                    />
                    {report.user?.name}
                  </div>
                </td>
                <td style={{textAlign:'start'}}>{report.title}</td>
                <td style={{textAlign:'start'}}><StarRating rating={report.ratings}/></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No reports found</td>
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

        {showProfileModal && (
            <div className="modal-overlay">
                <ReportModal reportsData={reportsData} setShowProfileModal={setShowProfileModal} reportId={ reportId} fetchReports={fetchReports}/>
            </div>
        )}
    </div>
  );
}

