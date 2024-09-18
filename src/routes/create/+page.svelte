<script>
  import { auth } from '../../firebase'; // Sesuaikan path sesuai kebutuhan
  import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
  
  let email = '';
  let password = '';
  let confirmPassword = '';
  let errorMessage = '';
  let successMessage = '';

  const provider = new GoogleAuthProvider(); // Menambahkan penyedia Google Auth

  // Fungsi untuk menangani pendaftaran menggunakan email dan password
  async function handleSubmit(event) {
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

      // Redirect ke halaman lain (misalnya halaman login atau home)
      setTimeout(() => {
        window.location.href = '/'; // Ubah ke halaman yang Anda inginkan setelah verifikasi
      }, 3000);
    } catch (error) {
      console.error('Error creating account:', error);
      errorMessage = error.message;
    }
  }

  // Fungsi untuk menangani login menggunakan Google
  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google User:', result.user);
      successMessage = 'Logged in successfully with Google!';
      
      // Redirect setelah login dengan Google berhasil
      window.location.href = '/next'; // Ubah ke halaman yang Anda inginkan
    } catch (error) {
      console.error('Error logging in with Google:', error);
      errorMessage = error.message;
    }
  }
</script>

<main class="flex items-center justify-center h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
        <label for="email" class="block text-gray-700">Email:</label>
        <input type="email" id="email" bind:value={email} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"/>
      </div>

      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password:</label>
        <input type="password" id="password" bind:value={password} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"/>
      </div>

      <div class="mb-4">
        <label for="confirmPassword" class="block text-gray-700">Confirm Password:</label>
        <input type="password" id="confirmPassword" bind:value={confirmPassword} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"/>
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
