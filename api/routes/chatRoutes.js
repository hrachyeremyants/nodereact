'use strict';

module.exports = function(app) {
    var chat = require('../controllers/chatController');

    app.route('/chat')
        .get(chat.list_all_tasks)
        .post(chat.create_a_task);


    app.route('/chat/:chatId')
        .get(chat.read_a_task)
        .put(chat.update_a_task)
        .delete(chat.delete_a_task);
};