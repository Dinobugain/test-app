import { sequelize } from '../database.js';
import { DataTypes, literal, Op } from 'sequelize';

export const UserModel = sequelize.define('User', {
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10000,
  }
});

export const updateUserBalance = async (userId, amount) => {
  const [updatedRows] = await UserModel.update(
    { balance: literal(`balance + ${amount}`) },
    {
      where: {
        id: userId,
        ...(amount < 0 ? { balance: { [Op.gte]: Math.abs(amount) } } : {}),
      },
    }
  );

  return updatedRows;
};

