const config = require('../config');
const server = require('../server/app');
const debug = require('debug')('app:bin:server');
const port = config.server_port;
// io = require('socket.io')(server);
const io = require('socket.io');
let app = server.listen(port);
io.listen(app);

// io.on('connection', function(socket) {
//     // Fire 'send' event for updating Message list in UI
//     socket.on('message', function(data) {
//         io.emit('send', data);
//     });
//
//     // Fire 'count_chatters' for updating Chatter Count in UI
//     socket.on('update_chatter_count', function(data) {
//         io.emit('count_chatters', data);
//     });
//
// });
debug(`Server is now running at http://localhost:${port}.`);


