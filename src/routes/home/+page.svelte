<script lang="ts">
  import { userName, userClass } from '../../stores/userStore'; // Path yang benar

  let isOpen = false;
  let loading = false;

  let classes = [
    { name: 'Mathematics', description: 'Algebra and Geometry' },
    { name: 'Science', description: 'Physics and Chemistry' },
    { name: 'History', description: 'Ancient and Modern History' },
  ];

  let assignments = [
    { title: 'Homework 1', dueDate: '2024-09-15', status: 'Not Started' },
    { title: 'Project Report', dueDate: '2024-09-30', status: 'In Progress' },
    { title: 'Essay', dueDate: '2024-10-05', status: 'Completed' },
  ];

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function handleClick(event: Event) {
  event.preventDefault();
  loading = true;

  const target = event.target as HTMLAnchorElement; // Type assertion

  // Cek apakah target ada dan memiliki href
  if (target && target.href) {
    setTimeout(() => {
      window.location.href = target.href;
    }, 500);
  }
}
</script>

<style>
  .mobile-menu {
    transition: opacity 0.3s ease, max-height 0.3s ease;
  }
  .mobile-menu.show {
    display: block;
    opacity: 1;
    max-height: 500px;
  }
  .mobile-menu.hide {
    display: block;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }
</style>

<nav class="bg-white shadow-lg">
  <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
    <img src="/image/logo.png" alt="Logo" class="h-12 md:h-16 lg:h-20">

    <div class="hidden md:flex items-center space-x-4">
      <a href="/home" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Home</a>
      <a href="/dashboard" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Dashboard</a>
      <a href="/contact" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Contact</a>       
      <a href="/finishing" class="py-5 px-3 text-gray-700 hover:text-gray-900" on:click={handleClick}>Tugas</a>
    </div>

    <div class="hidden md:flex">
      <a href="/" class="ml-auto bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700" on:click={handleClick}>
        Logout
      </a>
    </div>

    <div class="md:hidden flex items-center">
      <button on:click={toggleMenu} class="p-2">
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
  </div>

  <div class={`mobile-menu ${isOpen ? 'show' : 'hide'} md:hidden bg-white shadow-lg`}>
    <a href="/home" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Home</a>
    <a href="/dashboard" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Dashboard</a>
    <a href="/contact" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Contact</a>
    <a href="/finishing" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Tugas</a>
    <a href="/" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200" on:click={handleClick}>Logout</a>
  </div>
</nav>

<main class="flex-1 p-6 bg-gray-100">
  <!-- Bagian ini akan berubah sesuai nilai dari store -->
  <section class="mb-6">
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Welcome, {$userName}!</h1>
    <p class="text-gray-600 mt-2">You are in class: {$userClass}</p>
  </section>

  <!-- Classes Section -->
  <section class="mb-6">
    <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Your Classes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each classes as { name, description }}
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-800">{name}</h3>
          <p class="text-gray-600 mt-2">{description}</p>
          <a href="/view" class="mt-4 inline-block text-blue-600 hover:underline">View Details</a>
        </div>
      {/each}
    </div>
  </section>

  <!-- Assignments Section -->
  <section>
    <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Upcoming Assignments</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr class="border-b">
            <th class="py-2 px-4 text-left text-gray-600">Assignment</th>
            <th class="py-2 px-4 text-left text-gray-600">Due Date</th>
            <th class="py-2 px-4 text-left text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {#each assignments as { title, dueDate, status }}
            <tr class="border-b">
              <td class="py-2 px-4">{title}</td>
              <td class="py-2 px-4">{dueDate}</td>
              <td class="py-2 px-4">{status}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</main>
