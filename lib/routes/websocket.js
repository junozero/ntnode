/**
 * Created by JuNoZero on 2014-11-27.
 */
var io,
    connlist = {};

module.exports = {
    init: function(socketio) {
        io = socketio;

        io.on('connection', function (client) {
            var id = client.id;
            connlist[id] = {
                client : client
            };

            client.on('login', function(data) {
                client.broadcast.emit('ws_in', data);
                connlist[id].username = data.username;
            });

            client.on('disconnect', function () {
                if (connlist[id].username) {
                    client.broadcast.emit('ws_out', {
                        username: connlist[id].username
                    });
                }
                delete connlist[id];
            });

            client.on('message', function (data) {
                client.broadcast.emit('ws_message',{
                    username: connlist[id].username,
                    text: data.text
                });
            });
        });
    },

    broadall: function(event, data) {
        io.emit(event, data);
    }
}