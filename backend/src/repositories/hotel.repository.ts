import { getPool } from '../infrastructure/database';

export interface Hotel {
  id: string;
  name: string;
  location: string;
}

export interface Room {
  id: string;
  hotelId: string;
  type: string;
  pricePerNight: number;
  available: boolean;
}

export class HotelRepository {
  async findRoomById(roomId: string): Promise<Room | null> {
    const pool = getPool();
    const result = await pool.query('SELECT * FROM rooms WHERE id = $1', [roomId]);
    return result.rows[0] || null;
  }
}