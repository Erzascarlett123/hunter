// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPURS6MmefP_I5v_KUYexylG9r9RYVP70",
  authDomain: "hunter-1232.firebaseapp.com",
  databaseURL: "https://hunter-1232-default-rtdb.firebaseio.com",
  projectId: "hunter-1232",
  storageBucket: "hunter-1232.appspot.com",
  messagingSenderId: "953233417537",
  appId: "1:953233417537:web:9835c2f58be231e98f2dc0",
  measurementId: "G-YFTXTESJYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== 'undefined' && 'measurementId' in firebaseConfig) {
  // Hanya inisialisasi Analytics di lingkungan browser
  analytics = getAnalytics(app);
}

// Export Auth dan Firestore
export const auth = getAuth(app); // Mendapatkan instansi auth
export const database = getFirestore(app); // Mendapatkan instansi firestore
