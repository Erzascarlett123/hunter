<script>
    let isOpen = false;
    let loading = false;
    let userName = 'John Doe'; // Sample user name
    let classes = [
      { name: 'Mathematics', description: 'Algebra and Geometry' },
      { name: 'Science', description: 'Physics and Chemistry' },
      { name: 'History', description: 'Ancient and Modern History' },
    ];
    let assignments = [
      { title: 'Homework 1', dueDate: '2024-09-15', status: 'Not Started' },
      { title: 'Project Report', dueDate: '2024-09-30', status: 'In Progress' },
      { title: 'Essay', dueDate: '2024-10-05', status: 'Completed' },
    ];

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function handleClick(event) {
        event.preventDefault();
        loading = true;

        // Simulate delay for loading
        setTimeout(() => {
            window.location.href = event.target.href;
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

    /* Flexbox for full height layout */
    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    main {
        flex: 1;
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
                <a href="/home" class="py-4 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Home</a>
                <a href="/dashboard" class="py-4 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Dashboard</a>
                <a href="/contact" class="py-4 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Contact</a>
                <a href="/finishing" class="py-4 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Tugas</a>
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

    <main class="flex-1 p-6 bg-gray-100">
        <!-- Welcome Section -->
        <section class="mb-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Welcome, {userName}!</h1>
            <p class="text-gray-600 mt-2">Here's what's happening in your classes today:</p>
        </section>

        <!-- Classes Section -->
        <section class="mb-6">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Your Classes</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each classes as { name, description }}
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-lg sm:text-xl font-semibold text-gray-800">{name}</h3>
                        <p class="text-gray-600 mt-2">{description}</p>
                        <a href="/view 1" class="mt-4 inline-block text-blue-600 hover:underline">View Details</a>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Assignments Section -->
        <section>
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Upcoming Assignments</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr class="border-b">
                            <th class="py-2 px-4 text-left text-gray-600">Assignment</th>
                            <th class="py-2 px-4 text-left text-gray-600">Due Date</th>
                            <th class="py-2 px-4 text-left text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each assignments as { title, dueDate, status }}
                            <tr class="border-b">
                                <td class="py-2 px-4">{title}</td>
                                <td class="py-2 px-4">{dueDate}</td>
                                <td class="py-2 px-4">{status}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white p-3 text-center">
        <p class="text-gray-600 text-sm">&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
</body>
