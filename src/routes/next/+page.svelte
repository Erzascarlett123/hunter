<script>
    import { userName, userClass } from '/Users/User/hunter/src/stores/userStore'; // Path yang benar
    import { goto } from '$app/navigation'; // Gunakan sveltekit's goto untuk navigasi
  
    let name = '';
    let className = '';
  
    function handleSubmit(event) {
      event.preventDefault();
      
      // Update store
      userName.set(name);
      userClass.set(className);
  
      // Navigasi ke halaman home
      goto('/home');
    }
  </script>
  
  <main class="flex items-center justify-center h-screen">
    <form on:submit={handleSubmit} class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Form Input</h2>
  
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Nama:</label>
        <input type="text" id="name" bind:value={name} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"/>
      </div>
  
      <div class="mb-4">
        <label for="class" class="block text-gray-700">Kelas:</label>
        <input type="text" id="class" bind:value={className} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"/>
      </div>
  
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full">Submit</button>
    </form>
  </main>
  