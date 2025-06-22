import { Router } from 'express';
import { UserWalletService } from '../services/user-wallet.service.js';

// Initialize all requirements
const userWalletController = Router();
const userWalletService = new UserWalletService();

// Update balance route
userWalletController.post('/update-balance', async (req, res) => {
  const { userId, amount } = req.body;
  const { error, message } = await userWalletService.updateBalance(userId, amount);
  res.status(error ? 400 : 200).json({ message, error });
});

// Export the controller
export default userWalletController;