/**
 * Created by JuNoZero on 2014-11-25.
 */
var exec = require('child_process').exec,
    domain = require('domain'),
    settings = require('./setting'),
    mongojs = require('mongojs'),
    db,
    path = require('path'),
    errorMessage = '数据库操作失败，错误原因：';

function startDB(appname) {
    //init mongojs
    db = mongojs(settings.host + ':' + settings.port + '/' + appname);

    //set dbpath
    var dbpath = __dirname + path.sep + '..' + path.sep + '..' + path.sep + 'db' + path.sep;

    //create db directory
    exec('mkdir ' + dbpath + path.sep + appname);

    //利用nodejs子线程启动mongodb数据库。
    exec(dbpath + 'bin' + path.sep + 'mongod.exe --dbpath ' + dbpath + path.sep + appname + path.sep);
}

function todo(callback) {
    var d = domain.create();
    d.add(db);

    d.on('error', function(err) {
        console.log(errorMessage + err.message);
    });

    d.run(callback);
}

module.exports = {
    startDB: startDB,

    save: function(tablename, data, callback) {
        todo(function() {
            var model = db.collection(tablename);
            model.save(data, function(err, entity) {
                if(err) {
                    return callback(err.message);
                }
                callback(null, entity);
            });
        });
    },

    update: function(tablename, query, data, callback) {
        todo(function() {
            var model = db.collection(tablename);
            model.findAndModify({
                query: query,
                update: {$set: data}
            }, function(err, entity) {
                if(err) {
                    return callback(err.message);
                }
                callback(null, entity);
            });
        });
    },

    get: function(tablename, field, value, callback) {
        todo(function() {
            var model = db.collection(tablename),
                query = {};

            query[field] = value;
            model.findOne(query, function(err, m) {
                if(err) {
                    return callback(err.message);
                }
                callback(null, m);
            });
        });
    },

    remove: function(tablename, query, callback) {
        todo(function() {
            var model = db.collection(tablename);
            model.remove(query, function(err, m) {
                if(err) {
                    return callback(err.message);
                }
                callback(null, m);
            });
        });
    },

    list: function(tablename, query, callback) {
        todo(function() {
            var model = db.collection(tablename);
            model.find(query, function(err, rows) {
                if(err) {
                    return callback(err.message);
                }
                callback(null, rows);
            });
        });
    },

    page: function(tablename, query, pagenum, pagesize, callback) {
        todo(function() {
            //TODO
        });
    }
};