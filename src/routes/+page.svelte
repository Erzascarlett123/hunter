<body class="bg-gray-100 flex items-center justify-center h-screen p-4">
    <div class="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form action="/submit-login" method="POST" class="space-y-4">
            <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" id="username" name="username" required class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" required class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Login
            </button>
        </form>
    </div>
</body>
