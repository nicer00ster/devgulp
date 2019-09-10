const types = require('./constants');
const chalk = require('chalk');
const util = require('util');
const app = require('http').createServer();
const axios = require('axios');
const io = require('socket.io')(app);
const fs = require('fs');

app.listen(9000, err => {
    if (err) throw err;
    console.log(chalk.green.bold('△ DevGulp Chat Service Ready on http://localhost:9000'));
});

let users = {};

io.on('connection', function(socket) {
    const { name, userId } = socket.handshake.query;

    if (userId && userId !== 'null') {
        socket.on(types.CLIENT_CONNECTION, client => {
            console.log('a client has connected: ', client);
            users[userId] = {
                name: name,
                user_id: parseInt(userId),
                last_seen: Date.now(),
            };
            io.emit(types.SERVER_CONNECTION, client);
            console.log(chalk.yellow.bold('Current online users: ', util.inspect(users, false, null, true)));
        });

        socket.on(types.CLIENT_DISCONNECTION, client => {
           console.log('A client has disconnected: ', client);
           socket.disconnect(true);
           io.emit(types.SERVER_DISCONNECTION, 'User is offline.');
           delete users[userId];
           console.log(chalk.yellow.bold('Current online users: ', util.inspect(users, false, null, true)));
        });

        socket.on(types.CLIENT_CHAT_MESSAGE, function(message) {
            console.log('new message: ', message);
            io.emit('server_chat_message', message);
        });

        // socket.on('disconnect', function() {
        //     console.log('user disconnected');
        //     delete users[userId];
        //     console.log('current users', users);
        // });
    }
});
