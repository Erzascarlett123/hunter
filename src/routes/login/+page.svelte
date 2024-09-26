<!-- index.svelte -->
<script lang="ts">
	import Signup from './../../components/signup.svelte';
	import Login from './../../components/login.svelte';

    
  
    let isLoginPage = true; // Default ke halaman login
  
    const togglePage = () => {
      isLoginPage = !isLoginPage; // Mengganti antara login dan signup
    };
  </script>
  
  <div>
    {#if isLoginPage}
      <Login on:toggle={togglePage} />
    {:else}
      <Signup on:toggle={togglePage} />
    {/if}
  </div>
  