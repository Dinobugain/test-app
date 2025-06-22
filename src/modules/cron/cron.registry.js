import { taskA } from './tasks/task-a.js';
import { taskB } from './tasks/task-b.js';

export const tasksRegistry = [
  {
    name: 'taskA',
    intervalSeconds: 180,
    fn: taskA
  },
  {
    name: 'taskB',
    intervalSeconds: 180,
    fn: taskB
  },
  {
    name: 'taskC',
    intervalSeconds: 180,
    fn: taskA
  },
  {
    name: 'taskD',
    intervalSeconds: 180,
    fn: taskB
  },
  {
    name: 'taskF',
    intervalSeconds: 180,
    fn: taskA
  }
];


