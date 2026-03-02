import { createClient, RedisClientType } from 'redis';

let client: RedisClientType;

export async function createRedisClient(): Promise<void> {
  client = createClient({ url: process.env.REDIS_URL });
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();
  console.log('✅ Redis connected');
}

export function getRedis(): RedisClientType {
  if (!client) throw new Error('Redis not initialized. Call createRedisClient first.');
  return client;
}