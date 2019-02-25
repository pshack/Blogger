var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/blogger2';
mongoose.connect(dbURI);

//Monitor and report when darabase is connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

//Monitor and report error connecting to database
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

//Monitor and report when database is disconnected 
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

//Closes (disconnects) from Mongoose DB pon shutdown
gracefulShutdown = function (msg, calback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' +msg);
    callback();
  });
};

//For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
}); });

//For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
}); });

//For Heroku app termination 
process.once('SIGTERM', function () {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
}); });

require('./blogs');
