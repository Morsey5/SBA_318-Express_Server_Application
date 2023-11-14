const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('tasks', { tasks }));

router.get('/error', (req, res, next) => {
  next(new Error('This is a test error.'));
});

module.exports = router;