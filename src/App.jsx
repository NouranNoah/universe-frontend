import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext/authContext";
import ProtectedRoute from "./Auth/AuthContext/ProtectedRoute";

import Login from "./Auth/Login/Login";
import ForgotPassword from './Auth/ForgotPassword/ForgotPassword'
import ConfirmPassword from './Auth/ConfirmPassword/ConfirmPassword'
import SetNewPass from './Auth/SetNewPass/SetNewPass'
import DashboardLayout from "./Components/DashboardLayout/DashboardLayout";
import Dashboard from "./Dashboard/DashboardAdmin/Dashboard";
import Courses from "./Dashboard/Courses/Courses";
import Admins from "./Dashboard/Admins/Admins";
import Department from "./Dashboard/Department/Department";
import Users from "./Dashboard/Users/Users";
import StudentsTable from "./Dashboard/Users/Student/Student";
import Instructors from "./Dashboard/Users/Instructors/Instructors";
import Profile from "./Dashboard/Profile/Profile";
import EditProfile from "./Dashboard/Profile/EditProfile";
import EditPass from "./Dashboard/Profile/EditPass";
import Reports from "./Dashboard/Reports/Reports";
import Applicationreports from "./Dashboard/Reports/Applicationreports/Applicationreports";
import Complaintreports from "./Dashboard/Reports/Complaintreports/Complaintreports";
import Notifications from './Dashboard/Notifications/Notifications'
import DoctorWebsite from "./Doctorwebsite/DoctorWebsite";
import DashDoc from "./Doctorwebsite/DashDoc/DashDoc";
import DoctorCourses from "./Doctorwebsite/DoctorCourses/DoctorCourses";
import DoctorGrades from "./Doctorwebsite/DoctorGrades/DoctorGrades";
import DoctorAttendance from "./Doctorwebsite/DoctorAttendance/DoctorAttendance";
import PrfileDoc from "./Doctorwebsite/PrfileDoc/PrfileDoc";
import SpecificCourse from "./Doctorwebsite/DoctorCourses/SpecificCourse";
import DoctorOnlyRoute from "./Auth/AuthContext/DoctorOnlyRoute";
import ContactUS from "./Doctorwebsite/ContactUS/ContactUS";
import RatingWebSite from "./Doctorwebsite/RatingWebSite/RatingWebSite";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Login & Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />}/>
        <Route path="/ConfirmPassword" element={<ConfirmPassword />}/>
        <Route path="/ForgotPassword" element={<ForgotPassword />}/>
        <Route path="/SetNewPass" element={<SetNewPass />}/>
        {/* Admin Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboardAdmin" element={<Dashboard />} />
          <Route path="course/:type" element={<Courses />} />
          <Route path="admins" element={<Admins />} />
          <Route path="departments" element={<Department />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="users" element={<Users />}>
            <Route index element={<StudentsTable />} />
            <Route path="students" element={<StudentsTable />} />
            <Route path="instructors" element={<Instructors />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="edit-password" element={<EditPass />} />
          <Route path="reports" element={<Reports />}>
            <Route index element={<Applicationreports />} />
            <Route path="Application-reports" element={<Applicationreports />} />
            <Route path="Complaint-reports" element={<Complaintreports />} />
          </Route>
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={
          <ProtectedRoute allowedRoles={["professor"]}>
            <DoctorWebsite />
          </ProtectedRoute>
        }>
          <Route index element={<DashDoc />} />
          <Route path="DoctorCourses" element={<DoctorCourses />} />
          <Route
            path="DoctorGrades"
            element={
              <DoctorOnlyRoute>
                <DoctorGrades />
              </DoctorOnlyRoute>
            }
          />
          <Route path="DoctorAttendance" element={<DoctorAttendance />} />
          <Route path="your-profile" element={<PrfileDoc/>}/>
          <Route path="specific-course/:id" element={<SpecificCourse />}/>
          <Route path="ContactUS" element={<ContactUS />}/>
          <Route path="RatingWebsite" element={<RatingWebSite />}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
