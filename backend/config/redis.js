const redis = require('redis');
const dotenv = require('dotenv').config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});
async () => {
  // Connect to Redis
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  await redisClient.connect();
  console.log('La connexion a redis été établie avec succès.');

  await connectDB();
  console.log('La connexion a la base de données été établie avec succès.');
};
module.exports = redisClient;
