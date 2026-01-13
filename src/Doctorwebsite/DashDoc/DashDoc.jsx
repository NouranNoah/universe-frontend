import React, { useEffect, useState, useContext } from 'react'
import {  getNumStudentCoursesFun } from '../../services/DoctorServices/dashServices';
import SkeletonOverviewCard from '../../Components/SkeletonOverviewCard/SkeletonOverviewCard';
import dashstudenticon from '../../assets/dashstudenticon.png'
import dash3icon from '../../assets/dash3icon.png'
import './DashDoc.css'
import AttendanceStats from './AttendanceStats';
import PerformanceAnalysis from './PerformanceAnalysis';
import { AuthContext } from '../../Auth/AuthContext/authContext';
import Cookies from "js-cookie";


export default function DashDoc() {
  const { user } = useContext(AuthContext);
  const [numData , setNumData]= useState({
    activeCourses:{},
    totalStudents:{}
  })
  const token = Cookies.get("Bearer");
  console.log(token);


  const [loading , setLoading]= useState(false);
  const [errorMsg , setErrorMsg] = useState('');

  const getNumStudentCourse = async()=>{
    setLoading(true);
    setErrorMsg('');
    try{
      const data = await getNumStudentCoursesFun();
      setNumData(data);
    }catch(err){
      console.error(err);
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;

        if (status === 401) {
          setErrorMsg("Session expired, please login again");
        } 
        else if (status === 403) {
          setErrorMsg("You are not allowed to access this data");
        } 
        else {
          setErrorMsg(message || "Something went wrong");
        }
      } 
      else {
        setErrorMsg("Network error, please try again");
      }
    }finally{
      setLoading(false)
    }
  }
  
  
  //for color
  const getChangeClass = (change) => {
    if (!change || change === 'no change') return 'neutral';
    if (change.startsWith('+')) return 'positive';
    if (change.startsWith('-')) return 'negative';
  };
  const getChangeIcon = (change) => {
    if (!change || change === 'no change') return '';
    if (change.startsWith('+')) return <i className="fa-solid fa-angles-up"></i>;
    if (change.startsWith('-')) return <i className="fa-solid fa-angles-down"></i>;
  };
  
  useEffect(()=>{
    if (user) {
      getNumStudentCourse();
    }
  },[user])
  
  return (
    <div className='dashDoc'>
      {errorMsg && <p className="error">{errorMsg}</p>}
        <div className='total-boxsDoc'>
          {loading ? (
            Array(2)
            .fill(0)
            .map((_, i) => <SkeletonOverviewCard key={i} />)
            ) : (
              <>
                <div className='Total-box'>
                  <div>
                    <p className='text'>Total Students</p>
                    <p className='numOverview'>{numData.totalStudents.count}</p>
                    <p className={`presOverview ${getChangeClass(numData.totalStudents.change)}`}>{getChangeIcon(numData.totalStudents.change)} {numData.totalStudents.change} from last month</p>
                  </div>
                  <img src={dashstudenticon} alt="" />
                </div>
        
                <div className='Total-box'>
                  <div>
                    <p className='text'>Active Courses</p>
                    <p className='numOverview'>{numData.activeCourses.count}</p>
                    <p className={`presOverview ${getChangeClass(numData.activeCourses.change)}`}>{getChangeIcon(numData.activeCourses.change)} {numData.activeCourses.change} from last month</p>
                  </div>
                  <img src={dash3icon} alt="" />
                </div>
              </>
            )
          }
        </div>
        <div className='towdashpage'>
          <AttendanceStats />
          <PerformanceAnalysis numData={numData} />
        </div>
    </div>
  )
}
