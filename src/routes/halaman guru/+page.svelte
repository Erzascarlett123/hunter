<script lang="ts">
	import Navbarguru from './../../components/navbarguru.svelte';
    import { onMount } from 'svelte';
    import { database } from '../../firebase';
    import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
    
    interface Student {
        kelas: string;
        submitted: boolean;
        date: string | null;
    }
    
    let loading = false;
    let students: Student[] = [];
    
    async function fetchStudents() {
        loading = false;
        try {
            const querySnapshot = await getDocs(collection(database, 'students'));
            students = querySnapshot.docs.map(doc => ({
                kelas: doc.data().kelas,
                submitted: doc.data().submitted,
                date: doc.data().date || null
            }));
        } catch (error) {
            console.error('Error fetching students: ', error);
        } finally {
            // Delay loading state for 1 detik sebelum disembunyikan
            setTimeout(() => {
                loading = false;
            }, 1000);
        }
    }
    
    onMount(() => {
        fetchStudents();
    });
    
    async function deleteStudent(className: string) {
        loading = true;
        try {
            const studentDoc = doc(database, 'students', className);
            await deleteDoc(studentDoc);
            students = students.filter(student => student.kelas !== className);
        } catch (error) {
            console.error('Error deleting student: ', error);
        } finally {
            // Delay loading state untuk memberikan efek loading
            setTimeout(() => {
                loading = false;
            }, 1000);
        }
    }
</script>

<style>
    /* Style tetap sama */
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
        100% { transform: rotate(300deg); }
    }
</style>

<body class="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col">
    {#if loading}
    <div class="loading-overlay">
        <div class="loading-spinner" role="status" aria-label="Loading..."></div>
    </div>
    {/if}

    <div class="p-6 w-full mx-auto bg-white shadow-lg rounded-lg mt-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">Daftar Kelas Murid</h2>

        <table class="w-full table-auto mt-8 border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2">Kelas</th>
                    <th class="border border-gray-300 p-2">Status</th>
                    <th class="border border-gray-300 p-2">Tanggal Pengumpulan</th>
                    <th class="border border-gray-300 p-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {#each students as student}
                <tr>
                    <td class="border border-gray-300 p-2">{student.kelas}</td>
                    <td class="border border-gray-300 p-2">{student.submitted ? '✅' : '❌'}</td>
                    <td class="border border-gray-300 p-2">{student.date || '-'}</td>
                    <td class="border border-gray-300 p-2">
                        <button on:click={() => deleteStudent(student.kelas)} class="text-red-500 hover:underline">Hapus</button>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
    
    <footer class="bg-white p-3 xl:p-3 sm:p-3 lg:p-3 text-center">
        <p class="text-gray-600">&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
</body>
