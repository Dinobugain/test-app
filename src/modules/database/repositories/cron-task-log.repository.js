import { sequelize } from '../database.js';
import { DataTypes, Op } from 'sequelize';

export const CronTaskLog = sequelize.define('CronTaskLog', {
  task_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instance_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  started_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finished_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'cron_task_logs',
  timestamps: false,
});

export const createCronTaskLog = async (name, instanceId, startedAt, finishedAt) => {
  try {
    const cronTaskLog = await CronTaskLog.create({ 
      task_name: name, 
      instance_id: instanceId, 
      started_at: startedAt, 
      finished_at: finishedAt
    });
    return cronTaskLog;
  } catch (e) {
    return false;
  }
};

export const getAll = async () => {
  const tasks = await CronTaskLog.findAll({
    order: [['started_at', 'DESC']],
  });

  return tasks;
}
