export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('Users', {
    id: {
      type: 'SERIAL',
      primaryKey: true
    },
    balance: {
      type: 'INTEGER',
      allowNull: false,
      defaultValue: 10000
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: new Date()
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: new Date()
    }
  });

  await queryInterface.bulkInsert('Users', [
    { balance: 10000, createdAt: new Date(), updatedAt: new Date() }
  ]);
};

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('Users');
};
