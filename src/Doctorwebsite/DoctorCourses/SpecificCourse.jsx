// 

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getDocCourseFun } from '../../services/DoctorServices/coursesDocService';
import AddNotificationDoc from './AddNotificationDoc';
import AddLinkDoc from './AddLinkDoc';
import Calendar from './Calendar/Calendar';
import LinksMaterial from './LinksMaterial/LinksMaterial';
import LinksQuizs from './LinksQuizs/LinksQuizs';
import GetStudentCourse from './GetStudentCourse';

export default function SpecificCourse() {
    const {id} = useParams();
    console.log(id);

    const[courseData , setCourseData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [errorMsg ,setErrorMsg]= useState('')
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddModalLinkLecture, setShowAddModalLinkLecture] = useState(false);
    const containerRef = useRef(null);
    const [lecId, setLecId] = useState('');
    const [nameLec, setNameLec] = useState('');
    

    

    function scrollLeft() {
        if(containerRef.current){
        containerRef.current.scrollBy({ left: -containerRef.current.clientWidth * 0.7, behavior: 'smooth' });
        }
    }

    function scrollRight() {
        if(containerRef.current){
        containerRef.current.scrollBy({ left: containerRef.current.clientWidth * 0.7, behavior: 'smooth' });
        }
    }
    const getCourse = async () => {
        setLoading(true);
        setErrorMsg('');

        try {
            const data = await getDocCourseFun(id);
            setCourseData(data);
        } catch (err) {
            console.error(err);

            // لو السيرفر رد برسالة
            if (err.response && err.response.data?.message) {
            setErrorMsg(err.response.data.message);
            } 
            // لو مفيش رد
            else {
            setErrorMsg("Something went wrong, please try again later");
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        getCourse();
    },[])

    
  return (
    <div className='SpecificCourse'>
        {
            loading?
            <div className="skeleton-container2">
                {/* Header Skeleton */}
                <div className="skeleton-header2">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-subtitle"></div>
                    <div className="skeleton-button"></div>
                </div>

                {/* Data Cards Skeleton */}
                <div className="skeleton-dataCards">
                    <div className="skeleton-card"></div>
                    <div className="skeleton-card"></div>
                    <div className="skeleton-card"></div>
                </div>

                {/* Lectures Skeleton */}
                <div className="skeleton-lectures">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="skeleton-lecture"></div>
                    ))}
                </div>

                {/* Calendar & Links Skeleton */}
                <div className="skeleton-right">
                    <div className="skeleton-calendar"></div>
                    <div className="skeleton-links"></div>
                    <div className="skeleton-quizs"></div>
                </div>
            </div>
            :
            <>
                {errorMsg && (
                    <p className="error">{errorMsg}</p>
                )}
                <div className='courseHeader'>
                    <div>
                        <h3>{courseData?.course?.name}</h3>
                        <p>{courseData?.totalStudents} Students</p>
                    </div>
                    <button className='btn-add' onClick={() => setShowAddModal(true) }>Send Notification</button>
                </div>
                <div className='coursesBoxs'>
                    <div className='coursesBox1'>
                        <div className='dataCard1'>
                            <div>
                                <label>Location</label>
                                <input type="text" value={courseData?.course?.location} readOnly/>
                            </div>
                            <div>
                                <label>Term</label>
                                <input type="text" value={courseData?.course?.term} readOnly/>
                            </div>
                            <div>
                                <label>hours</label>
                                <input type="text" value={courseData?.course?.hours} readOnly/>
                            </div>
                            
                        </div>
                        <div className='dataCard2'>
                            <label>Description</label>
                            <textarea value={courseData?.course?.description}></textarea>
                        </div>

                        {/* <div className='lecturesContainer'>
                            {
                                courseData?.lectures?.length >= 4 ?(
                                    <div className='slideCardIcon'>
                                        <i className="slideCardIcon1 fa-solid fa-caret-left" onClick={scrollLeft}></i>
                                        <i className="slideCardIcon2 fa-solid fa-caret-right" onClick={scrollRight}></i>
                                    </div>
                                ):""
                            }
                            {courseData?.lectures?.length === 0 ? (
                                <p>No lectures found</p>
                            ) : (
                                <div className='lecturesSlider' ref={containerRef}>
                                {courseData?.lectures?.map((lec, index) => (
                                    <div className='lectureCard' key={lec._id}>
                                        <h4>{lec.name}</h4>
                                        <p>{lec.present || 0} Present</p>
                                        <div><button className='btn-add' onClick={()=>{
                                            setShowAddModalLinkLecture(true)
                                            setLecId(lec._id)
                                            setNameLec(lec.name)
                                        }}>Add Links</button></div>
                                    </div>
                                ))}
                                </div>
                            )}
                        </div> */}

                        
                            <GetStudentCourse courseData={courseData} />
                        

                    </div>
                    <div className='coursesBox2'>
                        <Calendar courseData={courseData}/>
                        <LinksMaterial getCourse={getCourse} courseData={courseData}/>
                        <LinksQuizs getCourse={getCourse} courseData={courseData}/>
                    </div>
                </div>
            </>
        }
        {showAddModal && (
            <div className="modal-overlay">
            <AddNotificationDoc  setShowAddModal={setShowAddModal} courseId={id} />
            </div>
        )}
        {showAddModalLinkLecture && (
            <div className="modal-overlay">
            <AddLinkDoc setShowAddModalLinkLecture={setShowAddModalLinkLecture} lecId={lecId} nameLec={nameLec} />
            </div>
        )}
    </div>
  )
}
