import { Request, Response, NextFunction } from 'express';
import { getRedis } from '../infrastructure/redis';

/**
 * Simple rate limiter: max 100 requests per IP per 15 minutes.
 */
export async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const key = `rate:${ip}`;
  const redis = getRedis();
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, 15 * 60); // 15 minutes
  }
  if (current > 100) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }
  next();
}