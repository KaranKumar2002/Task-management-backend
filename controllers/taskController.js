const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const docs = req.files.map((file) => ({
      name: file.originalname,
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
    }));

    const task = new Task({
      ...req.body,
      createdBy: req.user.id,
      documents: docs,
    });

    await task.save();
    res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    res.status(400).json({ message: 'Task creation failed', error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).populate('assignedTo', 'email');
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  console.log("update task", req.body);

  try {
    const task = await Task.findOne({ _id: id, createdBy: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    Object.assign(task, req.body); // merge new data
    await task.save();

    console.log("done");

    res.json({ message: 'Task updated', task });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, createdBy: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};