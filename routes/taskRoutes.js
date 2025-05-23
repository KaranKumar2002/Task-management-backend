const express = require('express');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.get('/', auth, getTasks);
router.post('/', auth, upload.array('documents', 3), createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
