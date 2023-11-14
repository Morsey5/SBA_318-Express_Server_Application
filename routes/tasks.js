const express = require('express');
const router = express.Router();

// GET /tasks - Retrieve all tasks
router.get('/', (req, res) => {
  // Return a JSON representation of all tasks
  res.json(tasks);
});

// tasks - Create a new task
router.post('/', (req, res) => {
  const newTask = {
    title: req.body.title,
    description: req.body.description,
  };

  // Process the form submission, add the task to the tasks array
  tasks.push(newTask);

  // Return the newly created task
  res.status(201).json(newTask);
});

// GET /Retrieve a specific task
router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Return a JSON representation of the specific task
  res.json(task);
});

// PUT /Update a specific task
router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Update the task
  tasks[taskIndex] = {
    id: taskId,
    title: req.body.title,
    description: req.body.description,
  };

  // Return the updated task
  res.json(tasks[taskIndex]);
});

// DELETE / Delete a specific task
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Remove the task from the tasks array
  const deletedTask = tasks.splice(taskIndex, 1)[0];

  // Return the deleted task
  res.json(deletedTask);
});

module.exports = router;
