<script>
    import { fade } from 'svelte/transition';
    let isOpen = false;
    let loading = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    // Function to handle link clicks
    function handleClick(event) {
        event.preventDefault();
        loading = true;

        // Simulate delay for loading (you can remove the setTimeout in production)
        setTimeout(() => {
            window.location.href = event.target.href;
        }, 500); // Delay 1 second before navigating
    }
</script>

<style>
    .mobile-menu {
        transition: opacity 0.3s ease, max-height 0.3s ease;
    }
    .mobile-menu.show {
        display: block;
        opacity: 1;
        max-height: 500px; /* Adjust as needed */
    }
    .mobile-menu.hide {
        display: block;
        opacity: 0;
        max-height: 0;
        overflow: hidden;
    }

    /* Loading Spinner */
    .loading-spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #4a90e2;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
</style>

<body class="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col">

    {#if loading}
    <!-- Loading Spinner -->
    <div class="loading-overlay">
        <div class="loading-spinner"></div>
    </div>
    {/if}

    <!-- Navbar -->
    <nav class="bg-white shadow-lg">
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <!-- Logo -->
            <img src="/image/logo.png" alt="Logo" class="h-12 md:h-16 lg:h-20">

            <!-- Nav Links for Desktop -->
            <div class="hidden md:flex items-center space-x-4">
                <a href="/home" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Home</a>
                <a href="/dashboard" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Dashboard</a>
                <a href="/contact" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Contact</a>
                <a href="/finishing" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Tugas</a>
            </div>

            <!-- Logout Button for Desktop (Tablet & Laptop) -->
            <div class="hidden md:flex">
                <a href="/" class="ml-auto bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700" on:click={handleClick}>
                    Logout
                </a>
            </div>

            <!-- Mobile Button -->
            <div class="md:hidden flex items-center">
                <button on:click={toggleMenu} class="p-2">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class={`mobile-menu ${isOpen ? 'show' : 'hide'} md:hidden bg-white shadow-lg`}>
            <a href="/home" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Home</a>
            <a href="/dashboard" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Dashboard</a>
            <a href="/contact" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Contact</a>
            <a href="/finishing" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Tugas</a>
            <a href="/" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Logout</a>
        </div>
    </nav>

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
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10v1m0-4v1a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v1zM21 14v1m0-4v1a2 2 0 00-2 2h-3a2 2 0 00-2-2v-1a2 2 0 002-2h3a2 2 0 002 2v1z"></path>
                        </svg>
                        <span>+62 815-1852-575</span>
                    </div>
                    <!-- Social Media Icons -->
                    <div class="flex items-center space-x-2">
                        <!-- Instagram -->
                        <a href="https://www.instagram.com/tuaide_id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" class="flex items-center text-gray-700 hover:text-purple-600">
                            <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5-1a1 1 0 110 2 1 1 0 010-2z"/>
                            </svg>
                            Instagram
                        </a>
                        <!-- WhatsApp -->
                        <a href="https://wa.me/+62 815-1852-575" class="flex items-center text-gray-700 hover:text-purple-600">
                            <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 16.5A8.38 8.38 0 0116.5 21c-4.65 0-8.5-3.85-8.5-8.5S11.85 4 16.5 4a8.38 8.38 0 015 1.5l2 2.5-2.25 1.75A9 9 0 0012 18a8.91 8.91 0 005-3l2.25 1.75 2-2.25A8.46 8.46 0 0021 16.5z"/>
                            </svg>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white p-3 sm:p-3 lg:p-3 text-center">
        <p class="text-gray-600">&copy; 2024 RezaSatria. All rights reserved.</p>
    </footer>
</body>
