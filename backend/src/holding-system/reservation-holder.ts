import { getRedis } from '../infrastructure/redis';

export class ReservationHolder {
  /**
   * Attempts to hold a room for a given number of minutes.
   * @param roomId - The room identifier.
   * @param minutes - Duration of hold.
   * @returns true if hold was acquired, false if already held.
   */
  async hold(roomId: string, minutes: number): Promise<boolean> {
    const redis = getRedis();
    const key = `hold:room:${roomId}`;
    const acquired = await redis.setNX(key, 'held');
    if (acquired) {
      await redis.expire(key, minutes * 60);
    }
    return acquired === true;
  }

  async release(roomId: string): Promise<void> {
    const redis = getRedis();
    const key = `hold:room:${roomId}`;
    await redis.del(key);
  }
}