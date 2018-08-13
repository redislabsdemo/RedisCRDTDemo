/*
* Listens to "countchannel" to get message updates. Upon receiving the message,
* the program reads the latest value of counter from Redis (using RedisClient)
* and updates all the web applications by calling io.emit().
*/


module.exports.listen = function(redisSub, redisClient, io) {
  redisSub.subscribe("countchannel");

  redisSub.on("message", function (channel, counter){
    console.log("Sub channel: "+channel+": "+counter);
    redisClient.get(counter, function(err, value){
        if(err){
          throw err;
        }else{
          console.log("Counter: "+value);
          io.emit(counter, value);
        }
      });
  });
};
