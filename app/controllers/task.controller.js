import Task from '../models/task.model.js';

// Controller to create a new task within a project
export async function createTask(req, res) {
  try {
    const { description, priority, deadline, projectId } = req.body;
    const task = new Task({
      description,
      priority,
      deadline,
      project: projectId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the task' });
  }
}

// Controller to get a list of all tasks within a project
export async function getTasks(req, res) {
  try {
    const projectId = req.query.projectId; // Assuming you pass projectId as a query parameter
    const tasks = await Task.find({ project: projectId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

// Controller to get details of a specific task by ID
export async function getTaskById(req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch task details' });
  }
}

// Controller to update task details by ID
export async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const updates = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
}

// Controller to delete a task by ID
export async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndRemove(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}
