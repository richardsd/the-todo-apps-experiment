<script>
  import { onMount } from "svelte";
  import Todo from './Todo.svelte';

  let data = [];
  let done = [];
  let todos = [];
  let newTodo = '';

  $: totalNumberOfItemsDone = done.length;
  $: totalNumberOfTodos = todos.length;

  onMount(async () => {
    const response = await fetch('http://localhost:3000/todos');
    data = await response.json();

    done = data.filter(item => item.status === 'done');
    todos = data.filter(item => item.status === 'todo');
  });

  function onKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  }

  function addTodo() {
    todos = [createTodo(newTodo), ...todos];
    newTodo = '';
  }

  function createTodo(description) {
    return {
      id: data.length + 1,
      description,
      status: 'todo'
    };
  }

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
</script>

<h1>The Todo app experiment - Svelte edition</h1>

<div>
  <input type="text" bind:value="{newTodo}" on:keyup={onKeyDown}/>
  <button on:click={addTodo} disabled="{newTodo === ''}">Add</button>
</div>

<h3>To do</h3>
{#if totalNumberOfTodos > 0}
<h5>{totalNumberOfTodos} task(s) to complete</h5>
{:else}
<h5>All tasks completed</h5>
{/if}

{#each todos as todo, idx}
  <Todo data={todo} on:todoUpdated={updateTodo(todo, idx)} />
{/each}

<h3>Done</h3>
<h5>{totalNumberOfItemsDone} task(s) completed</h5>
{#each done as todo, idx}
  <Todo data={todo} on:todoUpdated={updateTodo(todo, idx)} />
{/each}
