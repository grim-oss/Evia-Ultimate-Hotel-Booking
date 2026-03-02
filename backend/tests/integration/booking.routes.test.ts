import request from 'supertest';
import app from '../../src/server'; // need to export app without starting server
import { getPool } from '../../src/infrastructure/database';
import { getRedis } from '../../src/infrastructure/redis';

describe('POST /api/bookings', () => {
  beforeAll(async () => {
    // Setup test database (e.g., run migrations, seed data)
  });

  afterAll(async () => {
    // Cleanup
    const pool = getPool();
    await pool.end();
    const redis = getRedis();
    await redis.quit();
  });

  it('should create a booking with valid data', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        roomId: 'room_456',
        paymentMethod: 'telebirr',
        amount: 2500,
        userId: 'user_123',
        phone: '+251911223344',
        checkIn: '2025-01-01',
        checkOut: '2025-01-03',
        guests: 2,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('paymentId');
  });

  it('should return 400 for missing fields', async () => {
    const res = await request(app).post('/api/bookings').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});