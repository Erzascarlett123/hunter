import { setUserRole } from '$lib/admin';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
    const { uid, role } = await request.json();
    await setUserRole(uid, role);

    return new Response(JSON.stringify({ message: `Peran ${role} telah ditetapkan untuk pengguna dengan UID: ${uid}` }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
