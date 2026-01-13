// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axiosInstance from "./axiosInstance";

//Firebase config for your friend's project
const firebaseConfig = {
  apiKey: "AIzaSyAdfhrl5O1YfdhevgxNZjsG520pJXvMZwU",
  authDomain: "universe-88299.firebaseapp.com",
  projectId: "universe-88299",
  storageBucket: "universe-88299.firebasestorage.app",
  messagingSenderId: "1011480770772",
  appId: "1:1011480770772:web:b2ac76e0487ae94b9a2341",
  measurementId: "G-YD91W3SQT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
export const messaging = getMessaging(app);

// VAPID key from Web Push certificate
const VAPID_KEY = "BNgqAONFA4Mwum6lI_0hSJHqsSoQrF-ZswoblXVZ9LLX4F5DTnPrVeOUjK-jX29SPMuSMZWaCuC60w1d5QG_HKc";

// Generate FCM token & save to backend
export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const fcmtoken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (!fcmtoken) return;

    console.log("FCM token generated:", fcmtoken);

    // Save token to backend
    await axiosInstance.put("/auth/saveFcm", { token: fcmtoken });
    console.log("FCM token saved to backend successfully.");
  } catch (err) {
    console.error("Error generating/saving FCM token:", err.message);
  }
};
