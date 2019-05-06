var passport = require('passport'); 
var mongoose = require('mongoose'); 
var User = mongoose.model('User'); 
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    console.log("Registering");
    if(!req.body.name || !req.body.email || !req.body.password) {
	sendJSONresponse(res, 400, {
	    "message": "All fields required"
	});
	return;
    }
    console.log("Registering2");
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    console.log("Registering3");
    user.save(function(err) {
	var token;
	if (err) {
	    console.log("Error: " + err);
	    sendJSONresponse(res, 404, err);
	} else {
	    console.log("Generate Problem!!");
	    token = user.generateJwt();
	    sendJSONresponse(res, 200, {
		"token" : token
	    });
	}
    });
};
module.exports.login = function(req, res) {
    if(!req.body.email || !req.body.password) {
	sendJSONresponse(res, 400, {
	    "message": "All fields required"
	});
	return;
    }
    passport.authenticate('local', function(err, user, info){
	var token;
	if (err) {
	    sendJSONresponse(res, 404, err);
	    return;
	}
	if(user){
	    token = user.generateJwt();
	    sendJSONresponse(res, 200, {
		"token" : token
	    });
	} else {
	    sendJSONresponse(res, 401, info);
	}
    })(req, res);
};

/* GET a list of all users */ 
module.exports.userList = function(req, res) {
    console.log('Getting user list');
  User
	.find()
	.exec(function(err, results) {
            if (!results) {
		sendJSONresponse(res, 404, {
		    "message": "no users found"
		});
		return;
            } else if (err) {
		console.log(err);
		sendJSONresponse(res, 404, err);
		return;
            }
            console.log(results);
            sendJSONresponse(res, 200, buildUserList(req, res, results));
	});
};
var buildUserList = function(req, res, results) {
    var users = [];
    results.forEach(function(obj) {
	users.push({
	    email: obj.email
	});
    });
    return users;
};

