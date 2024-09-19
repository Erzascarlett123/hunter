<!-- src/components/AuthButton.svelte -->

<script lang="ts">
    import { signInWithGoogle } from '../services/signup';
  
    // Fungsi untuk menangani klik tombol
    const handleSignIn = async () => {
      await signInWithGoogle();
    }
  </script>
  
  <button on:click={handleSignIn}>Login with Google</button>
  