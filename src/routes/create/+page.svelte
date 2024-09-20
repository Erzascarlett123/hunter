<script lang="ts">
  import Swal from 'sweetalert2';
  import { auth } from '../../firebase'; // Sesuaikan path sesuai kebutuhan
  import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let errorMessage = '';
  let successMessage = '';

  const provider = new GoogleAuthProvider(); // Menambahkan penyedia Google Auth

  // Fungsi untuk menangani pendaftaran menggunakan email dan password
  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match';
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Mengirimkan email verifikasi setelah pembuatan akun
      await sendEmailVerification(user);
      console.log('Email verification sent to:', user.email);

      successMessage = 'Account created successfully! Please check your email for verification.';
      email = '';
      password = '';
      confirmPassword = '';

      // SweetAlert success
      Swal.fire({
        title: 'Akun Berhasil Dibuat!',
        text: 'Silakan periksa email Anda untuk verifikasi.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000
      }).then(() => {
        // Redirect setelah SweetAlert ditutup
        window.location.href = '/'; // Ubah ke halaman yang Anda inginkan setelah verifikasi
      });
    } catch (error: unknown) { 
      console.error('Error creating account:', error);
      if (error instanceof Error) {
        errorMessage = error.message; 
      } else {
        errorMessage = 'An unknown error occurred.';
      }
    }
  }

  // Fungsi untuk menangani login menggunakan Google
  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google User:', result.user);
      successMessage = 'Logged in successfully with Google!';

      // SweetAlert success
      Swal.fire({
        title: 'Login Berhasil!',
        text: 'Anda berhasil login dengan Google.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000
      }).then(() => {
        // Redirect setelah SweetAlert ditutup
        window.location.href = '/next'; // Ubah ke halaman yang Anda inginkan
      });
    } catch (error: unknown) {
      console.error('Error logging in with Google:', error);
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = 'An unknown error occurred.';
      }
    }
  }
</script>

<main class="flex items-center justify-center h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-black border-3 shadow-[6px_6px_0px_black]">
    <h2 class="text-2xl font-bold mb-4">Create Account</h2>

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
        border focus:shadow-[4px_4px_0px_black] transition-all duration-300 ease-in-out focus:scale-105"
      />
            </div>

      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password:</label>
        <input type="password" id="password" bind:value={password} required class="w-full font-semibold px-3 py-2 border rounded-lg focus:outline-none focus:bg-transparent border-black 
        border focus:shadow-[4px_4px_0px_black] transition-all duration-300 ease-in-out focus:scale-105"/>
      </div>

      <div class="mb-4">
        <label for="confirmPassword" class="block text-gray-700">Confirm Password:</label>
        <input type="password" id="confirmPassword" bind:value={confirmPassword} required class="w-full font-semibold px-3 py-2 border rounded-lg focus:outline-none focus:bg-transparent border-black 
        border focus:shadow-[4px_4px_0px_black] transition-all duration-300 ease-in-out focus:scale-105"/>
      </div>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full">Create Account</button>
    </form>

    <div class="mt-4">
      <button on:click={handleGoogleLogin} class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 w-full">
        Login with Google
      </button>
    </div>
  </div>
</main>
