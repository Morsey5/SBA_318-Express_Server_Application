const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Load users, tasks, and categories from JSON files
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
let tasks = JSON.parse(fs.readFileSync('./data/tasks.json', 'utf-8'));
let categories = JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// Routes
app.use('/', require('./routes/index'));
app.use('/tasks', require('./routes/tasks'));
app.use('/categories', require('./routes/categories'));

// Handle task form submission
app.post('/tasks/add', (req, res) => {
  const newTask = {
    title: req.body.title,
    description: req.body.description,
  };

  // Process the form submission, add the task to the tasks array
  tasks.push(newTask);

  // Redirect to the tasks page or send a success message
  res.redirect('/tasks');
});

// Handle category form submission
app.post('/categories/add', (req, res) => {
  const newCategory = {
    name: req.body.name,
  };

  // Process the form submission, add the category to the categories array
  categories.push(newCategory);

  // Redirect to the categories page or send a success message
  res.redirect('/categories');
});

// RESTful API Routes
app.get('/api/tasks', (req, res) => {
  // Return a JSON representation of all tasks
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Return a JSON representation of the specific task
  res.json(task);
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
