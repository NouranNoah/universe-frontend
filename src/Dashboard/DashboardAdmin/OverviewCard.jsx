import React, { useEffect, useState, useContext } from 'react'
import dashstudenticon from '../../assets/dashstudenticon.png'
import dashinsicon from '../../assets/dashinstructoricon.png'
import dash3icon from '../../assets/dash3icon.png'
import dashdeparticon from '../../assets/dashdeparticon.png'
import { getoverviewDashFun } from '../../services/dashboardAdmin'
import SkeletonOverviewCard from '../../Components/SkeletonOverviewCard/SkeletonOverviewCard'
import { AuthContext } from '../../Auth/AuthContext/authContext'

export default function OverviewCard() {
      const { user } = useContext(AuthContext);
      const [dataDash , setDataDash] = useState({
          students:{
            count:0,
            change:''
          },
          instructors:{
            count:0,
            change:''
          },
          departments:{
            count:0,
            change:''
          },
          activeSubjects:{
            count:0,
            change:''
          }
      })
      const [loading , setLoading ]= useState(false)
      const [error, setError] = useState(null);
    
      const getDataDash  =async ()=>{
        setLoading(true)
        try{
          const data = await getoverviewDashFun();
          setDataDash(data);
        }catch(err){
          console.log("error", err);
          setError("Failed to fetch data");
        }finally{
          setLoading(false)
        }
      }
    
      useEffect(()=>{
        if (user) {
          getDataDash();
        }
      },[user])

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
  return (
    <div className='overview-card'>
        <h3>Overview</h3>
        {error && <p className="error">{error}</p>}

        <div className='total-boxss'>
            {loading ? (
                Array(4)
                .fill(0)
                .map((_, i) => <SkeletonOverviewCard key={i} />)
            ) : (
                <>
                <div className='Total-box'>
                    <div>
                    <p className='text'>Total Students</p>
                    <p className='numOverview'>{dataDash.students.count}</p>
                    <p className={`presOverview ${getChangeClass(dataDash.students.change)}`}
                    >{getChangeIcon(dataDash.students.change)} {dataDash.students.change} from last month</p>
                    </div>
                    <img src={dashstudenticon} alt="" />
                </div>

                <div className='Total-box'>
                    <div>
                    <p className='text'>Total Instructors</p>
                    <p className='numOverview'>{dataDash.instructors.count}</p>
                    <p className={`presOverview ${getChangeClass(dataDash.instructors.change)}`}>
                      {getChangeIcon(dataDash.instructors.change)} {dataDash.instructors.change} from last month</p>
                    </div>
                    <img src={dashinsicon} alt="" />
                </div>

                <div className='Total-box'>
                    <div>
                    <p className='text'>Active Courses</p>
                    <p className='numOverview'>{dataDash.activeSubjects.count}</p>
                    <p className={`presOverview ${getChangeClass(dataDash.activeSubjects.change)}`}>
                      {getChangeIcon(dataDash.activeSubjects.change)} {dataDash.activeSubjects.change} from last month</p>
                    </div>
                    <img src={dash3icon} alt="" />
                </div>

                <div className='Total-box'>
                    <div>
                    <p className='text'>Departments</p>
                    <p className='numOverview'>{dataDash.departments.count}</p>
                    <p className={`presOverview ${getChangeClass(dataDash.departments.change)}`}>
                      {getChangeIcon(dataDash.departments.change)} {dataDash.departments.change} from last month</p>
                    </div>
                    <img src={dashdeparticon} alt="" />
                </div>
                </>
            )}
        </div>
    </div>
  )
}
