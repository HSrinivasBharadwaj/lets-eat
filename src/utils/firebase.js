// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB680Ud1exkMWMuke6gAxQs8JpoJ7oapEA",
  authDomain: "food-hub-46c52.firebaseapp.com",
  projectId: "food-hub-46c52",
  storageBucket: "food-hub-46c52.appspot.com",
  messagingSenderId: "1093110456651",
  appId: "1:1093110456651:web:b064d22d0f0364a2fe08ce",
  measurementId: "G-DGCVED8R1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();