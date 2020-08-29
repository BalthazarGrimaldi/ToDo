'use strict';
var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    Task = mongoose.model('Tasks');


var sockets= null;

exports.setSockets= function(s){
    sockets = s;
    sockets.on("connection", (client)=>{
       var userInfo =  jwt.decode(client.handshake.query.token);
       if(userInfo!==null){
           console.log(userInfo.email+" is connected");
       }
    });
};

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
    sockets.local.emit("createTask", {user: jwt.decode(req.headers.authorization).name, 
                                      taskName: req.body.name});
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
    sockets.local.emit("updateTask", {user: jwt.decode(req.headers.authorization).name, 
                                      taskName: task.name});
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
      console.log(task)
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
    sockets.local.emit("deleteTask", {user: jwt.decode(req.headers.authorization).name, 
                                      taskName: task.name});
  });
};


