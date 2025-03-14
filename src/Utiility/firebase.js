import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Firebase Config using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = app.firestore();
















// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your Firebase Config
// const firebaseConfig = {
//   apiKey: "AIzaSyC3hwExdWjbJZnwNBgZ8xaN-9fxSZhz4go",
//   authDomain: "e-clone-2024-54d41.firebaseapp.com",
//   projectId: "e-clone-2024-54d41",
//   storageBucket: "e-clone-2024-54d41.appspot.com",
//   messagingSenderId: "216412726633",
//   appId: "1:216412726633:web:7a11f1683d4cef0a46c9f8",
// };

// // Initialize Firebase App
// const app = initializeApp(firebaseConfig);

// // Export Firebase Auth and Firestore
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB7yLiRS4UAICdrCom8BQ-Kj0ZvlrnSN58",
//   authDomain: "e-441d3.firebaseapp.com",
//   projectId: "e-441d3",
//   storageBucket: "e-441d3.firebasestorage.app",
//   messagingSenderId: "683682676083",
//   appId: "1:683682676083:web:4542e4d8aeb6eb28f45906"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
