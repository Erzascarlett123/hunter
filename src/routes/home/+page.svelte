<script>
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
  
    function handleClick(event) {
      event.preventDefault();
      loading = true;
  
      setTimeout(() => {
        window.location.href = event.target.href;
      }, 500);
    }
  </script>
  
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
            <a href="/view 1" class="mt-4 inline-block text-blue-600 hover:underline">View Details</a>
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
  