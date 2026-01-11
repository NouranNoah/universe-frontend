import AttendanceCard from './AttendanceCard'
import EnrollmentCard from './EnrollmentCard'
import './Dashboard.css'
import OverviewCard from './OverviewCard'
export default function Dashboard() {
  
  return (
    <div className='dashboardAdmin-container'>
    
        <div className='overview-cards'>
            <OverviewCard />
        </div>

        <div className='Attendance-card'>
          <AttendanceCard />
        </div>

        <div className='Enrollment-card'>
          <EnrollmentCard />
        </div>

    </div>
  )
}
