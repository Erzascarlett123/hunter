<script>
    import { goto } from '$app/navigation';
    import { auth } from '../../src/firebase'; // Sesuaikan path sesuai kebutuhan
    import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

    let email = '';
    let password = '';
    let errorMessage = '';

    const provider = new GoogleAuthProvider();

    // Fungsi login menggunakan email dan password
    const handleSubmit = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
            goto('/next'); // Navigasi ke halaman berikut setelah login
        } catch (error) {
            console.error('Error logging in:', error);
            errorMessage = 'Login failed. Please check your credentials.';
        }
    };

    // Fungsi login menggunakan Google
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Google User:', result.user);
            goto('/next'); // Navigasi ke halaman berikut setelah login dengan Google
        } catch (error) {
            console.error('Error logging in with Google:', error);
            errorMessage = 'Login with Google failed.';
        }
    };
</script>

<!-- Container halaman login -->
<div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-green-600">
    <!-- Form login -->
    <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <!-- Judul dan deskripsi login -->
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700">Login</h2>
        <p class="text-xs sm:text-sm text-center text-gray-500">Selamat Datang! Silakan login untuk melanjutkan</p>

        <!-- Pesan error jika login gagal -->
        {#if errorMessage}
        <div class="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
            {errorMessage}
        </div>
        {/if}

        <!-- Form input -->
        <form on:submit|preventDefault={handleSubmit} class="space-y-4 sm:space-y-6">
            <!-- Input email -->
            <div class="relative">
                <input type="email" placeholder="Email" bind:value={email} required
                    class="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ease-in-out" />
            </div>

            <!-- Input password -->
            <div class="relative">
                <input type="password" placeholder="Password" bind:value={password} required
                    class="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ease-in-out" />
            </div>

            <!-- Tombol login -->
            <button type="submit"
                class="w-full py-2 sm:py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-all duration-200 ease-in-out shadow-md transform hover:scale-105">
                Masuk
            </button>
        </form>

        <!-- Tombol login dengan Google -->
        <!-- Tombol login dengan Google menggunakan Font Awesome -->
<div class="mt-4">
    <button on:click={handleGoogleLogin} class="w-full flex items-center justify-center py-2 sm:py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out shadow-md">
        <i class="fab fa-google w-5 h-5 mr-2"></i>
        Login dengan Google
    </button>
</div>


        <!-- Link daftar -->
        <div class="text-xs sm:text-sm text-center text-gray-500">
            <p>Belum punya akun? <a href="/create" class="text-teal-500 hover:text-teal-600 font-semibold">Daftar sekarang</a></p>
        </div>
    </div>
</div>

<style>
    form {
        animation: fadeInUp 1s ease;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
