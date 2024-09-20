<script lang="ts">
    import { fade } from 'svelte/transition';
    let isOpen = false;
    let loading = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    // Function to handle link clicks
    function handleClick(event: MouseEvent) {
        event.preventDefault();
        loading = true;

        // Simulate delay for loading (you can remove the setTimeout in production)
        setTimeout(() => {
            const target = event.target as HTMLAnchorElement; // Type assertion
            if (target && target instanceof HTMLAnchorElement) {
                window.location.href = target.href;
            }
        }, 500); // Delay 0.5 seconds before navigating
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

    input[type="text"], input[type="date"] {
        cursor: pointer;
    }

    input[type="file"] {
        cursor: pointer;
    }

    input[type="text"]:hover, input[type="date"]:hover, input[type="file"]:hover {
        border-color: #4a90e2;
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
                <a href="/" class="ml-auto bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700" on:click={handleClick}>
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
    <div class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md lg:max-w-lg">
            <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Submit Your Task</h2>
            <form action="/submit-task" method="POST" enctype="multipart/form-data" class="space-y-4">
                <!-- Task Title -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
                    <input type="text" id="name" name="name" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ketik nama anda">
                </div>
    
                <!-- Kelas -->
                <div>
                    <label for="task-title" class="block text-sm font-medium text-gray-700">Kelas</label>
                    <input type="text" id="task-title" name="task-title" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kelas Anda">
                </div>
    
                <!-- File Upload -->
                <div>
                    <label for="task-file" class="block text-sm font-medium text-gray-700">Upload File</label>
                    <input type="file" id="task-file" name="task-file" required class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
    
                <!-- Deadline -->
                <div>
                    <label for="submission-date" class="block text-sm font-medium text-gray-700">Tanggal Pengumpulan</label>
                    <input type="date" id="submission-date" name="submission-date" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
    
                <!-- Submit Button -->
                <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Kirim
                </button>
            </form>
        </div>
    </div>
    <!-- Footer -->
    <footer class="bg-white p-3 xl:p-3 sm:p-3 lg:p-3 text-center">
        <p class="text-gray-600">&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
</body>
