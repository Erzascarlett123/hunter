// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		
		interface user {
				id: string;
				name: string;
				role: 'guru' | 'murid'; // Menyimpan role user di session
			};
			interface Locals {
				user?: User; // Gunakan tipe User di Locals
			}
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

export {};
