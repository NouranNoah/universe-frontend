import React, { useEffect, useState } from "react";
import { lastAttendanceFun } from "../../services/DoctorServices/attendanceService";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./DoctorAttendance.css";
import StudentAttendance from "./StudentAttendance";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CreatQr from "./CreatQr";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoctorAttendance() {
  const [lastAttendance, setLastAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [creatQr, setCreatQr] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const [ended, setEnded] = useState(false);

  /* ================= Fetch ================= */
  const getLastAttendance = async () => {
    try {
      const data = await lastAttendanceFun();
      setLastAttendance(data);
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Something went wrong");
    }
  };

  /* ================= Initial Load ================= */
  useEffect(() => {
    getLastAttendance().finally(() => setLoading(false));
  }, []);

  /* ================= Timer لكل QR ================= */
  useEffect(() => {
  if (!lastAttendance?.qr?._id) return;


  // 1️⃣ جلب الوقت من الكوكيز
  const expireAfterMinutes = Number(Cookies.get("expireAfterMinutes"));
  if(!expireAfterMinutes){
    setEnded(true);
    return
  }
  setEnded(false);
  // 2️⃣ نحسب وقت النهاية بالمللي ثانية
  let endTime = Number(Cookies.get(`qrEndTime_${lastAttendance.qr._id}`));
  if (!endTime) {
    endTime = Date.now() + expireAfterMinutes * 60 * 1000;
    // نخزن الوقت النهائي في الكوكيز
    Cookies.set(`qrEndTime_${lastAttendance.qr._id}`, endTime, { expires: 1/24 }); // 1 ساعة كحد أقصى
  }

  const interval = setInterval(() => {
    const remainingSeconds = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    setTimeLeft(remainingSeconds);

    if (remainingSeconds <= 0) {
      setEnded(true);
      clearInterval(interval);
      // 3️⃣ نحذف الكوكيز لما الوقت يخلص
      Cookies.remove("expireAfterMinutes");
      Cookies.remove(`qrEndTime_${lastAttendance.qr._id}`);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [lastAttendance?.qr?._id]);


  /* ================= Polling للطلاب ================= */
  useEffect(() => {
    if (!lastAttendance?.qr || ended) return;

    const interval = setInterval(() => {
      getLastAttendance();
    }, 5000);

    return () => clearInterval(interval);
  }, [lastAttendance?.qr, ended]);

  /* ================= UI States ================= */
  if (loading) {
    return (
      <>
        <Skeleton height={300} />
        <Skeleton height={300} />
        
      </>
    );
  }

  if (errorMsg) return <p>{errorMsg}</p>;

  if (!lastAttendance?.qr) {
    return (
      <div className="attendanceContent emptyAttendance">
        <i className="fa-solid fa-qrcode"></i>
        <h3>No lectures created yet</h3>
        <button onClick={() => setCreatQr(true)}>Create New QR</button>
      </div>
    );
  }

  const { qr } = lastAttendance;

  const present = qr.present || 0;
  const total = qr.totalStudent || 0;
  const presentPercent = total ? Math.round((present / total) * 100) : 0;

  const chartData = {
    datasets: [
      {
        data: [presentPercent, 100 - presentPercent],
        backgroundColor: ["#0079C8", "#D1E6FF"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="attendanceContent">
      {/* Header */}
      <div className="AttendanceHeader">
        <h3>{qr.course.name}</h3>
        <div>
          <span className={`${ended ? "ended" : "endedTime"}`}>
            <i className="fa-solid fa-clock"></i>{" "}
            {ended ? "Ended" : formatTime(timeLeft)}
          </span>
          <button onClick={() => setCreatQr(true)}>New QR code</button>
        </div>
      </div>

      {/* QR Card */}
      <div className={`QrCard ${ended ? "ended" : ""}`}>
        <div className="imgQr">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qr.qrCode}`}
            alt="QR"
          />
        </div>

        <div className="LEcData">
          <h3>{qr.name}</h3>

          <div className="dataAttend">
            <div className="chart">
              <Doughnut data={chartData} />
              <div className="chartCenter">
                <h3>{presentPercent}%</h3>
                <span>Attendance</span>
              </div>
            </div>

            <div className="dataChart">
              <div>
                <span>Present</span>
                <p>{present}</p>
              </div>
              <div>
                <span>Absent</span>
                <p>{total - present}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StudentAttendance lastAttendance={lastAttendance} />

      {creatQr && (
        <div className="modal-overlay">
          <CreatQr
            setCreatQr={setCreatQr}
            getLastAttendance={getLastAttendance}
          />
        </div>
      )}
    </div>
  );
}
