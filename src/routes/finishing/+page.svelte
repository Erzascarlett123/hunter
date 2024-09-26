<script lang="ts">
    let loading = false;

    // Function to handle link clicks
    function handleClick(event: MouseEvent) {
        event.preventDefault();
        loading = true;

        // Simulate delay for loading (you can remove the setTimeout in production)
        const target = event.target as HTMLAnchorElement; // Type assertion
        if (target && target instanceof HTMLAnchorElement) {
            // Delay 0.5 seconds before navigating
            setTimeout(() => {
                window.location.href = target.href;
            }, 500);
        }
    }
</script>

<style>
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

    body {
        background: linear-gradient(to right, #4a90e2, #8e44ad);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>

<body>
    {#if loading}
    <div class="loading-overlay">
        <div class="loading-spinner" role="status" aria-label="Loading..."></div>
    </div>
    {/if}

    <div class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md lg:max-w-lg">
            <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Submit Your Task</h2>
            <form action="/submit-task" method="POST" enctype="multipart/form-data" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
                    <input type="text" id="name" name="name" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ketik nama anda" required>
                </div>
                <div>
                    <label for="task-title" class="block text-sm font-medium text-gray-700">Kelas</label>
                    <input type="text" id="task-title" name="task-title" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kelas Anda">
                </div>
                <div>
                    <label for="task-file" class="block text-sm font-medium text-gray-700">Upload File</label>
                    <input type="file" id="task-file" name="task-file" required class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label for="submission-date" class="block text-sm font-medium text-gray-700">Tanggal Pengumpulan</label>
                    <input type="date" id="submission-date" name="submission-date" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Kirim
                </button>
            </form>
        </div>
    </div>

    <footer class="bg-white p-3 xl:p-3 sm:p-3 lg:p-3 text-center">
        <p class="text-gray-600">&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
</body>
