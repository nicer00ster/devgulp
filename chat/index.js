var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(9000, err => {
    if (err) throw err;
    console.log('△ Chat Server Ready on http://localhost:9000');
});

io.on('connection', async function(socket) {
    let token = socket.handshake.query.token;
    let users = {};

    console.log(token);

    if (token) {
        // 1. Validate the user by making sure he token is still valid.
        const userData = axios({
            method: 'post',
            url: 'http://localhost:8000/wp-json/simple-jwt-authentication/v1/token/validate',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                const {data} = res.data;
                if (data.status === 200) {
                    // 2. If it is, move on to fetching the users data.
                    return axios({
                        method: 'get',
                        url: `http://localhost:8000/wp-json/wp/v2/users/${data.user_id}`,
                    });
                }
            })
            .then(user => user);

        const user = await userData.then(user => user);

        users[user.data.id] = {
            ...user.data,
            last_seen: Date.now(),
        };

        console.log('a user connected', user.data.name);
        console.log('current users', users);

        socket.on('disconnect', function () {
            console.log('user disconnected');
            delete users[user.data.id];
            console.log('current users', users);
        });
    }
});
