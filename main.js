

const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Load tasks from JSON file
const tasks = JSON.parse(fs.readFileSync('./data/tasks.json', 'utf-8'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const indexRoutes = require('./routes/index');
const taskRoutes = require('./routes/tasks');

app.use('/', indexRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
