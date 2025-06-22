import { tasksRegistry }from './cron.registry.js';
import { createCronTask }from '../database/repositories/cron-task.repository.js';

export async function setupCronTasks() {
  for (const taskHasToBeRegister of tasksRegistry) {
    const [task, created] = await createCronTask(taskHasToBeRegister.name, taskHasToBeRegister.intervalSeconds);
    if (created) {
      console.log(`Task "${taskHasToBeRegister.name}" inserted`);
    } else {
      console.log(`Task "${taskHasToBeRegister.name}" already exists`);
    }
  }
}
