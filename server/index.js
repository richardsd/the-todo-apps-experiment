const express = require('express');
const todos = require('../data/todos.json');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.redirect('/todos');
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});