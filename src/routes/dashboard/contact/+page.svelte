<script lang="ts">
    import { getAuth, signOut } from 'firebase/auth';
    import { goto } from '$app/navigation';
    import Swal from 'sweetalert2';

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
            goto('/');
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    }

    async function navigateTo(path: string) {
        loading = true; // Menetapkan loading menjadi true
        await new Promise(resolve => setTimeout(resolve, 500));
        goto(path);
        loading = false; // Mengatur loading menjadi false setelah navigasi
    }
</script>

<style>
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; /* Agar overlay di atas semua elemen */
    }

    .loading-spinner {
        border: 8px solid rgba(255, 255, 255, 0.3);
        border-top: 8px solid #4a90e2; /* Ubah warna sesuai kebutuhan */
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<body class="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col">
    {#if loading}
        <div class="loading-overlay">
            <div class="loading-spinner"></div>
        </div>
    {/if}

    <!-- Main Content -->
    <section class="container mx-auto p-6 lg:p-10">
        <div class="bg-white p-6 lg:p-10 rounded-lg shadow-xl">
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 text-center">Contact Us !</h1>
            <p class="text-sm md:text-base lg:text-lg text-center text-gray-600 mb-8">
                Bila ada masalah bisa ditanyakan kok !
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <!-- Contact Form -->
                <div>
                    <form action="/submit-form" method="POST">
                        <div class="mb-4">
                            <label for="name" class="block text-gray-700 font-bold">Nama</label>
                            <input type="text" id="name" name="name" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ketik nama anda">
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-gray-700 font-bold">Email</label>
                            <input type="email" id="email" name="email" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Email anda">
                        </div>
                        <div class="mb-4">
                            <label for="message" class="block text-gray-700 font-bold">Pesan</label>
                            <textarea id="message" name="message" rows="5" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Bila ada masalah tanyakan saja !"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300">Kirim</button>
                    </form>
                </div>

                <!-- Contact Info -->
                <div class="flex flex-col space-y-4">
                    <div class="flex items-center text-gray-600">
                    </div>
                    <div class="flex items-center text-gray-600">
                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26L21 8M5 19v2a2 2 0 002 2h10a2 2 0 002-2v-2m-8 0H7a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2z"></path>
                        </svg>
                        <span>menanamide@gmail.com</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 5.75v12.5m4.5-12.5v12.5m-11.5 2a1 1 0 001 1h18a1 1 0 001-1v-1a1 1 0 00-1-1H4a1 1 0 00-1 1v1z"></path>
                        </svg>
                        <span>+62 812 3456 7890</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <footer class="bg-white p-3 xl:p-3 sm:p-3 lg:p-3 text-center">
        <p class="text-gray-600">&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
</body>
