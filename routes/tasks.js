const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('tasks', { tasks }));

router.post('/', (req, res) => {
  // Handle task creation logic here
  // You may need to update the tasks array and save it to the JSON file
  res.redirect('/tasks');
});

router.put('/:taskId', (req, res) => {
  // Handle task completion logic here
  // You may need to update the tasks array and save it to the JSON file
  res.json({ success: true, message: 'Task completed successfully' });
});

router.delete('/:taskId', (req, res) => {
  // Handle task deletion logic here
  // You may need to update the tasks array and save it to the JSON file
  res.json({ success: true, message: 'Task deleted successfully' });
});

module.exports = router;
