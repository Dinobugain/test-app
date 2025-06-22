import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('cron_tasks', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      allowNull: false,
      unique: true,
    },
    interval_seconds: {
      type: 'INTEGER',
      allowNull: false,
    },
    lease_until: {
      type: 'TIMESTAMPTZ',
      allowNull: true,
    },
    running_instance_id: {
      type: 'TEXT',
      allowNull: true,
    },
    last_started_at: {
      type: 'TIMESTAMPTZ',
      allowNull: true,
    } 
  });

  await queryInterface.createTable('cron_task_logs', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    task_name: {
      type: 'TEXT',
      allowNull: false,
    },
    started_at: {
      type: 'TIMESTAMPTZ',
      allowNull: false,
    },
    finished_at: {
      type: 'TIMESTAMPTZ',
      allowNull: false,
    },
    instance_id: {
      type: 'TEXT',
      allowNull: false,
    }
  });
};

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('cron_task_logs');
  await queryInterface.dropTable('cron_tasks');
};
