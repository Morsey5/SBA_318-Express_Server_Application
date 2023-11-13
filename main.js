const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  // Render your to-do list page here
  res.send('Hello, welcome to your To-Do List!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


const tasks = [];

app.post('/add', (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.redirect('/');
});
