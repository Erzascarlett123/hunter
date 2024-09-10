<script>
    import { fade } from 'svelte/transition';
    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
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
</style>

<body class="bg-gradient-to-r from-blue-500 to-purple-600 h-screen">
    <!-- Navbar -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <!-- Logo -->
            <img src="/image/logo.png" alt="Logo" class="h-12 md:h-16 lg:h-20">

            <!-- Nav Links -->
            <div class="hidden md:flex items-center space-x-4">
                <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
                <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">Dashboard</a>
                <a href="#" class="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a>
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
            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200">Home</a>
            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200">Dashboard</a>
            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200">Contact</a>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md lg:max-w-lg">
            <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Submit Your Task</h2>
            <form action="/submit-task" method="POST" enctype="multipart/form-data" class="space-y-4">
                <!-- Task Title -->
                <div>
                    <label for="task-title" class="block text-sm font-medium text-gray-700">Nama</label>
                    <input type="text" id="task-title" name="task-title" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Description -->
                <div>
                    <label for="task-desc" class="block text-sm font-medium text-gray-700">Deskripsi Tugas</label>
                    <textarea id="task-desc" name="task-desc" rows="4" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <!-- File Upload -->
                <div>
                    <label for="task-file" class="block text-sm font-medium text-gray-700">Upload File</label>
                    <input type="file" id="task-file" name="task-file" required class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Deadline -->
                <div>
                    <label for="task-deadline" class="block text-sm font-medium text-gray-700">Deadline</label>
                    <input type="date" id="task-deadline" name="task-deadline" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Submit Button -->
                <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Submit Task
                </button>
            </form>
        </div>
    </div>
</body>
