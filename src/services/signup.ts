// src/services/signup.ts

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from '../firebase';  // Pastikan kamu impor db untuk Firestore

// Fungsi untuk signup dengan Google dan menetapkan role
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Tentukan role berdasarkan email domain
    const emailDomain = user.email?.split('@')[1];
    let role = emailDomain === 'sekolah.com' ? 'guru' : 'murid';

    // Simpan data pengguna dengan role di Firestore
    await setDoc(doc( database, "users", user.uid), {  // db adalah Firestore
      name: user.displayName,
      email: user.email,
      role: role
    });

    console.log(`User ${user.displayName} has been assigned the role: ${role}`);
  } catch (error) {
    console.error("Error during sign in:", error);
  }
}
