import * as admin from 'firebase-admin';
import serviceAccount from '../../hunter-1232-firebase-admin.json'; // Ganti dengan path yang benar
import type { ServiceAccount } from 'firebase-admin'; // Gunakan type import

// Pastikan untuk mengatur tipe serviceAccount
const serviceAccountTyped = serviceAccount as ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountTyped),
});

const setUserRole = async (uid: string, role: string) => {
    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        console.log(`Peran ${role} telah ditetapkan untuk pengguna dengan UID: ${uid}`);
    } catch (error) {
        console.error('Error menetapkan peran:', error);
    }
};

export { setUserRole };
