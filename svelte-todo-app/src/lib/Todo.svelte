<script>
  import { createEventDispatcher } from 'svelte';
  import MdDelete from 'svelte-icons/md/MdDelete.svelte'

  export let data;

  $: done = data.status === 'done';

  const dispatch = createEventDispatcher();

  function updateTodo(item) {
    dispatch('todoUpdated', item);
  }

  function deleteTodo(item) {
    dispatch('deleteTodo', item);
  }

</script>

<style>
  .todo-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 5px;
    line-height: 35px;
    width: 400px;
  }
  .todo-description {
    min-width: 350px;
  }
  .done {
    text-decoration: line-through;
  }
  .delete-icon {
    display: none;
  }
  .todo-container:hover {
    background-color: lightgray;
  }
  .todo-container:hover .delete-icon {
    display: block;
    color: red;
    width: 30px;
    height: 30px;
  }
</style>

<div class="todo-container">
  <input type="checkbox" bind:checked={done} on:change={updateTodo(data)}>
  <span class="todo-description {done ? 'done' : ''}">{data.description}</span>
  <button class="delete-icon" on:click={deleteTodo(data)}>
    <MdDelete />
  </button>
</div>
