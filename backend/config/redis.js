const { createClient } = require('redis');
const dotenv = require('dotenv').config();

const redisClient = createClient({
  url: process.env.REDIS_URL
});
redisClient.connect();
console.log('La connexion a redis été établie avec succès.');
redisClient.on('error', (err) => {
  console.error('Erreur de connexion à Redis:', err);
});
module.exports = redisClient;
