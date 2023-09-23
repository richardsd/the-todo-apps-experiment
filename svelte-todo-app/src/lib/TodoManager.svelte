<script>
  import Todo from './Todo.svelte';

  export let data;

  let newTodo = '';

  $: done = data.done;
  $: todos = data.todos;
  $: totalNumberOfItemsDone = done.length;
  $: totalNumberOfTodos = todos.length;


  function updateTodo(item, index) {
    if (!item) {
      return;
    }
    
    if (item.status === 'todo') {
      todos.splice(index, 1);
      todos = todos;

      item.status = 'done';
      done = [item, ...done];
    } else {
      done.splice(index, 1);
      done = done;

      item.status = 'todo';
      todos = [item, ...todos];
    }
  }

  function deleteTodo(item, index) {
    if (item.status === 'todo') {
      todos.splice(index, 1);
      todos = todos;
    } else {
      done.splice(index, 1);
      done = done;
    }
  }
</script>

<style>
  input {
    width: 350px;
  }
</style>

<h1>The Todo app experiment - Svelte edition</h1>

<div>
  <form method="post" action="?/create">
    <label>
      <input type="text" name="description" bind:value="{newTodo}"/>
    </label>
    <button disabled="{newTodo === ''}">Add</button>
  </form>
</div>

<h3>To do</h3>
{#if totalNumberOfTodos > 0}
<h5>{totalNumberOfTodos} task(s) to complete</h5>
{:else}
<h5>All tasks completed</h5>
{/if}

{#each todos as todo, idx}
  <Todo data={todo} on:todoUpdated={updateTodo(todo, idx)} on:deleteTodo={deleteTodo(todo, idx)}/>
{/each}

<h3>Done</h3>
<h5>{totalNumberOfItemsDone} task(s) completed</h5>
{#each done as todo, idx}
  <Todo data={todo} on:todoUpdated={updateTodo(todo, idx)} on:deleteTodo={deleteTodo(todo, idx)}/>
{/each}
