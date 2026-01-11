import React, { useEffect, useMemo, useState } from 'react';
import profileDefult from '../../../assets/default-profile-picture.jpg';
import SkeletonTable from '../../../Dashboard/SkeletonTable';
import Pagination from '../../../Components/Pagination/Pagination';
import {
  getStudentofCourseFun,
  updateGradesofStudentFun,
  getComponentOfCourseFun
} from '../../../services/DoctorServices/gradeDocService';
import FinalizeModal from './FinalizeModal';

export default function DataCourse({ courseId ,studentsKey}) {

  /* ================= States ================= */
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [error, setError] = useState(null);

  const [editStudentId, setEditStudentId] = useState(null);
  const [editGrades, setEditGrades] = useState({});
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);

  const [isFinalized, setIsFinalized] = useState(false);
  
  /* ================= Pagination ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;

  /* ================= Fetch Data ================= */
   const getStudents = async () => {
    setError('')
    try {
      const data = await getStudentofCourseFun(courseId);
      setStudents(data.data.students || []);
      setIsFinalized(data.finalized)
    } catch (err) {
      console.error(err);
      setError('Failed to fetch students');
    }
  };

  const getComponents = async () => {
    try {
      const data = await getComponentOfCourseFun(courseId);
      setComponents(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      Promise.all([getStudents(), getComponents()]).finally(() =>
        setLoading(false)
      );
      setCurrentPage(1);
      setError('')
    }
  }, [courseId, studentsKey]); 

  useEffect(() => {
  if (isFinalized) {
    setEditStudentId(null);
    setEditGrades({});
  }
}, [isFinalized]);



  /* ================= Filter ================= */
  const filteredStudents = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return students.filter(student =>
      student.name.toLowerCase().includes(term) ||
      student.level?.toLowerCase().includes(term)
    );
  }, [searchTerm, students]);

  /* ================= Pagination ================= */
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  /* ================= Edit Logic ================= */
  const handleEdit = (student) => {
    if (isFinalized) return;
    setEditStudentId(student._id);

    const gradesObj = {};
    components.forEach(comp => {
      const found = student.grades.find(g => g.name === comp.name);
      gradesObj[comp.name] = found?.grade ?? 0;
    });

    setEditGrades(gradesObj);
  };

  const handleSave = async (studentId) => {
    setLoadingSave(true)
    try {
      for (const componentName in editGrades) {
        await updateGradesofStudentFun(courseId, studentId, {
          componentName,
          grade: editGrades[componentName]
        });
      }
      setError('');
      setEditStudentId(null);
      setEditGrades({});
      getStudents();
    } catch (err) {
      console.error(err.response.data.message);
      if(err.response?.data?.message){
        setError(err.response.data.message);
      }
      else{
        setError('Failed to save grades');
      }
    }finally{
      setLoadingSave(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div
      className="User-content"
      style={{ backgroundColor: '#F7F9F9', padding: '10px', borderRadius: '24px' }}
    >
      <div className="Admins-header">
        <h2>Students ({students.length})</h2>

        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search for Name or Level"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <button
          className={`btn-add ${isFinalized ? 'disabled' : ''}`}
          disabled={isFinalized}
          onClick={() => setShowFinalizeModal(true)}
        >
          {isFinalized ? 'Grades Finalized' : 'Finalize Grades & GPA'}
        </button>
      </div>
      
      {error && <p className="error">{error}</p>}

      <table className="admins-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Level</th>

            {!isFinalized &&
              components.map(comp => (
                <th key={comp._id}>{comp.name}</th>
              ))
            }

            {isFinalized && <th>Total</th>}
            {isFinalized && <th>Status</th>}

            {!isFinalized && <th>Action</th>}
          </tr>
        </thead>


        <tbody>
          {loading ? (
            <SkeletonTable rows={5} columns={components.length + 4} />
          ) : currentStudents.length > 0 ? (
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

                <td>{student.level}</td>

                {!isFinalized &&
                  components.map(comp => {
                    const studentGrade = student.grades.find(
                      g => g.name === comp.name
                    );

                    return (
                      <td key={comp._id}>
                        {editStudentId === student._id ? (
                          <input
                            className="editInput"
                            type="number"
                            min={0}
                            value={editGrades[comp.name] ?? 0}
                            onChange={(e) =>
                              setEditGrades({
                                ...editGrades,
                                [comp.name]: Number(e.target.value)
                              })
                            }
                          />
                        ) : (
                          studentGrade?.grade ?? 0
                        )}
                      </td>
                    );
                  })
                }

                {isFinalized && <td>{student.total}</td>}

                {isFinalized && (
                  <td>
                    <span className={`status ${student.status}`}>
                      {student.status}
                    </span>
                  </td>
                )}


                {!isFinalized && (
                  <td>
                    {editStudentId === student._id ? (
                      <p
                        className="activebtnSave"
                        onClick={() => handleSave(student._id)}
                      >
                        {loadingSave ? 'Saving...' : (
                          <>
                            <i className="fa-regular fa-circle-check"></i> Save
                          </>
                        )}
                      </p>
                    ) : (
                      <p
                        className="activebtnEdit"
                        onClick={() => handleEdit(student)}
                      >
                        <i className="fa-regular fa-pen-to-square"></i> Edit
                      </p>
                    )}
                  </td>
                )}


              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={components.length + 4}>
                No students found
              </td>
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

      {showFinalizeModal && (
        <div className="modal-overlay">
          <FinalizeModal courseId={courseId} setIsFinalized={setIsFinalized} setShowFinalizeModal={setShowFinalizeModal} />
        </div>
      )}
    </div>
  );
}
