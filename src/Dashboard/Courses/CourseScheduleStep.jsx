import React, { useEffect, useState } from 'react';

export default function CourseScheduleStep({ form, setForm }) {

  const [schedule, setSchedule] = useState(() => {
  if (form.schedule && form.schedule.length > 0) {
    const obj = {
      Saturday: { active: false, startTime: "08:00", endTime: "09:00" },
      Sunday: { active: false, startTime: "08:00", endTime: "09:00" },
      Monday: { active: false, startTime: "08:00", endTime: "09:00" },
      Tuesday: { active: false, startTime: "08:00", endTime: "09:00" },
      Wednesday: { active: false, startTime: "08:00", endTime: "09:00" },
      Thursday: { active: false, startTime: "08:00", endTime: "09:00" },
    };
    form.schedule.forEach(sch => {
      obj[sch.day] = { active: true, startTime: sch.startTime, endTime: sch.endTime };
    });
    return obj;
  } else {
    return {
      Saturday: { active: false, startTime: "08:00", endTime: "09:00" },
      Sunday: { active: false, startTime: "08:00", endTime: "09:00" },
      Monday: { active: false, startTime: "08:00", endTime: "09:00" },
      Tuesday: { active: false, startTime: "08:00", endTime: "09:00" },
      Wednesday: { active: false, startTime: "08:00", endTime: "09:00" },
      Thursday: { active: false, startTime: "08:00", endTime: "09:00" },
    };
  }
  });


  const days = Object.keys(schedule);

  
    useEffect(() => {
        const finalSchedule = Object.entries(schedule)
        .filter(([_, value]) => value.active)
        .map(([day, value]) => ({
            day,
            startTime: value.startTime,
            endTime: value.endTime
        }));


        setForm(prev => ({
            ...prev,
            schedule: finalSchedule
        }));
    }, [schedule, setForm]);

  const toggleDay = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        active: !prev[day].active
      }
    }));
  };

  const changeTime = (day, type, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };

  // إنشاء خيارات الوقت من 8 صباحًا لـ 8 مساءً
    const generateTimes = () => {
        const times = [];
        for (let hour = 8; hour <= 20; hour++) {
            let displayHour = hour;
            let ampm = "AM";

            if (hour === 12) {
                ampm = "PM";
            } else if (hour > 12) {
                displayHour = hour - 12;
                ampm = "PM";
            }

            const h = displayHour < 10 ? `0${displayHour}` : displayHour;
            times.push({ label: `${h}:00 ${ampm}`, value: `${hour < 10 ? '0'+hour : hour}:00` });
        }
        return times;
    };



  const timeOptions = generateTimes();

  return (
    <div className="schedule-grid">
      {days.map(day => {
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
                onChange={() => toggleDay(day)}
              />
              <span>{day}</span>
            </div>

            {/* Times */}
            <div className="time-row">
                <div>
                    <label>Start time</label>
                    <select
                        disabled={!dayData.active}
                        value={dayData.startTime}
                        onChange={(e) => changeTime(day, "startTime", e.target.value)}
                        >
                        {timeOptions.map(time => (
                            <option key={time.value} value={time.value}>
                            {time.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>End time</label>
                    <select
                        disabled={!dayData.active}
                        value={dayData.endTime}
                        onChange={(e) => changeTime(day, "endTime", e.target.value)}
                        >
                        {timeOptions.map(time => (
                            <option key={time.value} value={time.value}>
                            {time.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        );
      })}
    </div>
  );
}
