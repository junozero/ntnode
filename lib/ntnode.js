/**
 * Created by JuNoZero on 2014-12-02.
 */
var path = require('path'),
    express = require('express'),
    session = require('express-session'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    ajax = require('./routes/ajax'),
    websocket = require('./routes/websocket'),
    db = require('./db/db');

//main setting
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//web services setting
ajax(app);
websocket.init(io);

//globa Error Excpetion
process.on('uncaughtException', function (err) {
    console.log('系统进程发生致命性的错误，原因：' + err);
});

function createApplication(appName, port, webpath) {
    appName = appName || 'ntnode';
    port = port || 80;
    webpath = webpath || path.join(__dirname + path.sep + '..' + path.sep + '..' + path.sep + '..' + path.sep, 'public');

    //start mongodb
    db.startDB(appName);

    //set web path
    app.use(express.static(webpath));

    return {
        app: app,
        ws: websocket,

        //main
        start: function(callback) {
            server.listen(port, callback);
        }
    }
}

//exports
module.exports = createApplication;
