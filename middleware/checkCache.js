const redis = require('redis');
const { port } = require('../config');

const port_redis = process.env.REDISPORT || port;
const redis_client = redis.createClient(port_redis);

module.exports = {

  checkCache : function(req, res, next) {
    const id  = req.query.user;

    redis_client.get(id, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      //if no match found
      if (data != null) {
        res.send(data);
      } else {
        //proceed to next middleware function
        next();
      }
    });
  }
}
