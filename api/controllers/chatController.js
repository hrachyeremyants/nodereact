'use strict';


const mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

exports.list_all_tasks = function(req, res) {
    Chat.find({}, function(err, chat) {
        let obj = {};
        if (err)
            res.send(err);
        obj.data = chat;
        res.json(obj);
    });
};




exports.create_a_task = function(req, res) {
    var new_task = new Chat(req.body);
    new_task.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function(req, res) {
    Chat.findById(req.params.chatId, function(err, chat) {
        var obj = {};
        if (err)
            res.send(err);
        obj.data = chat;
        res.json(obj);
    });
};


exports.update_a_task = function(req, res) {
    Chat.findOneAndUpdate({_id: req.params.chatId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function(req, res) {
    Chat.remove({
        _id: req.params.chatId
    }, function(err, chat) {
        console.log(chat);
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};
