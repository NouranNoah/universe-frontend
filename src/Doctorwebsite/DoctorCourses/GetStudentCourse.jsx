import React, { useEffect, useMemo, useState } from 'react';
import profileDefult from '../../assets/default-profile-picture.jpg';
import SkeletonTable from '../../Dashboard/SkeletonTable';
import Pagination from '../../Components/Pagination/Pagination';

export default function GetStudentCourse({courseData}) {
    // ===== States =====
    const [students, setStudents] = useState([]);
   
    
    
    
      // ===== Pagination state =====
      const [currentPage, setCurrentPage] = useState(1);
      const studentsPerPage = 4;
      
    
    
    
      useEffect(() => {
        setStudents(courseData?.students)
      }, []);
    
    
      // ===== Pagination calculations =====
      const totalPages = Math.ceil(students.length / studentsPerPage);
    
      const indexOfLastStudent = currentPage * studentsPerPage;
      const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
      const currentStudents = students.slice(
        indexOfFirstStudent,
        indexOfLastStudent
      );
    
      return (
        <div className='User-content'>
            
                <label>Students</label>
            
    
            <table className="admins-table">
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>E-mail</th>
                    <th>Phone Number</th>
                    <th>Level</th>
                    <th>Status</th>
                </tr>
                </thead>
        
                <tbody>
                {currentStudents.length > 0 ? (
                    currentStudents.map(student => (
                    <tr key={student._id}>
                        <td>
                        <div className="admin-info">
                            <img
                            src={student.profileImage || profileDefult}
                            alt={student.name}
                            />
                            {student.name}
                        </div>
                        </td>
                        <td>{student.email}</td>
                        <td>{student.phone_number}</td>
                        <td>{student.level}</td>
                        <td>
                        {student.active
                            ? <p className='activebtn'>Active</p>
                            : <p className='inactivebtn'>Inactive</p>}
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
    