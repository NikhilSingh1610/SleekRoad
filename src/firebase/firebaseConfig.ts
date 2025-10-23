// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOk8dYHQjap02V3WMkdx0Fq1iSQwukOXg",
  authDomain: "on-time-f0c31.firebaseapp.com",
  projectId: "on-time-f0c31",
  storageBucket: "on-time-f0c31.firebasestorage.app",
  messagingSenderId: "287950873372",
  appId: "1:287950873372:web:94e06b62f36028b4c2d0d9",
  measurementId: "G-E6019W85SQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);