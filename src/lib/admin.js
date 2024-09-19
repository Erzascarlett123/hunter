import * as admin from 'firebase-admin';
import serviceAccount from '../../path/to/your/serviceAccountKey.json'; // Ganti dengan path ke file kunci layanan Anda

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const setUserRole = async (uid, role) => {
    try {
        await admin.auth().setCustomUserClaims(uid, { role });
        console.log(`Peran ${role} telah ditetapkan untuk pengguna dengan UID: ${uid}`);
    } catch (error) {
        console.error('Error menetapkan peran:', error);
    }
};

export { setUserRole };
