<script lang="ts">
    import { auth, database } from './../firebase.js';
    import Swal from 'sweetalert2';
    import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
    import { doc, getDoc, setDoc } from 'firebase/firestore';
    import { goto } from '$app/navigation'; // Import untuk navigasi

    let email = '';
    let password = '';
    let confirmPassword = '';
    let errorMessage = '';
    let successMessage = '';

    const provider = new GoogleAuthProvider();

    async function handleSubmit(event: Event) {
        event.preventDefault();

        errorMessage = ''; // Reset error message
        successMessage = ''; // Reset success message

        if (password !== confirmPassword) {
            errorMessage = 'Passwords do not match';
            return;
        }

        const emailDocRef = doc(database, 'users', email);
        const emailDoc = await getDoc(emailDocRef);

        if (emailDoc.exists()) {
            errorMessage = 'Akun dengan email ini sudah terdaftar.';
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            console.log('Email verification sent to:', user.email);

            await setDoc(doc(database, 'users', user.uid), {
                email: user.email,
            });

            successMessage = 'Akun berhasil dibuat! Silakan cek email Anda untuk verifikasi.';
            email = '';
            password = '';
            confirmPassword = '';

            Swal.fire({
                title: 'Akun Berhasil Dibuat!',
                text: 'Silakan periksa email Anda untuk verifikasi.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
            }).then(() => {
                goto('/'); // Ubah ke halaman yang Anda inginkan setelah verifikasi
            });
        } catch (error: unknown) {
            console.error('Error creating account:', error);
            errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        }
    }

    async function handleGoogleLogin() {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const emailDocRef = doc(database, 'users', user.uid);
            const emailDoc = await getDoc(emailDocRef);

            if (emailDoc.exists()) {
                successMessage = 'Anda sudah terdaftar dengan akun ini!';
                Swal.fire({
                    title: 'Login Berhasil!',
                    text: 'Anda berhasil login dengan Google.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 3000
                }).then(() => {
                    goto('/next'); // Ubah ke halaman yang Anda inginkan
                });
            } else {
                await setDoc(emailDocRef, {
                    email: user.email,
                });
                
                successMessage = 'Akun baru telah dibuat dari login Google.';
                Swal.fire({
                    title: 'Akun Berhasil Dibuat!',
                    text: 'Anda berhasil login dan akun Anda telah dibuat.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 3000
                }).then(() => {
                    goto('/next'); // Ubah ke halaman yang Anda inginkan
                });
            }
        } catch (error: unknown) {
            console.error('Error logging in with Google:', error);
            errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        }
    }
</script>

<main class="flex items-center justify-center h-screen bg-gray-100" style="background-image: url('/path-to-your-background-image.jpg'); background-size: cover;">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-black border-3 shadow-[6px_6px_0px_black] transition-transform duration-500 transform hover:scale-105">
        <h2 class="text-3xl font-bold text-center mb-6">Buat Akun Baru</h2>

        {#if errorMessage}
            <div class="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
                {errorMessage}
            </div>
        {/if}

        {#if successMessage}
            <div class="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
                {successMessage}
            </div>
        {/if}

        <form on:submit={handleSubmit}>
            <div class="mb-4">
                <label for="email" class="font-bold block text-gray-700">Email:</label>
                <input type="email" id="email" bind:value={email} required 
                class="w-full font-semibold px-3 py-2 border rounded-lg focus:outline-none focus:bg-transparent border-black 
                border focus:shadow-[4px_4px_0px_black] transition-all duration-300 ease-in-out focus:scale-105"/>
            </div>

            <div class="mb-4">
                <label for="password" class="block text-gray-700">Password:</label>
                <input type="password" id="password" bind:value={password} required class="w-full font-semibold px-3 py-2 border rounded-lg focus:outline-none focus:bg-transparent border-black 
                border focus:shadow-[4px_4px_0px_black] transition-all duration-300 ease-in-out focus:scale-105"/>
            </div>

            <div class="mb-4">
                <label for="confirmPassword" class="block text-gray-700">Konfirmasi Password:</label>
                <input type="password" id="confirmPassword" bind:value={confirmPassword} required class="w-full font-semibold px-3 py-2 border rounded-lg focus:outline-none focus:bg-transparent border-black 
                border focus:shadow-[4px_4px_0px_black] transition-all duration-300 ease-in-out focus:scale-105"/>
            </div>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full transition-all duration-300 ease-in-out">
                Buat Akun
            </button>
        </form>

        <div class="mt-4">
            <button on:click={handleGoogleLogin} class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 w-full transition-all duration-300 ease-in-out">
                Login dengan Google
            </button>
        </div>

        <div class="mt-6 text-center">
            <p class="text-gray-600">Sudah punya akun? <a href="/login" class="text-blue-600 hover:underline">Login di sini</a></p>
        </div>
    </div>
</main>
