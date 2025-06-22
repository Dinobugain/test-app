import { updateUserBalance } from '../../database/repositories/user.repository.js';

export class UserWalletService {

  async updateBalance(userId, amount) {
    let message = 'Balance updated successfully';
    let error = false;

    // Check if the amount is a number and if the user id is provided
    if (typeof amount !== 'number' || !userId) {
      message = 'Incorrect data';
      error = true;
    }

    // Update the balance
    const updatedRows = await updateUserBalance(userId, amount);  

    // Check if the balance was updated
    if (updatedRows === 0) {
      message = 'Not enough funds or user not found';
      error = true;
    }

    return { message, error };
  }
}

