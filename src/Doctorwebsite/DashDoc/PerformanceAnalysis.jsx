import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getStudentsStatisticsFun } from '../../services/DoctorServices/dashServices';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PerformanceAnalysis({ numData }) {
  const [totalCourses, setTotalCourses] = useState(
  numData?.activeCourses?.count ?? 0
);

  
  const [dataPerformance, setDataPerformance] = useState({
    successRate: '0%',
    passedStudents: 0,
    failedStudents: 0,
  });
  
  const [coursesOverview, setCoursesOverview] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataPerformance = async () => {
    setLoading(true);
    try {
      const response = await getStudentsStatisticsFun();
      const data = response;

      setDataPerformance({
        successRate: data.successRate || '0%',
        passedStudents: data.passedStudents || 0,
        failedStudents: data.failedStudents || 0,
      });

      setCoursesOverview(data.studentsByLevel || []);
    } catch (err) {
      console.error(err);
    } 
  };

  useEffect(() => {
    getDataPerformance();
  }, []);

  // ================= Student Chart =================
  const studentData = {
    labels: ['Successful', 'Unsuccessful'],
    datasets: [
      {
        data: [dataPerformance.passedStudents, dataPerformance.failedStudents],
        backgroundColor: ['#0079C8', '#D1E6FF'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  // ================= Courses Chart =================
  const courseLabels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const courseValues = courseLabels.map(
    (_, i) => Number(coursesOverview[i]?.percentage?.replace('%', '') || 0)
  );

  const coursesData = {
    labels: courseLabels,
    datasets: [
      {
        data: courseValues,
        backgroundColor: ['#1E3A8A', '#0079C8', '#4da6ff', '#cce0ff'],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  // ================= Center Text Plugin =================
  const centerTextPlugin = ({ id, title, value, titleColor = "#64748B", valueColor = "#1E293B", titleSizeRatio = 0.35, valueSizeRatio = 0.5 }) => ({
    id,
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const baseSize = (chartArea.bottom - chartArea.top) / 5;

      if (title) {
        ctx.font = `500 ${baseSize * titleSizeRatio}px sans-serif`;
        ctx.fillStyle = titleColor;
        ctx.fillText(title, centerX, centerY - baseSize * 0.35);
      }

      ctx.font = `700 ${baseSize * valueSizeRatio}px sans-serif`;
      ctx.fillStyle = valueColor;
      ctx.fillText(value, centerX, centerY + baseSize * 0.15);

      ctx.restore();
    }
  });

  // ================= Courses Legend Options =================
  const isMobile = window.innerWidth < 768;

  const coursesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    legend: {
      position: isMobile ? "bottom" : "right",
      labels: {
        usePointStyle: true,
        padding: 15,
        font: { size: 13 },
        generateLabels(chart) {
          const data = chart.data;
          return data.labels.map((label, i) => ({
            text: `${label}: ${data.datasets[0].data[i]}%`,
            fillStyle: data.datasets[0].backgroundColor[i],
            strokeStyle: data.datasets[0].backgroundColor[i],
            index: i,
          }));
        },
      },
    },
    },
  };


  useEffect(() => {
    setLoading(true);
  if (numData?.activeCourses?.count != null) {
    setTotalCourses(numData.activeCourses.count);
    setLoading(false)
  } 
}, [numData]);




  return (
    <div className='PerformanceAnalysis'>

      {/* ================= Student Performance ================= */}
      <div className='StudentAnalysis'>
        <h3>Student Performance Analysis</h3>
        {loading ? (
          <p>Loading...</p>
        ) : dataPerformance.passedStudents + dataPerformance.failedStudents === 0 ? (
          <p>No data available yet</p>
        ) : (
          <div className="studentChartContainer">
            <Doughnut
              data={studentData}
              plugins={[centerTextPlugin({
                id: "studentCenterText",
                title: "Successful",
                value: `${dataPerformance.successRate}`,
                valueColor: "#0079C8"
              })]}
              options={{ plugins: { legend: { display: false } } }}
            />
            <div className="studentStats">
              <p>Successful Students<br/><span style={{color:'#0079C8', fontWeight:'bold',fontSize:'22px'}}>{dataPerformance.passedStudents}</span></p>
              <p>Unsuccessful Students<br/><span style={{color:'#D32F2F', fontWeight:'bold' ,fontSize:'22px'}}>{dataPerformance.failedStudents}</span> </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= Courses Overview ================= */}
      <div className='CourseAnalysis'>
        <h3>Courses Overview</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="coursesChartContainer">
            <Doughnut
              data={coursesData}
              options={coursesOptions}
              plugins={[centerTextPlugin({
                id: "coursesCenterText",
                title: "Total",
                value: totalCourses,
                valueSizeRatio: 0.5
              })]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
