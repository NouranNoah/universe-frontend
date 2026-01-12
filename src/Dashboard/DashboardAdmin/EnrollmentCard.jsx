import React, { useEffect, useMemo, useState, useContext } from 'react';
import SkeletonTable from '../SkeletonTable';
import profileDefult from '../../assets/default-profile-picture.jpg';
import Pagination from '../../Components/Pagination/Pagination';
import { getEnrollmentListFun } from '../../services/dashboardAdmin';
import { AuthContext } from '../../Auth/AuthContext/authContext';


export default function EnrollmentCard() {
    const { user } = useContext(AuthContext);
    const [EnrollmentList, setEnrollmentList] = useState({
        count: 0,
        data: []
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const attendancePerPage = 4;

      /* ================== FILTER ================== */
    const filteredAttendance = useMemo(() => {
        const term = searchTerm.toLowerCase();

        return EnrollmentList.data.filter(item =>
            item.course?.name?.toLowerCase().includes(term)
        );
    }, [searchTerm, EnrollmentList]);

      /* ================== FETCH ================== */
    const getEnrollmentList = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const data = await getEnrollmentListFun();
            setEnrollmentList(data);
        } catch (err) {
            console.error(err);
    
            if (err.response) {
                const status = err.response.status;
                const message = err.response.data?.message;
    
                if (status === 401) {
                    setError("Session expired. Please login again.");
                } else if (status === 403) {
                    setError("You are not allowed to access this page.");
                } else {
                    setError(message || "Something went wrong. Please try again.");
                }
            } else {
                setError("Network error. Please check your connection.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (user) {
            getEnrollmentList();
        }
    }, [user]);
    
      /* Reset page when searching */
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

      /* ================== PAGINATION ================== */
    const totalPages = Math.ceil(filteredAttendance.length / attendancePerPage);

    const indexOfLast = currentPage * attendancePerPage;
    const indexOfFirst = indexOfLast - attendancePerPage;

    const currentEnrollmentList = filteredAttendance.slice(
        indexOfFirst,
        indexOfLast
);
    return (
        <div className='Admins-content'>
            <div className='Admins-header'>
                <h2 style={{fontSize:'20px'}}>Enrollment List( {EnrollmentList.count} )</h2>
        
                <div>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                    type="text"
                    placeholder="Search by course"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <table className="admins-table">
            <thead>
                <tr>
                <th>Enrollment ID</th>
                <th>Enrollment Date</th>
                <th>Student Name</th>
                <th>Doctor Name</th>
                <th>Course Name</th>
                </tr>
            </thead>
    
            <tbody>
                {loading ? (
                <SkeletonTable rows={4} columns={5} />
                ) : currentEnrollmentList.length > 0 ? (
                currentEnrollmentList.map(item => (
                    <tr key={item.enrollId}>
                    <td>ID #{item.enrollId.slice(-6).toUpperCase()}</td>
                    <td>{item.enrolledAt.split("T")[0]}</td>
    
                    <td>
                        <div className="course-info">
                        <img
                            src={item.student.image || profileDefult}
                            alt={item.student.name}
                        />
                        {item.student.name}
                        </div>
                    </td>
    
                    <td>
                        <div className="course-info">
                        <img
                            src={item.course.professor.image || profileDefult}
                            alt={item.course.professor.name}
                        />
                        {item.course.professor.name}
                        </div>
                    </td>
    
                    <td>{item.course.name}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={5}>No attendance records found</td>
                </tr>
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
        </div>
    )
}
