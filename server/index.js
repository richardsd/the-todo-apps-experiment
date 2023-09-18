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
  const todo = req.body['todo'];
  if (todo) {
    todos.push(todo);
    res.send('Todo successfully created.');
  }
});

app.post('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id) {
    const todoIdx = todos.findIndex((todo) => todo.id === id);;
    if (todoIdx) {
      const newTodo = req.body['update'];
      todos.splice(todoIdx, 1, newTodo);
      res.send('Todo successfully updated.');
    }
  }
});

app.delete('/todos/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id) {
    todos = todos.filter((todo) => todo.id !== id);
    res.send('Todo successfully deleted.');
  }
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});