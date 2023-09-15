<script>
  import { createEventDispatcher } from 'svelte';

  export let data;

  $: done = data.status === 'done';

  const dispatch = createEventDispatcher();

  function updateTodo(item) {
    dispatch('todoUpdated', item);
  }

</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>

<div>
  <input type="checkbox" bind:checked={done} on:change={updateTodo(data)}>
  <span class="{done ? 'done' : ''}">{data.description}</span>
</div>
