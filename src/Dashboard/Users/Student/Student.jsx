import React, { useEffect, useMemo, useState } from 'react';
import { getAllStudentFun } from '../../../services/usersService';
import profileDefult from '../../../assets/default-profile-picture.jpg';
import SkeletonTable from '../../SkeletonTable';
import AddStudent from './AddStudent';
import Pagination from '../../../Components/Pagination/Pagination';
import ProfileStudent from './ProfileStudent';

export default function StudentsTable() {
  // ===== States =====
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [StudentId , setStudentId] = useState('');

  // ===== Pagination state =====
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;
  

  // ===== Fetch students =====
  const getStudents = async () => {
    setLoading(true);
    try {
      const data = await getAllStudentFun();
      setStudents(data);
    } catch (err) {
      console.log("error", err);
      setError("Failed to fetch Students!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // ===== Filtered students =====
  const filteredStudents = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return students.filter(student =>
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.phone_number.includes(term)
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
        <h2>Students ({students.length})</h2>
        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder='Search for name or phone or E-mail'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // مهم
            }}
          />
        </div>
        <button className='btn-add' onClick={() => setShowAddModal(true)}>
          Add new Student
        </button>
      </div>

      <table className="admins-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>E-mail</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Level</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <SkeletonTable  rows={5} columns={6} />
          ) : currentStudents.length > 0 ? (
            currentStudents.map(student => (
              <tr key={student._id} onClick={()=> { setShowProfileModal(true) ,setStudentId(student._id)} }>
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
                <td>{student.department}</td>
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

      {error && <p className="error">{error}</p>}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        maxVisiblePages={3}
      />

      {showAddModal && (
        <div className="modal-overlay">
          <AddStudent
            setShowAddModal={setShowAddModal}
            getStudents={getStudents}
          />
        </div>
      )}
      {showProfileModal && (
        <div className="modal-overlay">
            <ProfileStudent setShowProfileModal={setShowProfileModal} StudentId={StudentId} getStudents={getStudents}/>
        </div>
       )}
    </div>
  );
}
