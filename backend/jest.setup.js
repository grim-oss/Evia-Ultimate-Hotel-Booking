// Setup environment variables for tests
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
process.env.REDIS_URL = 'redis://localhost:6379';

// Mock external services – use correct relative paths
jest.mock('./src/infrastructure/database', () => ({
  getPool: jest.fn(),
  createDatabaseConnection: jest.fn(),
}));

jest.mock('./src/infrastructure/redis', () => ({
  getRedis: jest.fn(),
  createRedisClient: jest.fn(),
}));