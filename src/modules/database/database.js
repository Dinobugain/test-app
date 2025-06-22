import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('wallet_db', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

