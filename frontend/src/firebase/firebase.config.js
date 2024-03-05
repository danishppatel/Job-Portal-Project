// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO18LQIwoF2ql0qZ3olqc5X7bMDTlbFMo",
  authDomain: "job-portal-mern-63324.firebaseapp.com",
  projectId: "job-portal-mern-63324",
  storageBucket: "job-portal-mern-63324.appspot.com",
  messagingSenderId: "256754654682",
  appId: "1:256754654682:web:e3eda240743bc48abeb4e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;