<script>
  import { createEventDispatcher } from 'svelte';

  export let data;

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
  <input type="checkbox" checked on:change={updateTodo(data)}>
  <span class="{data.status === 'done' ? 'done' : ''}">{data.description}</span>
</div>
