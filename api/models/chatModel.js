'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChatSchema = new Schema({
    message: {
        type: String,
        required: 'enter messages'
    }
});

module.exports = mongoose.model('Chat', ChatSchema);