import React, { useEffect, useState } from "react";
import { editCourseFun } from "../../../services/coursesServices";
import { getAllDepartment } from "../../../services/departmentService";
import EditInfo from "./EditInfo";
import EditSchedule from "./EditSchedule";
import { getInstructorsFun } from "../../../services/usersService";

export default function EditCourse({
  dataCourse,
  coursesId,
  setShowEditModal,
  getCourses,
  courses,
  setShowProfileModal
}) {
    const [activeTab, setActiveTab] = useState("details");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [form, setForm] = useState({
        name: dataCourse.name || "",
        availableSeats: dataCourse.availableSeats ?? "",
        degrees: dataCourse.degrees ?? "",
        hours: dataCourse.hours ?? "",
        professor: dataCourse.professor?._id || "",
        location: dataCourse.location || "",
        department: dataCourse.department || "",
        term: dataCourse.term || "",
        description: dataCourse.description || "",
        prerequisites: dataCourse.prerequisites
            ? dataCourse.prerequisites.map(p =>
                    typeof p === "string" ? p : p._id
                )
            : [],
        schedule: dataCourse.schedule || [],
    });

    const [departments , setDepartments] = useState([]);
    const [instructors , setInstructors] = useState([]);

    useEffect(() => {
        getAllDepartment().then(res =>
            setDepartments(res.allDepartments)
        );
        getInstructorsFun().then(res =>
            setInstructors(res.allDoctors)
        );
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.availableSeats ||
      !form.professor ||
      !form.department ||
      !form.location ||
      !form.term
    ) {
      setErrorMsg("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await editCourseFun(coursesId, {
        ...form,
        availableSeats: Number(form.availableSeats),
        degrees: Number(form.degrees),
        hours: Number(form.hours),
      });

      getCourses();
      setShowEditModal(false);
      setShowProfileModal(false);
    } catch (err) {
      setErrorMsg("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-boxs">
      <h3>Edit Course</h3>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "details" ? "right-btn" : "left-btn"}
          onClick={() => setActiveTab("details")}
          type="button"
        >
          Details
        </button>

        <button
          className={activeTab === "schedule" ? "right-btn" : "left-btn"}
          onClick={() => setActiveTab("schedule")}
          type="button"
        >
          Schedule
        </button>
      </div>

      {errorMsg && <p className="error">{errorMsg}</p>}

      {/* ONE FORM */}
      <form onSubmit={handleSubmit} className="longForm">
        {activeTab === "details" && (
          <EditInfo
            form={form}
            setForm={setForm}
            departments={departments}
            courses={courses}
            instructors={instructors}
          />
        )}

        {activeTab === "schedule" && (
          <EditSchedule form={form} setForm={setForm} />
        )}

        <div className="btns-group">
          <button
            type="button"
            className="left-btn"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>

          <button type="submit" className="right-btn">
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
