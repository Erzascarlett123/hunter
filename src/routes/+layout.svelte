<script>
  import Navbarguru from './../components/navbarguru.svelte';
  import Navbar from './../components/navbar.svelte';
  import { page } from '$app/stores'; // Mengimpor store `page` dari SvelteKit
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { getAuth } from 'firebase/auth';
  import "../app.css";

  let showNavbar = true;

  let user;

  onMount(() => {
    const auth = getAuth();
    user = auth.currentUser; // Mendapatkan pengguna saat ini
    console.log('Current User: ', user); // Cek apakah pengguna terautentikasi

    if (!user) {
        // Jika tidak ada pengguna yang terautentikasi, arahkan ke halaman login
        goto('/login');
    }
});



  // Memantau perubahan pada path untuk menyembunyikan navbar pada halaman tertentu
  $: {
    const hideNavbarOnPaths = ['/next', '/login', '/'];
    showNavbar = !hideNavbarOnPaths.includes($page.url.pathname);
  }
</script>

<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
</head>

<!-- Menampilkan navbar hanya jika `showNavbar` true -->
{#if showNavbar}
  {#if $page.url.pathname.includes('guru')}
    <Navbarguru />
  {:else}
    <Navbar />
  {/if}
{/if}

<slot />
