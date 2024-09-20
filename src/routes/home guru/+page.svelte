<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  interface Assignment {
    title: string;
    dueDate: string;
    description: string;
    fileUrl?: string;
    status: string;
  }

  let assignmentsX: Assignment[] = [];
  let assignmentsXI: Assignment[] = [];
  let assignmentsXII: Assignment[] = [];

  let showForm = false;
  let currentClass = '';
  let formTitle = '';
  let formDueDate = '';
  let formDescription = '';
  let formFile: File | null = null;

  function addAssignment(className: string, title: string, dueDate: string, description: string, fileUrl?: string) {
    const newAssignment: Assignment = { title, dueDate, description, fileUrl, status: 'Not Started' };
    if (className === 'X') {
      assignmentsX.push(newAssignment);
    } else if (className === 'XI') {
      assignmentsXI.push(newAssignment);
    } else if (className === 'XII') {
      assignmentsXII.push(newAssignment);
    }
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    formFile = input.files ? input.files[0] : null;
  }

  function openForm(className: string) {
    currentClass = className;
    showForm = true;
  }

  function closeForm() {
    showForm = false;
    formTitle = '';
    formDueDate = '';
    formDescription = '';
    formFile = null;
  }

  function submitAssignment() {
    if (currentClass && formTitle && formDueDate && formDescription) {
      let fileUrl: string | undefined;
      if (formFile) {
        fileUrl = URL.createObjectURL(formFile);
      }
      
      addAssignment(currentClass, formTitle, formDueDate, formDescription, fileUrl);
      closeForm();
    }
  }
</script>

<style>
  .class-box {
    background-color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
  }
</style>

<body class="flex flex-col min-h-screen">
  <nav class="bg-white shadow-lg">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <img src="/image/logo.png" alt="Logo" class="h-12 md:h-16 lg:h-20">

      <div class="hidden md:flex items-center space-x-4">
        <a href="/home" class="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
        <a href="/dashboard" class="py-5 px-3 text-gray-700 hover:text-gray-900">Dashboard</a>
        <a href="/contact" class="py-5 px-3 text-gray-700 hover:text-gray-900">Contact</a>
        <a href="/finishing" class="py-5 px-3 text-gray-700 hover:text-gray-900">Tugas</a>
      </div>

      <div class="hidden md:flex">
        <a href="/" class="ml-auto bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700">Logout</a>
      </div>
    </div>
  </nav>

  <main class="flex-1 p-6 bg-gray-100">
    <section>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Pemberian Tugas</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div class="class-box">
          <h2 class="font-semibold text-lg">Kelas X</h2>
          <button on:click={() => openForm('X')} class="mt-2 bg-blue-500 text-white py-1 px-2 rounded">Tambah Tugas</button>
          <ul class="mt-2">
            {#each assignmentsX as assignment}
              <li>{assignment.title} - {assignment.dueDate} ({assignment.status}) - {assignment.description} {#if assignment.fileUrl}<a href={assignment.fileUrl} class="text-blue-600" target="_blank">Lihat File</a>{/if}</li>
            {/each}
          </ul>
        </div>

        <div class="class-box">
          <h2 class="font-semibold text-lg">Kelas XI</h2>
          <button on:click={() => openForm('XI')} class="mt-2 bg-blue-500 text-white py-1 px-2 rounded">Tambah Tugas</button>
          <ul class="mt-2">
            {#each assignmentsXI as assignment}
              <li>{assignment.title} - {assignment.dueDate} ({assignment.status}) - {assignment.description} {#if assignment.fileUrl}<a href={assignment.fileUrl} class="text-blue-600" target="_blank">Lihat File</a>{/if}</li>
            {/each}
          </ul>
        </div>

        <div class="class-box">
          <h2 class="font-semibold text-lg">Kelas XII</h2>
          <button on:click={() => openForm('XII')} class="mt-2 bg-blue-500 text-white py-1 px-2 rounded">Tambah Tugas</button>
          <ul class="mt-2">
            {#each assignmentsXII as assignment}
              <li>{assignment.title} - {assignment.dueDate} ({assignment.status}) - {assignment.description} {#if assignment.fileUrl}<a href={assignment.fileUrl} class="text-blue-600" target="_blank">Lihat File</a>{/if}</li>
            {/each}
          </ul>
        </div>
      </div>
    </section>

    {#if showForm}
      <div class="form-overlay" transition:fade={{ duration: 300 }}>
        <div class="form-container" transition:fly={{ y: 100, duration: 300 }}>
          <h2 class="text-2xl font-bold mb-4">Tambah Tugas</h2>
          <div class="mb-4">
            <label for="title" class="block text-gray-700">Judul Tugas:</label>
            <input type="text" id="title" bind:value={formTitle} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"/>
          </div>

          <div class="mb-4">
            <label for="dueDate" class="block text-gray-700">Tanggal Jatuh Tempo:</label>
            <input type="date" id="dueDate" bind:value={formDueDate} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"/>
          </div>

          <div class="mb-4">
            <label for="description" class="block text-gray-700">Deskripsi Tugas:</label>
            <textarea id="description" bind:value={formDescription} required class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>

          <div class="mb-4">
            <label for="file" class="block text-gray-700">Unggah File:</label>
            <input type="file" id="file" accept=".pdf,.doc,.docx,.ppt,.pptx" on:change={handleFileChange} class="w-full px-3 py-2 border rounded-lg"/>
          </div>
          
          <div class="flex justify-between">
            <button on:click={submitAssignment} class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Kirim</button>
            <button on:click={closeForm} class="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400">Batal</button>
          </div>
        </div>
      </div>
    {/if}
  </main>

  <footer class="bg-white p-3 xl:p-3 sm:p-3 lg:p-3 text-center">
    <p class="text-gray-600">&copy; 2024 Your Company Name. All rights reserved.</p>
  </footer>
</body>
