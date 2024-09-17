<script>
    let email = '';
    let password = '';

    const handleSubmit = () => {
        // Logika untuk login di sini
        console.log('Email:', email);
        console.log('Password:', password);
    };
</script>

<!-- Container halaman login -->
<div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-green-600">
    <!-- Form login -->
    <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <!-- Judul dan deskripsi login -->
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700">Login</h2>
        <p class="text-xs sm:text-sm text-center text-gray-500">Selamat Datang! Silakan login untuk melanjutkan</p>

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
             <a href="/next">
            <button type="submit"
                class="w-full py-2 sm:py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-all duration-200 ease-in-out shadow-md transform hover:scale-105">Masuk</button>
             </a>
        </form>

        <!-- Link daftar -->
        <div class="text-xs sm:text-sm text-center text-gray-500">
            <p>Belum punya akun? <a href="#" class="text-teal-500 hover:text-teal-600 font-semibold">Daftar sekarang</a></p>
        </div>
    </div>
</div>

<style>
    /* Animasi untuk form */
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
