<script lang="ts">
    import { getAuth, signOut } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import Swal from 'sweetalert2';

    let mobileMenuVisible = false;
    let loading = false;

    async function handleLogout() {
        const auth = getAuth();
        await Swal.fire({
            title: 'Logout',
            text: 'Terima kasih telah menggunakan web kami, semoga anda puas dengan website kami !!',
            icon: 'info',
            showConfirmButton: false,
            timer: 1500
        });

        try {
            await signOut(auth);
            console.log('User logged out');
            goto('/login'); 
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    }

    function navigateTo(path: string) {
        loading = true;
        setTimeout(() => {
            goto(path).then(() => {
                loading = false;
            });
        }, 500); // Durasi loading 0.5 detik
    }
</script>

<style>
    .mobile-menu {
        display: none;
        transform: translateY(-20px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .mobile-menu.visible {
        display: block;
        transform: translateY(0);
        opacity: 1;
    }

    .navbar-center {
        flex-grow: 1;
        text-align: center;
    }
</style>

<nav class="bg-white shadow-lg">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <img src="/image/logo.png" alt="Logo" class="h-12 md:h-16 lg:h-20">

        <div class="navbar-center hidden md:flex flex-grow justify-center">
            <button on:click={() => navigateTo('/home guru')} class="py-5 px-3 text-gray-700 hover:text-gray-900" aria-label="Go to Home">Home</button>
            <button on:click={() => navigateTo('/halaman guru')} class="py-5 px-3 text-gray-700 hover:text-gray-900" aria-label="Go to Dashboard">Dashboard</button>
        </div>

        <div class="relative md:flex items-center space-x-4">
            <div class="hidden md:block">
                <button on:click={handleLogout} class="py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded-md hover:scale-110 duration-300">Logout</button>
            </div>
            <div class="md:hidden flex items-center">
                <button on:click={() => mobileMenuVisible = !mobileMenuVisible} class="p-2">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div class={`mobile-menu ${mobileMenuVisible ? 'visible' : ''} bg-white shadow-lg absolute right-0 mt-2 w-48 rounded-md overflow-hidden`}>
        <button on:click={() => navigateTo('/home guru')} class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200">Home</button>
        <button on:click={() => navigateTo('/halaman guru')} class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200">Dashboard</button>
        <button on:click={handleLogout} class="block py-2 px-4 text-sm text-red-700 hover:bg-red-200 cursor-pointer hover:scale-110">Logout</button>
    </div>
</nav>
