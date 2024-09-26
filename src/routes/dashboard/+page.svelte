<script lang="ts">
    import { onMount } from 'svelte';
    import { getAuth, signOut } from 'firebase/auth';
    import { userName, userClass } from '../../stores/userStore';
    import { goto } from '$app/navigation';
    import Swal from 'sweetalert2';

    interface Student {
        name: string;
        kelas: string;
        submitted: boolean;
        date: string | null;
    }

    let loading = false;
    let students: Student[] = [];
    let name = '';
    let className = '';

    async function fetchStudents() {
        loading = true;
        // Simulasi pengambilan data
        students = [
            { name: 'John Doe', kelas: '10A', submitted: true, date: '2024-09-01' },
            { name: 'Jane Smith', kelas: '11B', submitted: false, date: null },
            { name: 'Alice Johnson', kelas: '12C', submitted: true, date: '2024-09-02' }
        ];
        loading = false;
    }

    async function handleLogout() {
        const auth = getAuth();
        await Swal.fire({
            title: 'Logout',
            text: 'Terima kasih telah menggunakan web kami, semoga anda puas dengan website kami !!',
            icon: 'info',
            showConfirmButton: false,
            timer: 1500
        });

        try {
            await signOut(auth);
            console.log('User logged out');
            goto('/'); 
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    }

    onMount(() => {
        fetchStudents();
        userName.subscribe(value => {
            name = value;
        });
        userClass.subscribe(value => {
            className = value;
        });
    });

</script>

<style>
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
        <div class="loading-overlay">
            <div class="loading-spinner"></div>
        </div>
    {/if}

    <main class="flex-1 p-6 bg-gray-100">
        <section class="mb-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 text-center">Welcome, {name}!</h1>
            <p class="text-gray-600 mt-2 text-center">You are in class: {className}</p>
        </section>

        <section>
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Daftar Tugas Murid</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr class="border-b">
                            <th class="py-2 px-4 text-left text-gray-600">Nama</th>
                            <th class="py-2 px-4 text-left text-gray-600">Kelas</th>
                            <th class="py-2 px-4 text-left text-gray-600">Status</th>
                            <th class="py-2 px-4 text-left text-gray-600">Tanggal Pengumpulan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each students as student}
                        <tr class="border-b">
                            <td class="py-2 px-4">{student.name}</td>
                            <td class="py-2 px-4">{student.kelas}</td>
                            <td class="py-2 px-4">{student.submitted ? '✅' : '❌'}</td>
                            <td class="py-2 px-4">{student.date || '-'}</td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </section>
    </main>
    <footer class="bg-white p-3 xl:p-3 sm:p-3 lg:p-3 text-center">
        <p class="text-gray-600">&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
</body>
