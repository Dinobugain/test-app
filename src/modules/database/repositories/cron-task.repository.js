import { sequelize } from '../database.js';
import { DataTypes, Op, QueryTypes } from 'sequelize';

export const CronTask = sequelize.define('CronTask', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  interval_seconds: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lease_until: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  running_instance_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_started_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'cron_tasks',
  timestamps: false,
});

export const createCronTask = async (name, intervalSeconds) => {
  const taskLog = await CronTask.findOrCreate({
    where: { name: name },
    defaults: {
      interval_seconds: intervalSeconds,
      lease_until: null,
      running_instance_id: null,
      last_started_at: null,
    }
  });
  return taskLog;
};

export const tryLockTask = async ({ name, instanceId, intervalSeconds }) => {
  const now = new Date();
  const leaseUntil = new Date(now.getTime() + intervalSeconds * 1000);

  const result = await sequelize.query(`
    UPDATE cron_tasks
    SET lease_until = :leaseUntil,
        running_instance_id = :instanceId,
        last_started_at = :now
    WHERE name = :name
      AND (lease_until IS NULL OR lease_until < :now)
    RETURNING *;
  `, {
    replacements: { leaseUntil, instanceId, now, name },
    type: QueryTypes.UPDATE,
  });

  // result[0] содержит массив обновлённых строк
  return result[0]?.[0] || null;
};

export const getAllTaskStatuses = async () => {
  const result = await CronTask.findAll({
    order: [['last_started_at', 'DESC']],
  });

  return result;
};
