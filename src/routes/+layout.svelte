<script>
  import Navbarguru from './../components/navbarguru.svelte';
  import Navbar from './../components/navbar.svelte';
  import { page } from '$app/stores'; // Mengimpor store `page` dari SvelteKit
  import "../app.css";

  let showNavbar = true;

  // Memantau perubahan pada path untuk menyembunyikan navbar pada halaman tertentu
  $: {
    const hideNavbarOnPaths = ['/next', '/login'];
    showNavbar = !hideNavbarOnPaths.includes($page.url.pathname);
  }
</script>

<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
</head>

<!-- Menampilkan navbar hanya jika `showNavbar` true -->
{#if showNavbar}
  <Navbar />
{/if}

<slot />
