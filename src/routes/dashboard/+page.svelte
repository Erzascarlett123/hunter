<script lang="ts">
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
  
        newStudentName = '';
        newStudentClass = '';
        newStudentSubmitted = false;
        newStudentDate = '';
    }
  
    function deleteStudent(name: string) {
        students = students.filter(student => student.name !== name);
    }
  
    function toggleMenu() {
        isOpen = !isOpen;
    }
  
    function handleClick(event: MouseEvent) {
        event.preventDefault();
        loading = true;
  
        setTimeout(() => {
            window.location.href = (event.target as HTMLAnchorElement).href;
        }, 500);
    }
</script>

<style>
    .mobile-menu {
        transition: opacity 0.3s ease, max-height 0.3s ease;
    }
    .mobile-menu.show {
        display: block;
        opacity: 1;
        max-height: 500px;
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

    /* Responsive Table */
    @media (max-width: 768px) {
        table {
            font-size: 0.875rem; /* Smaller font size for tablets and mobile */
        }
        th, td {
            padding: 0.5rem; /* Reduce padding to fit content better */
        }
    }

    @media (max-width: 480px) {
        table {
            font-size: 0.75rem; /* Even smaller font size for mobile */
        }
        th, td {
            padding: 0.25rem; /* Further reduce padding for small screens */
        }
    }

    /* Adjust Form Input and Button Sizes */
    @media (max-width: 768px) {
        input[type="text"], input[type="date"], button {
            font-size: 0.875rem; /* Smaller font size for inputs and buttons */
            padding: 0.75rem; /* Adjust padding */
        }
    }

    @media (max-width: 480px) {
        input[type="text"], input[type="date"], button {
            font-size: 0.75rem; /* Even smaller font size */
            padding: 0.5rem; /* Adjust padding */
        }
    }
</style>

<body class="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col">
    {#if loading}
    <div class="loading-overlay">
        <div class="loading-spinner"></div>
    </div>
    {/if}

    <nav class="bg-white shadow-lg">
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <img src="/image/logo.png" alt="Logo" class="h-12 md:h-16 lg:h-20">

            <div class="hidden md:flex items-center space-x-4">
                <a href="/home" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Home</a>
                <a href="/dashboard" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Dashboard</a>
                <a href="/contact" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Contact</a>       
                <a href="/finishing" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Tugas</a>
            </div>

            <div class="hidden md:flex">
                <a href="/" class="ml-auto bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700" on:click={handleClick}>
                    Logout
                </a>
            </div>

            <div class="md:hidden flex items-center">
                <button on:click={toggleMenu} class="p-2">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class={`mobile-menu ${isOpen ? 'show' : 'hide'} md:hidden bg-white shadow-lg`}>
            <a href="/home" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Home</a>
            <a href="/dashboard" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Dashboard</a>
            <a href="/contact" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Contact</a>
            <a href="/finishing" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Tugas</a>
            <a href="/" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Logout</a>
        </div>
    </nav>

    <div class="p-6 w-full mx-auto bg-white shadow-lg rounded-lg mt-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Daftar Siswa</h2>
        
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
                    <input type="checkbox" id="submission-status" bind:checked={newStudentSubmitted} class="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>

                {#if newStudentSubmitted}
                <div class="md:col-span-2">
                    <label for="submission-date" class="block text-sm font-medium text-gray-700">Tanggal Pengumpulan</label>
                    <input type="date" id="submission-date" bind:value={newStudentDate} class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                {/if}
            </div>
            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Tambah Siswa</button>
        </form>

        <table class="w-full table-auto mt-8 border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2">Nama</th>
                    <th class="border border-gray-300 p-2">Kelas</th>
                    <th class="border border-gray-300 p-2">Status</th>
                    <th class="border border-gray-300 p-2">Tanggal Pengumpulan</th>
                    <th class="border border-gray-300 p-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {#each students as student}
                <tr>
                    <td class="border border-gray-300 p-2">{student.name}</td>
                    <td class="border border-gray-300 p-2">{student.kelas}</td>
                    <td class="border border-gray-300 p-2">{student.submitted ? '✅' : '❌'}</td>
                    <td class="border border-gray-300 p-2">{student.date || '-'}</td>
                    <td class="border border-gray-300 p-2">
                        <button on:click={() => deleteStudent(student.name)} class="text-red-500 hover:underline">Hapus</button>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</body>
