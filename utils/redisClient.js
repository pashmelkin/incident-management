const redis = require('redis');
const config = require('../config');
const port = config.redisPort;

const redisHost = process.env.REDISURL || 'localhost';
const redisPort = process.env.REDISPORT || port;

const client = redis.createClient(redisPort, redisHost);

client.on('connect', () => {
  console.log(`Redis connected to ${redisHost}:${redisPort}`);
});

client.on('error', (err) => {
  console.log(`Redis could not connect to ${redisHost}:${redisPort}: ${err}`);
});

module.exports = client;
