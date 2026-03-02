import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createDatabaseConnection } from './infrastructure/database';
import { createRedisClient } from './infrastructure/redis';
import authController from './controllers/auth.controller';
import bookingController from './controllers/booking.controller';
import paymentController from './controllers/payment.controller';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.send('OK'));

// API routes
app.use('/api/auth', authController);
app.use('/api/bookings', bookingController);
app.use('/api/payments', paymentController);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await createDatabaseConnection();
    await createRedisClient();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();