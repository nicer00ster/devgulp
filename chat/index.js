const app = require('http').createServer();
const axios = require('axios');
const io = require('socket.io')(app);
const fs = require('fs');

app.listen(9000, err => {
    if (err) throw err;
    console.log('△ Chat Server Ready on http://localhost:9000');
});

let users = {};

io.on('connection', function(socket) {
    const { name, userId } = socket.handshake.query;

    if (userId && userId !== 'null') {
        users[userId] = {
            name: name,
            user_id: userId,
            last_seen: Date.now(),
        };

        console.log('a user connected', name);
        console.log('current users', users);

        socket.on('disconnect', function () {
            console.log('user disconnected');
            delete users[userId];
            console.log('current users', users);
        });
    }
});
