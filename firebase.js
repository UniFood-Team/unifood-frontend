// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3TBGbRbZQ75bHVQW41kJVGLbXdjsbyxU",
  authDomain: "unifood-aaa0f.firebaseapp.com",
  projectId: "unifood-aaa0f",
  storageBucket: "unifood-aaa0f.firebasestorage.app",
  messagingSenderId: "52534721759",
  appId: "1:52534721759:web:296e50e8ed5ffb32f33d6a",
  measurementId: "G-PR6PMFJ4RF",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
