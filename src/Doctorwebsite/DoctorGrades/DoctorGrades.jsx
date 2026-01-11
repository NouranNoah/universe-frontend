import React, { useEffect, useState } from 'react'
import Component from './Component/Component'
import DataCourse from './DataCourse/DataCourse'
import { getMyCoursesFun } from '../../services/DoctorServices/gradeDocService';
import './DoctorGrades.css';

export default function DoctorGrades() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [studentsKey, setStudentsKey] = useState(0);

  const refreshStudents = () => {
    setStudentsKey(prev => prev + 1); // أي تغير يزيد المفتاح
  };
  const getCourses = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const data = await getMyCoursesFun();

      if (!data || data.length === 0) {
        setErrorMsg('No courses found.');
        setCourses([]);
        return;
      }

      setCourses(data);
      setSelectedCourseId(data[0]._id); //  default first course
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const selectedCourse = courses.find(
    course => course._id === selectedCourseId
  );

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="grades-loading">
        <div className="skeleton-title"></div>
        <div className="skeleton-select"></div>
        <div className="skeleton-box"></div>
        <div className="skeleton-box"></div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="grades-error">
        <p>{errorMsg}</p>
        <button onClick={getCourses}>Retry</button>
      </div>
    );
  }

  return (
    <div className="DoctorGrades">
      <div className="courses-header">
        <h2>Grade {selectedCourse?.name} </h2>

        <div className="filters">
          <div className="select-wrapper">
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Specific course content */}
      {selectedCourseId && (
        <>
          <Component courseId={selectedCourseId} onComponentsChange={refreshStudents}  />
          <DataCourse key={studentsKey}  courseId={selectedCourseId} />
        </>
      )}
    </div>
  );
}
