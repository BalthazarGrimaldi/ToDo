require('localenv');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    bodyParser = require('body-parser'),        
    server = require('http').createServer(app);
 
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);


var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var authCheck = require("./services/authentification");
app.use(authCheck);


var jwt = require('jsonwebtoken');
var io = require('socket.io')(server);
io.use((socket, next) => {
  if (jwt.decode(socket.handshake.query.token)) {
    return next();
  }
  return next(new Error('authentication error'));
});

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app, io.sockets); //register the route


server.listen(port);

console.log('todo list RESTful API server started on: ' + port);
