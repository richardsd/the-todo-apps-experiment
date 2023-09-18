<script>
  import { createEventDispatcher } from 'svelte';
  import MdDelete from 'svelte-icons/md/MdDelete.svelte'
  import MdSave from 'svelte-icons/md/MdSave.svelte'
  import MdCancel from 'svelte-icons/md/MdCancel.svelte'
  import MdEdit from 'svelte-icons/md/MdEdit.svelte'

  export let data;

  let mode = 'read';
  let newDescription = '';

  $: done = data.status === 'done';

  const dispatch = createEventDispatcher();

  function updateTodo(item) {
    dispatch('todoUpdated', item);
  }

  function editTodo(item) {
    mode = 'edit';
    newDescription = item.description;
  }

  function deleteTodo(item) {
    dispatch('deleteTodo', item);
  }

  function saveTodo(item) {
    mode = 'read';
    item.description = newDescription;
    // TODO actual the item
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
    flex: 1;
  }
  .done {
    text-decoration: line-through;
  }
  .text-input {
    flex: 1;
  }
  .action-icon {
    display: none;
    width: 30px;
    height: 30px;
  }
  .todo-container:hover {
    background-color: lightgray;
  }
  .todo-container:hover .action-icon {
    display: block;
  }
</style>

<div class="todo-container">
  <input type="checkbox" bind:checked={done} on:change={updateTodo(data)}>
  {#if mode === 'read' && data.status !== 'done'}
    <span class="todo-description {done ? 'done' : ''}">{data.description}</span>
    <button class="action-icon" on:click={editTodo(data)}>
      <MdEdit />
    </button>
    <button class="action-icon" on:click={deleteTodo(data)}>
      <MdDelete />
    </button>
  {:else if mode === 'edit' && data.status !== 'done'}
    <input type="text" class="text-input" bind:value={newDescription}/>
    <button class="action-icon" on:click={saveTodo(data)}>
      <MdSave />
    </button>
    <button class="action-icon" on:click={()=> mode = 'read'}>
      <MdCancel />
    </button>
  {:else}
    <span class="todo-description {done ? 'done' : ''}">{data.description}</span>
    <button class="action-icon" on:click={deleteTodo(data)}>
      <MdDelete />
    </button>
  {/if}
</div>
