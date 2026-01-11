import React, { useEffect, useState } from 'react'

export default function CourseSchedule({dataCourse}) {
  const defaultSchedule = {
    Saturday: { active: false, startTime: "08:00", endTime: "09:00" },
    Sunday: { active: false, startTime: "08:00", endTime: "09:00" },
    Monday: { active: false, startTime: "08:00", endTime: "09:00" },
    Tuesday: { active: false, startTime: "08:00", endTime: "09:00" },
    Wednesday: { active: false, startTime: "08:00", endTime: "09:00" },
    Thursday: { active: false, startTime: "08:00", endTime: "09:00" },
  };

  const [schedule, setSchedule] = useState(defaultSchedule);

  useEffect(() => {
    if (dataCourse?.schedule?.length > 0) {
      const updated = { ...defaultSchedule };
      dataCourse.schedule.forEach(sch => {
        updated[sch.day] = {
          active: true,
          startTime: sch.startTime,
          endTime: sch.endTime
        };
      });

      setSchedule(updated);
    }
  }, [dataCourse]);


  return (
    <div className="schedule-grid">
      {Object.keys(schedule).map(day => {
        const dayData = schedule[day];
        return (
          <div
            key={day}
            className={`day-card ${dayData.active ? "active" : "disabled"}`}
          >
            {/* Header */}
            <div className="day-header">
              <input
                type="checkbox"
                checked={dayData.active}
                readOnly
              />
              <span>{day}</span>
            </div>

            {/* Times */}
            <div className="time-row">
                <div>
                    <label>Start time</label>
                    <select disabled value={dayData.startTime}>
                      <option>{dayData.startTime}</option>
                    </select>
                </div>

                <div>
                    <label>End time</label>
                    <select disabled value={dayData.endTime}>
                      <option>{dayData.endTime}</option>
                    </select>
                </div>
            </div>
        </div>
        );
      })}
    </div>
  )
}
