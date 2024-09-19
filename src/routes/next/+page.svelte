<script lang="ts">
  import { userName, userClass } from '../../stores/userStore';
  import { goto } from '$app/navigation';
  
  let name = '';
  let className = '';
  
  const classes = ['X', 'XI', 'XII']; // Daftar kelas yang bisa dipilih
  
  function handleSubmit(event: Event) { // Menambahkan tipe parameter
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
      <select id="class" bind:value={className} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
        <option value="" disabled>Pilih kelas</option>
        {#each classes as classItem}
          <option value={classItem}>{classItem}</option>
        {/each}
      </select>
    </div>

    <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full">Submit</button>
  </form>

  {#if name && className}
    <div class="mt-6 text-center">
      <h3 class="text-lg font-bold">Data yang telah diisi:</h3>
      <p>Nama: {name}</p>
      <p>Kelas: {className}</p>
    </div>
  {/if}
</main>
