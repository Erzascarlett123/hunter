// src/routes/login/+page.server.ts
import { redirect } from '@sveltejs/kit';

// Daftar pengguna dengan role guru dan murid
const users: App.user[] = [
    { id: '1', name: 'Guru A', role: 'guru' },
    { id: '2', name: 'Guru B', role: 'guru' },
    { id: '3', name: 'Guru C', role: 'guru' },
    { id: '4', name: 'Murid A', role: 'murid' },
    { id: '5', name: 'Murid B', role: 'murid' },
];

// Fungsi untuk mengautentikasi pengguna
const authenticate = (id: string) => {
    return users.find((user) => user.id === id); // Memeriksa apakah ID pengguna valid
};

export const actions = {
    default: async ({ cookies, request }) => {
        const formData = await request.formData();
        const userId = formData.get('userId') as string | null; // Mendapatkan userId dan mendefinisikan tipe

        if (userId) { // Memeriksa apakah userId tidak null
            const user = authenticate(userId); // Memeriksa autentikasi

            if (user) {
                // Jika pengguna terautentikasi, setel session
                cookies.set('session', user.id, {
                    httpOnly: true,
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7 // Cookie berlaku selama 1 minggu
                });

                throw redirect(302, '/dashboard'); // Redirect ke halaman dashboard
            } else {
                // Kembali dengan error jika autentikasi gagal
                return { error: 'Invalid credentials' }; // Mengirimkan pesan error
            }
        } else {
            // Kembali dengan error jika userId null
            return { error: 'User ID is required' }; // Mengirimkan pesan error
        }
    }
};
