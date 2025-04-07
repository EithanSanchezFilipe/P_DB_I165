const router = require('express').Router();
const { authenticateToken } = require('../middlewares');
const { createTodo, getAllTodo, getSearchTodo, editTodo, deleteTodo } =
  require('../controllers').TodoController;

// Handle the API request
router.post('/', authenticateToken, createTodo);
router.get('/', authenticateToken, getAllTodo);
router.get('/search', authenticateToken, getSearchTodo);
router.patch('/:id', authenticateToken, editTodo);
router.delete('/:id', authenticateToken, deleteTodo);

module.exports = router;
