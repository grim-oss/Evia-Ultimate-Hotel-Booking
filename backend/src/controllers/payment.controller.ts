import { Router, Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';

const router = Router();
const paymentService = new PaymentService();

/**
 * POST /api/payments/initiate
 * Initiates a payment with the selected provider.
 * Body: { method, amount, userId, bookingId? }
 */
router.post('/initiate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { method, amount, userId, bookingId } = req.body;
    if (!method || !amount || !userId) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    const result = await paymentService.process({ method, amount, userId, bookingId });
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;