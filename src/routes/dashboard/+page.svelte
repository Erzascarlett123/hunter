<script>
    import { fade } from 'svelte/transition';
    let isOpen = false;
    let loading = false;
    let students = [
        { name: 'Andi', kelas: '10A', submitted: true, date: '2024-09-01' },
        { name: 'Budi', kelas: '11B', submitted: false, date: null },
        { name: 'Citra', kelas: '12C', submitted: true, date: '2024-09-02' }
    ];

    let newStudentName = '';
    let newStudentClass = '';
    let newStudentSubmitted = false;
    let newStudentDate = '';

    // Function to add a new student
    function addStudent() {
        if (!newStudentName || !newStudentClass) {
            alert('Please fill in the required fields');
            return;
        }
        if (newStudentSubmitted && !newStudentDate) {
            alert('Please provide the submission date');
            return;
        }

        students = [...students, { 
            name: newStudentName, 
            kelas: newStudentClass, 
            submitted: newStudentSubmitted, 
            date: newStudentDate || null 
        }];

        // Reset input fields
        newStudentName = '';
        newStudentClass = '';
        newStudentSubmitted = false;
        newStudentDate = '';
    }

    // Function to delete a student
    function deleteStudent(name) {
        students = students.filter(student => student.name !== name);
    }

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

    input[type="text"], input[type="date"] {
        cursor: pointer;
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

    <div class="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Daftar Siswa</h2>
    
        <!-- Form to Add a New Student -->
        <form on:submit|preventDefault={addStudent} class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label for="student-name" class="block text-sm font-medium text-gray-700">Nama Siswa</label>
                    <input type="text" id="student-name" bind:value={newStudentName} class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama siswa">
                </div>
    
                <div>
                    <label for="student-class" class="block text-sm font-medium text-gray-700">Kelas</label>
                    <input type="text" id="student-class" bind:value={newStudentClass} class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Masukkan kelas siswa">
                </div>
                <div>
                    <label for="submission-status" class="block text-sm font-medium text-gray-700">Sudah Mengumpulkan?</label>
                    <input type="checkbox" id="submission-status" bind:checked={newStudentSubmitted} class="p-10 border border-gray-300 rounded-lg focus:ring-7 focus:ring-blue-500">
                </div>
    
                {#if newStudentSubmitted}
                <div class="md:col-span-2">
                    <label for="submission-date" class="block text-sm font-medium text-gray-700">Tanggal Pengumpulan</label>
                    <input type="date" id="submission-date" bind:value={newStudentDate} class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                {/if}
            </div>
    
            <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
                Tambah Siswa
            </button>
        </form>

        <!-- Displaying List of Students -->
        <table class="min-w-full table-auto mt-8 border-collapse border border-gray-300">
            <thead class="bg-gray-200 text-gray-700">
                <tr>
                    <th class="px-4 py-2 text-left border-b">Nama</th>
                    <th class="px-4 py-2 text-left border-b">Kelas</th>
                    <th class="px-4 py-2 text-left border-b">Status</th>
                    <th class="px-4 py-2 text-left border-b">Tanggal Pengumpulan</th>
                    <th class="px-4 py-2 text-left border-b">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {#each students as student (student.name)}
                <tr class="border-t border-gray-300">
                    <td class="px-4 py-2 text-left border-b">{student.name}</td>
                    <td class="px-4 py-2 text-left border-b">{student.kelas}</td>
                    <td class="px-4 py-2 text-left border-b">{student.submitted ? 'Sudah' : 'Belum'}</td>
                    <td class="px-4 py-2 text-left border-b">{student.date ? student.date : '-'}</td>
                    <td class="px-4 py-2 text-left border-b">
                        <button on:click={() => deleteStudent(student.name)} class="text-red-600 hover:text-red-800">
                            Delete
                        </button>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
        
    </div>
</body>    