import React, { useEffect, useState } from 'react'
import AddLinksQuizs from './AddLinksQuizs';

export default function LinksQuizs({courseData,getCourse}) {
    const [linkQuiz, setLinkQuiz] = useState([]);
      const [errormsg, setErrormsg] = useState("");
      const [loading, setLoading] = useState(true); 
      const [showAddModalLink,setShowAddModalLink] =useState(false);
      const [nameCourse, setNameCourse]=useState('')
    
      useEffect(() => {
        try {
          if (courseData?.course?.quizLinks?.length) {
            setLinkQuiz(courseData.course.quizLinks);
            setErrormsg("");
          } else {
            setLinkQuiz([]);
            setErrormsg("No quiz links available yet.");
          }
        } catch (error) {
          setErrormsg("Error loading links.");
          setLinkQuiz([]);
        } finally {
          setLoading(false); 
        }
      }, [courseData]);
  return (
    <div className='linksContent'>
        <div className='linksHeader'>
            <h3>Quiz Links</h3>
            <div onClick={()=>{
                setShowAddModalLink(true)
                setNameCourse(courseData.course.name)
            }}><i className="fa-solid fa-plus"></i></div>
        </div>

        <div className='put-links'>
        {loading && <p>Loading...</p>}
        {!loading && errormsg && <p className="error">{errormsg}</p>}
        {!loading && linkQuiz.length > 0 && linkQuiz.map((link, index) => (
            <input key={index} type="text" value={link} readOnly />
        ))}
        </div>
        {showAddModalLink && (
            <div className="modal-overlay">
                <AddLinksQuizs getCourse={getCourse} setShowAddModalLink={setShowAddModalLink}  nameCourse={nameCourse} />
            </div>
        )}
    </div>
  )
}
