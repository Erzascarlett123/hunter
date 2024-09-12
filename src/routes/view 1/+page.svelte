<script>
    let groups = ['Group 1', 'Group 2', 'Group 3'];
    let selectedGroup = 'Group 1';
    let messages = [];
    let newMessage = '';
    
    function sendMessage() {
      if (newMessage.trim()) {
        messages = [...messages, { text: newMessage, sender: 'You' }];
        newMessage = '';
      }
    }
  </script>
  
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/4 bg-gray-200 p-4">
      <h2 class="text-lg font-bold">Groups</h2>
      <ul>
        {#each groups as group}
          <li class="cursor-pointer p-2 hover:bg-gray-300" on:click={() => selectedGroup = group}>
            {group}
          </li>
        {/each}
      </ul>
    </div>
  
    <!-- Chat Area -->
    <div class="w-3/4 flex flex-col">
      <div class="flex-1 p-4 border-b border-gray-300">
        <h2 class="text-lg font-bold">Chatting in {selectedGroup}</h2>
        <div class="overflow-y-auto h-full mt-4">
          {#each messages as { text, sender }}
            <div class="mb-2">
              <span class="font-bold">{sender}: </span>{text}
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Input Area -->
      <div class="p-4 border-t border-gray-300 flex">
        <input
          type="text"
          class="flex-1 border rounded p-2"
          bind:value={newMessage}
          placeholder="Type a message"
        />
        <button
          class="ml-2 bg-blue-500 text-white rounded p-2"
          on:click={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  </div>
  