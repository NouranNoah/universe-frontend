import React, { useEffect, useMemo, useState } from 'react'
import './Courses.css'
import { getAllCoursesFun } from '../../services/coursesServices';
import profileDefult from '../../assets/default-profile-picture.jpg';
import AddCourse from './AddCourse';
import CoursesModal from './CoursesModal/CoursesModal';
import SkeletonTable from '../SkeletonTable';
import { useParams } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';

export default function Courses() {
    const {type} = useParams();
    const coursesType = useMemo(() => {
        if (type === "doctor") return "doctor"; 
        if (type === "teaching assistant") return "teaching assistant"; 
        return null;
    }, [type]);


    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [coursesId,setCoursesId] =useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 4;
    
    const filteredCourses = useMemo(()=>{
        const term = searchTerm.toLowerCase();
        return courses.filter((course) =>
                course.name.toLowerCase().includes(term)
            );
    },[searchTerm,courses])
    
        
    const getCourses = async()=>{
        if (!coursesType) {
            setError('Invalid course type');
            setLoading(false)
            return;
        }

        setLoading(true);
        try{
            const data = await getAllCoursesFun(coursesType);
            setError('')
            setCourses(data.allCourses);
        }catch(err){
            console.log("error", err);
            setError("Failed to fetch Courses");
        }finally {
            setLoading(false);
        } 
    }
    
    useEffect(()=>{
        getCourses();
    },[coursesType])
    
        
    
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    const indexOfLastInstructors = currentPage * coursesPerPage;
    const indexOfFirstInstructors = indexOfLastInstructors - coursesPerPage;
    const currentCourses = filteredCourses.slice(
        indexOfFirstInstructors,
        indexOfLastInstructors
    );
    return (
        <div className='Admins-content'>
            <div className='Admins-header'>
                <h2>Courses / {coursesType} ({courses.length})</h2>
                <div>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                    type="text"
                    placeholder='Search for name'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <button className='btn-add' onClick={() => setShowAddModal(true)}>Add new course</button>
            </div>

            <table className="admins-table">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Instructor name</th>
                        <th>Department</th>
                        <th>Students</th>
                        <th>Status</th>
                    </tr>
                </thead>
    
                <tbody>
                    {loading ? (
                        <SkeletonTable rows={4} columns={6}  />
                    ) : currentCourses.length > 0 ? (
                        currentCourses.map(course => (
                            <tr key={course._id} onClick={() => { setShowProfileModal(true); setCoursesId(course._id); }}>
                                <td>ID #{course._id.slice(-6).toUpperCase()}</td>
                                <td>{course.name}</td>
                                <td>
                                    <div className="course-info">
                                        <img src={course.professor.profileImage || profileDefult} alt={course.professor.name} />
                                        {course.professor.name}
                                    </div>
                                </td>
                                <td>{course.department}</td>
                                <td>{course.studentNumber}/{course.availableSeats}</td>
                                <td>{course.active
                                ? <p className='activebtn'>Active</p>
                                : <p className='inactivebtn'>Inactive</p>
                                }</td>
                            </tr>
                        ))
                    ) : (
                            <tr><td colSpan={6}>No courses found</td></tr>
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
                <AddCourse courses={courses} setShowAddModal={setShowAddModal} getCourses={getCourses} coursesType={coursesType}/>
                </div>
            )}

            {showProfileModal && (
                <div className="modal-overlay">
                    <CoursesModal courses={courses} setShowProfileModal={setShowProfileModal} coursesId={ coursesId} getCourses={getCourses}/>
                </div>
            )}
        </div>
    )
}