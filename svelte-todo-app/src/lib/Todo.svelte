<script>
  import MdDelete from 'svelte-icons/md/MdDelete.svelte'
  import MdSave from 'svelte-icons/md/MdSave.svelte'
  import MdCancel from 'svelte-icons/md/MdCancel.svelte'
  import MdEdit from 'svelte-icons/md/MdEdit.svelte'

  export let data;

  // the root element of the Todo in DOM (achieved by using bind:this={root} at the top level div of the component)
  let root;

  let mode = 'read';
  let newDescription = '';

  $: done = data.done;

  function updateTodo(event) {
    // hack to update the status on the hidden input field
    data.done = !data.done;
    root.querySelector('input[name="done"]').value = data.done;
    event.target.form.submit();
  }

  function editTodo(item) {
    mode = 'edit';
    newDescription = item.description;
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

<div class="todo-container" bind:this={root}>
  <form method="post" action="?/update">
    <input type="hidden" value={data.id} name="id" />
    <input type="hidden" value={data.done} name="done" />
    <input type="checkbox" bind:checked={done} on:change={updateTodo}>
  </form>
  {#if mode === 'read' && !data.done}
    <span class="todo-description {done ? 'done' : ''}">{data.description}</span>
    <button class="action-icon" on:click={editTodo(data)}>
      <MdEdit />
    </button>
    <form method="post" action="?/delete">
      <input type="hidden" value={data.id} name="id"/>
      <button class="action-icon">
        <MdDelete />
      </button>
    </form>
  {:else if mode === 'edit' && !data.done}
    <input type="text" class="text-input" bind:value={newDescription}/>
    <form method="post" action="?/update">
      <input type="hidden" value={data.id} name="id" />
      <input type="hidden" value={newDescription} name="description" />
      <button class="action-icon">
        <MdSave />
      </button>
    </form>
    <button class="action-icon" on:click={()=> mode = 'read'}>
      <MdCancel />
    </button>
  {:else}
    <span class="todo-description {done ? 'done' : ''}">{data.description}</span>
    <form method="post" action="?/delete">
      <input type="hidden" value={data.id} name="id"/>
      <button class="action-icon">
        <MdDelete />
      </button>
    </form>
  {/if}
</div>
