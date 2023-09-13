<script>
  import { onMount } from "svelte";

  let data = [];

  onMount(async () => {
    const response = await fetch('http://localhost:3000/todos');
    data = await response.json();
  });

</script>

<h1>The Todo app experiment - Svelte edition</h1>

<ul>
  {#each data as todo}
    <li>{todo.id} - {todo.description} - {todo.status}</li>
  {/each}
</ul>