<script lang="ts">
  import Swal from 'sweetalert2';
  import { userName, userClass } from '../../stores/userStore';
  import { goto } from '$app/navigation';

  let name = '';
  let className = '';
  let isSubmitted = false;

  const classes = ['X', 'XI', 'XII'];

  function handleSubmit(event: Event) {
    event.preventDefault();
    
    // Update store
    userName.set(name);
    userClass.set(className);

    // SweetAlert popup
    Swal.fire({
      title: 'Selamat Datang!',
      html: `<p>Nama: ${name}</p><p>Kelas: ${className}</p>`,
      icon: 'success',
      confirmButtonText: 'Lanjutkan',
      timer: 3000,
    }).then(() => {
      // Navigasi setelah popup
      goto('/home');
    });

    isSubmitted = true;
  }

  function resetForm() {
    name = '';
    className = '';
    isSubmitted = false;
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
</main>
