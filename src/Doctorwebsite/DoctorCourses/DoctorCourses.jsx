import React, { useEffect, useState, useMemo } from "react";
import { getDocCoursesFun } from "../../services/DoctorServices/coursesDocService";
import "./DoctorCourses.css";
import Pagination from "../../Components/Pagination/Pagination";
import { NavLink } from "react-router-dom";

export default function DoctorCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [year, setYear] = useState("all");
  const [term, setTerm] = useState("all");

  
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const getCoursesDoc = async () => {
    setLoading(true);
    try {
      const data = await getDocCoursesFun();
      setCourses(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoursesDoc();
  }, []);

  /* ===== Years options ===== */
  const years = useMemo(() => {
    const allYears = courses.map(
      (course) => course.createdAt?.split("-")[0]
    );
    return [...new Set(allYears)];
  }, [courses]);

  /* ===== Terms options ===== */
  const terms = useMemo(() => {
    const allTerms = courses.map((course) => course.term);
    return [...new Set(allTerms)];
  }, [courses]);

  /* ===== Filtering ===== */
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const courseYear = course.createdAt?.split("-")[0];

      const matchSearch = course.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        status === "all" ||
        (status === "active" && course.active) ||
        (status === "inactive" && !course.active);

      const matchYear = year === "all" || courseYear === year;
      const matchTerm = term === "all" || course.term === term;

      return matchSearch && matchStatus && matchYear && matchTerm;
    });
  }, [courses, search, status, year, term]);

  /* ===== Pagination ===== */
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  /* Reset page when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, year, term]);

  return (
    <div className="courses-page">
      {/* Header */}
      <div className="courses-header">
        <h2>Course list ({filteredCourses.length})</h2>

        <div className="filters">
          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder="Search for course name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Year */}
          <div className="select-wrapper">
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="all">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Term */}
          <div className="select-wrapper">
            <select value={term} onChange={(e) => setTerm(e.target.value)}>
              <option value="all">Term</option>
              {terms.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="select-wrapper">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="courses-grid">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCourses.length === 0 && (
        <div className="empty-state">
          <h3>No courses yet</h3>
          <p>
            You don’t have any courses added yet.
            <br />
            Once courses are assigned to you, they will appear here.
          </p>
        </div>
      )}

      {/* Courses */}
      {!loading && currentCourses.length > 0 && (
        <div className="courses-grid">
          {currentCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          maxVisiblePages={3}
        />
      )}
    </div>
  );
}

/* ================= Card ================= */

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="card-headerC">
        <NavLink to={`/doctor/specific-course/${course._id}`} className="course-link" >
          <h3>{course.name}</h3>
        </NavLink>
        <span className={`status ${course.active ? "active" : "inactive"}`}>
          {course.active ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="term">
        {course.term}, {course.createdAt.split("-")[0]}
      </p>

      <p className="desc">{course.description}</p>

      <div className="card-footer">
        <span>{course.studentNumber} Students</span>
        <span>{course.hours} hours</span>
        <span>{course.location}</span>
      </div>
    </div>
  );
}

/* ================= Skeleton ================= */

function SkeletonCard() {
  return (
    <div className="course-card skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-line short" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-footer" />
    </div>
  );
}
