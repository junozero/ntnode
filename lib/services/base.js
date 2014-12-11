/**
 * Created by JuNoZero on 2014-11-26.
 */
var db = require('../db/db'),
    async = require('async');

module.exports = {
    save: function(json, callback) {
        var tableName = json.tablename,
            check = json.check || [],
            data = json.data;

        //check
        async.mapLimit(check, 1, function(field, callback) {
            var value = data[field];
            if(value) {
                db.get(tableName, field, value, callback);
            }
        }, function(err, result) {
            if(err) {
                return callback(err);
            }

            //save
            var checkPass = true;
            result.forEach(function(m) {
                if(m) {
                    checkPass = false;
                    return false;
                }
            });
            if(!checkPass) {
                return callback(json.checkmsg || 'checkerror');
            } else {
                db.save(tableName, data, callback);
            }
        });
    },

    update: function(json, callback) {
        var tableName = json.tablename,
            query = json.query,
            data = json.data;

        if(query) {
            db.update(tableName, query, data, callback);
        }
    },

    remove: function(json, callback) {
        var tableName = json.tablename,
            query = json.query;

        if(query) {
            db.remove(tableName, query, callback);
        }
    },

    get: function(json, callback) {
        var tableName = json.tablename,
            field = json.field,
            value = json.value;

        db.get(tableName, field, value, callback);
    },

    list: function(json, callback) {
        var tableName = json.tablename,
            query = json.query || {},
            sort = json.sory || {};

        if(query) {
            db.list(tableName, query, sort, callback);
        }
    },

    page: function(json, callback) {
        var tableName = json.tablename,
            query = json.query || {},
            sort = json.sort || {},
            pagenum = json.pagenum || 1,
            pagesize = json.pagesize || 20;

        if(query) {
            db.page(tableName, query, sort, pagenum, pagesize, callback);
        }
    }
};