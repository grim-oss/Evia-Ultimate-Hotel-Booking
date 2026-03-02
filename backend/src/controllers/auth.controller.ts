import { Router, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();
const authService = new AuthService();

/**
 * POST /api/auth/register
 * Registers a new user with phone, password, and name.
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, password, name } = req.body;
    if (!phone || !password || !name) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    const result = await authService.register(phone, password, name);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /api/auth/login
 * Authenticates a user and returns a JWT.
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      res.status(400).json({ error: 'Phone and password required' });
      return;
    }
    const result = await authService.login(phone, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;