/*
* This file contains the following routes:
* 1. /            renders index.ejs
* 2. /incrcount   increments the count and sends a message
* 3. /getcount    gets the latest value of the counter
*/

module.exports = function(app, redisClient) {

		app.post('/incrcount', function(req, res){
			console.log("POST ID:"+req.body.id);
			var counter_id = req.body.id;
			redisClient.incr(counter_id, function(err, value){
					if(err){
						throw err;
					}else{
						redisClient.publish("countchannel",counter_id);
					}
				}
			);
			res.setHeader('content-type', 'text/plain');
			res.send(200);
		});

		app.get('/getcount', function(req, res){
			console.log("GET ID:"+req.query.id);
			var counter_id = req.query.id;
			redisClient.get(counter_id, function(err, value){
					if(err){
						throw err;
					}else{
						console.log(value);
						res.setHeader('content-type', 'text/plain');
						res.send(200, value);
					}
				}
			);
		});

    app.get('/', function(req, res) {
			res.render('index.ejs'); // load the index.ejs file
    });
};
