import type { Handle } from '@sveltejs/kit';

// Daftar pengguna dengan role guru dan murid
const users: App.user[] = [
    { id: '1', name: 'Guru A', role: 'guru' },
    { id: '2', name: 'Guru B', role: 'guru' },
    { id: '3', name: 'Guru C', role: 'guru' },
    { id: '4', name: 'Murid A', role: 'murid' },
    { id: '5', name: 'Murid B', role: 'murid' },
];

export const handle: Handle = async ({ event, resolve }) => {
    // Ambil session dari cookies
    const session = event.cookies.get('session');

    // Inisialisasi locals.user menjadi undefined
    event.locals.user = undefined;

    // Cek session yang valid
    if (session) {
        // Cek apakah session sesuai dengan pengguna yang ada
        const user = users.find((u) => u.id === session); // Misalkan session menyimpan ID pengguna

        if (user) {
            // Jika pengguna ditemukan, setel user di event.locals
            event.locals.user = user;
        }
    }

    // Teruskan request ke rute berikutnya
    const response = await resolve(event);
    return response;
};
