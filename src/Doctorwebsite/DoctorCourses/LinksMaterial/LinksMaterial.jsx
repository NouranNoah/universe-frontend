import React, { useEffect, useState } from "react";
import './Linkss.css';
import AddLinksMaterial from "./AddLinksMaterial";

export default function LinksDisplay({ courseData,getCourse }) {
  const [linkMaterial, setLinkMaterial] = useState([]);
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(true); 
  const [showAddModalLink,setShowAddModalLink] =useState(false);
  const [nameCourse, setNameCourse]=useState('')

  useEffect(() => {
    try {
      if (courseData?.course?.matrialLinks?.length) {
        setLinkMaterial(courseData.course.matrialLinks);
        setErrormsg("");
      } else {
        setLinkMaterial([]);
        setErrormsg("No material links available.");
      }
    } catch (error) {
      setErrormsg("Error loading links yet.");
      setLinkMaterial([]);
    } finally {
      setLoading(false); // خلصنا اللودينج
    }
  }, [courseData]);

  return (
    <div className='linksContent'>
      <div className='linksHeader'>
        <h3>Material Links</h3>
        <div onClick={()=>{
          setShowAddModalLink(true)
          setNameCourse(courseData.course.name)
        }}><i className="fa-solid fa-plus"></i></div>
      </div>

      <div className='put-links'>
        {loading && <p>Loading...</p>}
        {!loading && errormsg && <p className="error">{errormsg}</p>}
        {!loading && linkMaterial.length > 0 && linkMaterial.map((link, index) => (
          <input key={index} type="text" value={link} readOnly />
        ))}
      </div>
      {showAddModalLink && (
                  <div className="modal-overlay">
                  <AddLinksMaterial getCourse={getCourse} setShowAddModalLink={setShowAddModalLink}  nameCourse={nameCourse} />
                  </div>
              )}
    </div>
  );
}
