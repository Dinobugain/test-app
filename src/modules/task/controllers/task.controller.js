import { Router } from 'express';
import { TaskService } from '../services/task.service.js';

// Initialize all requirements
const taskController = Router();
const taskService = new TaskService();

// Get all tasks
taskController.post('/get-all', async (req, res) => {
  const { error, result } = await taskService.getTaskStatuses();
  res.status(error ? 400 : 200).json({ result, error });
});

// Export the controller
export default taskController;