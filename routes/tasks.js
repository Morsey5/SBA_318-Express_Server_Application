const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.sendFile('tasks.html', { root: 'views' }));

router.get('/error', (req, res, next) => {
  // Intentional error for testing error handling middleware
  next(new Error('This is a test error.'));
});

module.exports = router;
