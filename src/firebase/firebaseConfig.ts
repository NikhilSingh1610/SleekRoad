import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase config (inlined from user-provided keys)
const firebaseConfig = {
  apiKey: "AIzaSyC7n7svNE0bZKqI5oLubUbFNL25oXKOJN4",
  authDomain: "civia-ad50a.firebaseapp.com",
  databaseURL: "https://civia-ad50a-default-rtdb.firebaseio.com",
  projectId: "civia-ad50a",
  storageBucket: "civia-ad50a.firebasestorage.app",
  messagingSenderId: "654111367063",
  appId: "1:654111367063:web:bf1a1544339f30624deed2",
  measurementId: "G-5XX5B62M3R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
