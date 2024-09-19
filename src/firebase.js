// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Database } from 'firebase/database'

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyBPURS6MmefP_I5v_KUYexylG9r9RYVP70",
  authDomain: "hunter-1232.firebaseapp.com",
  projectId: "hunter-1232",
  storageBucket: "hunter-1232.appspot.com",
  messagingSenderId: "953233417537",
  appId: "1:953233417537:web:9835c2f58be231e98f2dc0"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
