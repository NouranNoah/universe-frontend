// import React, { useEffect, useState } from 'react'
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";

// export default function AttendanceStats() {
//   const [attendanceStats, setAttendanceStats] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');

//   const monthsMap = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   const currentYearData =
//     attendanceStats.find(item => item.year === Number(selectedYear)) ||
//     attendanceStats[0];

//   const chartData = currentYearData?.months.map(item => ({
//     name: monthsMap[item.month - 1],
//     present: item.present,
//     absent: item.absent
//   }));

//   const getAttendanceStats = async () => {
//     try {
//       const data = await getAttendanceStatsFun();
//       setAttendanceStats(data);
//       setSelectedYear(data[0]?.year);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getAttendanceStats();
//   }, []);

//   return (
//     <div className="attendanceStatsBox">

//       {/* Header */}
//       <div className="head-Attendance-statistics">
//         <h3>Attendance statistics</h3>

//         <div className="rightHead">
//           <div className="detailAtten">
//             <div className="legendItem">
//               <div className="absent"></div>
//               <p>Absent Students</p>
//             </div>

//             <div className="legendItem">
//               <div className="present"></div>
//               <p>Present Students</p>
//             </div>
//           </div>

//           <select onChange={(e) => setSelectedYear(e.target.value)}>
//             {attendanceStats.map(item => (
//               <option key={item.year} value={item.year}>
//                 {item.year}
//               </option>
//             ))}
//             <option>2022 Year</option>
//           </select>
//         </div>
//       </div>

//       {/* Chart */}
//       <ResponsiveContainer width="100%" height={280}>
//         <BarChart data={chartData} barSize={26}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           <XAxis dataKey="name" />
//           <YAxis hide />
//           <Tooltip />

//           <Bar
//             dataKey="absent"
//             stackId="a"
//             radius={[10, 10, 0, 0]}
//             fill={({ payload }) =>
//               payload.present === 0 && payload.absent === 0
//                 ? "#E5E7EB"
//                 : "#0079C8"
//             }
//           />

//           <Bar
//             dataKey="present"
//             stackId="a"
//             radius={[10, 10, 0, 0]}
//             fill="#D1E6FF"
//           />
//         </BarChart>
//       </ResponsiveContainer>

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import { getAttendanceStatsFun } from "../../services/DoctorServices/dashServices";

export default function AttendanceStats() {
  const [attendanceStats, setAttendanceStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const monthsMap = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // 🟢 داتا افتراضية لو مفيش بيانات
  const emptyChartData = monthsMap.map(month => ({
    name: month,
    present: 0,
    absent: 0
  }));

  const currentYearData =
    attendanceStats.find(item => item.year === Number(selectedYear)) ||
    attendanceStats[0];

  const chartData =
    currentYearData?.months?.map(item => ({
      name: monthsMap[item.month - 1],
      present: item.present,
      absent: item.absent
    })) || emptyChartData;

  const getAttendanceStats = async () => {
    try {
      const data = await getAttendanceStatsFun();
      setAttendanceStats(data);

      if (data.length > 0) {
        setSelectedYear(data[0].year);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAttendanceStats();
  }, []);

  return (
    <div className="attendanceStatsBox">
      {/* Header */}
      <div className="head-Attendance-statistics">
        <h3>Attendance statistics</h3>

        <div className="rightHead">
          <div className="detailAtten">
            <div className="legendItem">
              <div className="absent"></div>
              <p>Absent Students</p>
            </div>

            <div className="legendItem">
              <div className="present"></div>
              <p>Present Students</p>
            </div>
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {attendanceStats.map(item => (
              <option key={item.year} value={item.year}>
                {item.year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} barSize={26}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip />

          {/* Absent */}
          <Bar dataKey="absent" stackId="a">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-absent-${index}`}
                fill={
                  entry.present === 0 && entry.absent === 0
                    ? "#E5E7EB"
                    : "#0079C8"
                }
                radius={[0, 0, 10, 10]} // ⬅ radius تحت بس
              />
            ))}
          </Bar>



          {/* Present */}
          <Bar dataKey="present" stackId="a">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-present-${index}`}
                fill="#D1E6FF"
                radius={[10, 10, 0, 0]} // ⬅ radius فوق بس
              />
            ))}
          </Bar>


        </BarChart>
      </ResponsiveContainer>

      {/* Empty State */}
      {attendanceStats.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "#9593A8",
            marginTop: "10px",
            fontSize: "14px"
          }}
        >
          No attendance data yet
        </p>
      )}
    </div>
  );
}
