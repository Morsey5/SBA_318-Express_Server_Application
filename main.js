const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Load users, tasks, and categories from JSON files
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
const tasks = JSON.parse(fs.readFileSync('./data/tasks.json', 'utf-8'));
const categories = JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const indexRoutes = require('./routes/index');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');

app.use('/', indexRoutes);
app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
