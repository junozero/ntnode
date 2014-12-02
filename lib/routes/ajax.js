var model = require('../services/base');

function check(req, res, callback) {
    if(!req.session.islogin) {
        console.log('调试日志：新用户');
        req.session.islogin = true;
    } else {
        console.log('调试日志：不是新用户');
    }
    callback();
}

module.exports = function(app) {
    //base add Model Service
    app.get('/base/add', function(req, res) {
        model.save(req.query, function(err, json) {
            if(err) {
                res.json({error: err});
                return;
            }
            res.json({success: 1, data: json});
        });
    });

    //base update Model Service
    app.get('/base/update', function(req, res) {
        model.update(req.query, function(err, json) {
            if(err) {
                res.json({error: err});
                return;
            }
            res.json({success: 1, data: json});
        });
    });

    //base get model Service
    app.get('/base/get', function(req, res) {
        check(req, res, function() {
            model.get(req.query, function(err, json) {
                if(err) {
                    res.json({error: err});
                    return;
                }
                res.json({success: 1, data: json});
            });
        });
    });

    //base remove model Service
    app.get('/base/remove', function(req, res) {
        check(req, res, function() {
            model.remove(req.query, function(err, json) {
                if(err) {
                    res.json({error: err});
                    return;
                }
                res.json({success: 1, data: json});
            });
        });
    });

    //base get list Service
    app.get('/base/list', function(req, res) {
        check(req, res, function() {
            model.list(req.query, function(err, json) {
                if(err) {
                    res.json({error: err});
                    return;
                }
                res.json({success: 1, data: json});
            });
        });
    });
};
