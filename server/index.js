const uuid = require('uuid');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
let todos = require('../data/todos.json');

const app = express();
app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 3000;

app.get('/', (req, res) => {
  res.redirect('/todos');
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.put('/todos/new', (req, res) => {
  const description = req.body['description'];
  if (description) {
    const todo = {
      id: uuid.v1(),
      description,
      done: false,
    };
    todos.push(todo);
    res.send(todo);
  }
});

app.post('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    const todoIdx = todos.findIndex((todo) => todo.id === id);
    if (todoIdx >= 0) {
      const description = req.body['description'];
      let done = req.body['done'];
      done = done && done === 'true' ? true : false;
      const newTodo = {
        ...todos[todoIdx],
        description: description || todos[todoIdx].description,
        done: done,
      };
      todos.splice(todoIdx, 1, newTodo);
      res.send(newTodo);
    }
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    todos = todos.filter((todo) => todo.id !== id);
    res.send('Todo successfully deleted.');
  }
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});