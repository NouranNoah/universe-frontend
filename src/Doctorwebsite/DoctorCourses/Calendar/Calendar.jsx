import { useEffect, useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Calendar({ courseData }) {
  const [lectureDays, setLectureDays] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const popupRef = useRef(null);

  const map = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  useEffect(() => {
    if (courseData?.course?.schedule?.length) {
      const days = courseData.course.schedule.map((l) => map[l.day]);
      setLectureDays(days);
    }
  }, [courseData]);

  // لمسح البوكس لو ضغطت بره
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedLecture(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDayClick = (date) => {
    const dayNum = date.getDay();
    const lecture = courseData.course.schedule.find(
      (l) => map[l.day] === dayNum
    );
    if (lecture) {
      setSelectedLecture({ ...lecture, date });
    } else {
      setSelectedLecture(null);
    }
  };

  return (
    <div className="calendar-card">
      <DayPicker
        weekStartsOn={1}
        modifiers={{
          lecture: (date) => lectureDays.includes(date.getDay()),
        }}
        modifiersClassNames={{
          lecture: "lecture-day",
        }}
        onDayClick={handleDayClick}
        components={{
          Caption: ({ date }) => {
            const month = date.toLocaleString("en-US", { month: "long" });
            const year = date.getFullYear();
            return (
              <div className="custom-caption">
                <button className="prev">{"<"}</button>
                <span className="title">{month} {year}</span>
                <button className="next">{">"}</button>
              </div>
            );
          },
        }}
      />

      {selectedLecture && (
        <div className="lecture-popup" ref={popupRef}>
          <h4>{selectedLecture.day}</h4>
          <div className="dateH">
            <div>
              <label>StartTime</label>
              <input type="text" value={selectedLecture.startTime} readOnly/>
            </div>
            <div>
              <label>EndTime</label>
              <input type="text" value={selectedLecture.endTime} readOnly/>
            </div>
          </div>
          <button onClick={() => setSelectedLecture(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
