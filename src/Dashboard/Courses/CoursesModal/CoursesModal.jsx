import React, { useEffect, useState } from 'react';
import CourseInfo from './CourseInfo';
import CourseSchedule from './CourseSchedule';
import { editStatueCoursesFun, getCourseFun } from '../../../services/coursesServices';
import Skeleton from 'react-loading-skeleton';
import EditCourse from '../EditCourse/EditCourse';

export default function CoursesModal({ courses,getCourses, setShowProfileModal,coursesId }) {
  const [activeTab, setActiveTab] = useState('details');
  const [dataCourse, setDataCourse] = useState({
    name: "",
    availableSeats: "",
    degrees: "",
    hours: "",
    professor: "", 
    location: "", 
    department: "", 
    term: "", 
    description: "",
    prerequisites: [],
    schedule: []
  })
  const [errormsg , setErrormsg] = useState('');
  const [loading ,setLoading] = useState(false);
  const[showDeleteCon ,setShowDeleteCon] =useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const getCourse = async ()=>{
      setLoading(true);
      try{
        const data = await getCourseFun(coursesId);
        setDataCourse(data); 
        console.log('section',coursesId);
        
      }catch(err){
        console.log(err.response?.data?.errors?.[0]?.msg|| "Failed to fetch Course!");
        setErrormsg(err.response?.data?.errors?.[0]?.msg|| "Failed to fetch Course!")
      }finally{
        setLoading(false);
      }
    }
  useEffect(()=>{
    getCourse();
  },[])
  const updateCourseStatus = async ()=>{
    try{
      const data =await editStatueCoursesFun(coursesId);
      setShowDeleteCon(false);
      getCourses();
      setShowProfileModal(false);
    }catch(err){
      console.log(err.response?.data?.errors?.[0]?.msg|| "Failed to fetch Course!");
      setErrormsg(err.response?.data?.errors?.[0]?.msg|| "Failed to fetch Course!")
    }
  }
  const ProfileSkeleton = () => (
    <div className="profileUser">
      <div style={{ display: 'flex', gap: '20px' }}>
          <Skeleton  width={300} height={200} />
          <div style={{ flex: 1  , flexDirection: 'column'}}>
          <Skeleton height={50} width={400} />
          <Skeleton height={50} width={400} style={{ marginTop: 15 }} />
          <Skeleton height={50} width={400} style={{ marginTop: 15 }} />
          </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          <Skeleton height={50} width={350} />
          <Skeleton height={50} width={350} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          <Skeleton height={50} width={350} />
          <Skeleton height={50} width={350} />
      </div>
      <div style={{ display: 'flex', marginTop: 30 }}>
          <Skeleton height={50} width={750} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          <Skeleton height={40} width={150} />
          <Skeleton height={40} width={150} />
      </div>
    </div>
  );
  return (
    <div className="modal-boxs">
      {
        loading? 
          <ProfileSkeleton /> 
        :
        <>
          <i className="closeicon fa-solid fa-xmark" onClick={() => setShowProfileModal(false)}></i>
          <h3>{dataCourse.name}</h3>

          <div className="tabs">
            <button className={activeTab === 'details' ? "right-btn":"left-btn"} onClick={() => setActiveTab('details')}>Details</button>
            <button className={activeTab === 'schedule' ? "right-btn":"left-btn"} onClick={() => setActiveTab('schedule')}>Schedule</button>
          </div>
          {errormsg && <p className="error">{errormsg}</p>}
          {activeTab === 'details' && <CourseInfo dataCourse={dataCourse} courses={courses} />}
          {activeTab === 'schedule' && <CourseSchedule dataCourse={dataCourse} />}
          <div className="btns-group">
              <button type="button" className="left-btn" onClick={()=> setShowDeleteCon(true)}>
              <i className="fa-solid fa-ban"></i> {dataCourse.active? "Block Course" : 'Unblock Course'}
              </button>

              <button type="button" className="right-btn" onClick={() => setShowEditModal(true)}>
              <i className="fa-regular fa-pen-to-square"></i> Edit Course
              </button>
          </div>
        </>
      }
      {
        showDeleteCon &&(
          <div className='deletemsg'>
            {
              dataCourse.active? 
              <p>Are You sure you want to block this Course?</p>
              :
              <p>Are You sure you want to unblock this Course?</p>
            }
            <div>
              <button className="left-btn" onClick={()=>updateCourseStatus()}>
                  {dataCourse.active? "Block":'Unblock'}
              </button>
              <button className="right-btn" onClick={()=> setShowDeleteCon(false)}>Cancle</button>
            </div>
          </div>
        )
      }
      {
            showEditModal && (
              <div className="modal-overlay">
                <EditCourse
                dataCourse ={dataCourse}
                setShowEditModal={setShowEditModal}
                coursesId ={coursesId}
                getCourses={getCourses}
                courses={courses}
                setShowProfileModal={setShowProfileModal}
                />
              </div>
            )
      }
    </div>
  );
}
