import React, { useEffect, useMemo, useState } from 'react'
import Pagination from '../../Components/Pagination/Pagination';
import SkeletonTable from '../../Dashboard/SkeletonTable';

export default function StudentAttendance({lastAttendance}) {
  // ===== States =====
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  

  // ===== Pagination state =====
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;
  

  useEffect(() => {
    setLoading(true);
    setStudents(lastAttendance?.students || []);
    setLoading(false);
  }, [lastAttendance]); 


  // ===== Filtered students =====
  const filteredStudents = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return students.filter(student =>
      student.student.name.toLowerCase().includes(term) ||
      student.student._id.toLowerCase().includes(term) 
    );
  }, [searchTerm, students]);

  // ===== Pagination calculations =====
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  return (
    <div className='User-content'>
      <div className='Admins-header'>
        <h2>Attendance ( {lastAttendance?.qr?.totalStudent} )</h2>
        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder='Search for name or id'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // مهم
            }}
          />
        </div>
      </div>

      <table className="admins-table">
        <thead>
          <tr>
            <th>Attendace ID</th>
            <th>Attendace date</th>
            <th>Student Name</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <SkeletonTable  rows={5} columns={3} />
          ) : currentStudents.length > 0 ? (
            currentStudents.map(data => (
              <tr key={data._id}>
                <td># {data._id.slice(-6).toUpperCase()}</td>
                <td>{data.createdAt.split('T')[0]}</td>
                <td>
                    {data.student.name}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No students found</td>
            </tr>
          )}
        </tbody>
      </table>

      

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        maxVisiblePages={3}
      />

      
    </div>
  );
}
