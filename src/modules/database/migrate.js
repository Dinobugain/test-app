import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './database.js';

const umzug = new Umzug({
  migrations: {
    glob: 'src/modules/database/migrations/*.js',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }), 
  logger: console,
});

export const migrate = async () => {
  await sequelize.authenticate();
  await umzug.up();
  console.log('Migrations done');
};

try {
  await migrate();
} catch (error) {
  console.error('Error migrating:', error);
}