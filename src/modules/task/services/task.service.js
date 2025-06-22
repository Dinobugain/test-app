import { getAllTaskStatuses } from '../../database/repositories/cron-task.repository.js';

export class TaskService {

  async getTaskStatuses() {
    let error = false;
    try {
     
      const taskStatuses = await getAllTaskStatuses();
      return { error: undefined, result: taskStatuses };
    } catch (err) {
      error = true;
    }

    return { error, result: undefined };
  }
}

