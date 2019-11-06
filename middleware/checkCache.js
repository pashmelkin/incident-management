const redisClient = require('../utils/redisClient');

module.exports = {

  checkCache : function(req, res, next) {
    const id  = req.query.user;

    redisClient.get(id, (err, data) => {
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
