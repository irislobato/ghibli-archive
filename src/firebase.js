// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSyNeLD0DRWfwA4Q60g6Rlyb8dChgY_KU",
  authDomain: "ghibliarchiveoficial.firebaseapp.com",
  projectId: "ghibliarchiveoficial",
  storageBucket: "ghibliarchiveoficial.firebasestorage.app",
  messagingSenderId: "1029791266250",
  appId: "1:1029791266250:web:1fe8f35a63060f06124b33",
  measurementId: "G-KJJ65GB3H8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);