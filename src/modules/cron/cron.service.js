import { tasksRegistry }from './cron.registry.js';
import { createCronTaskLog }from '../database/repositories/cron-task-log.repository.js';
import { tryLockTask } from '../database/repositories/cron-task.repository.js';

const instanceId = process.env.INSTANCE_ID || 'local';

async function runTask(task) {
  const start = new Date();
  try {
    await task.fn();
  } catch (e) {
    console.error(`Error in task ${task.name}:`, e);
  }
  const finish = new Date();

  await createCronTaskLog(task.name, instanceId, start, finish);
}

export async function runCronLoop() {
  tasksRegistry.forEach(task => {
    setInterval(async () => {
      const gotLock = await tryLockTask({...task, instanceId});
      if (gotLock) {
        await runTask(task);
      }
    }, 10000)
  })
}
