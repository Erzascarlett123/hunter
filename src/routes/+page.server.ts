// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
    // Cek apakah user ada di locals
    if (!locals.user) {
        throw redirect(302, '/login'); // Redirect ke login jika user tidak ada
    }

    // Kembalikan data user ke halaman
    return {
        user: locals.user
    };
};
