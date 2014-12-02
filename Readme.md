#NTNODE
这是一个快速的，整体的WEB框架，但它主要面向的是**前端攻城师**，我们关注的是**public目录**下的快速开发。**但它是不安全的，它寻求的是提供快速和高效搭建web app所需的服务端框架。**


##一、安装
```
npm install ntnode --save
```

##二、Hello Word
###目录
![](http://images.54646a963df08.d01.nanoyun.com/QQ20141202165254.png)

###index.html
public/index.html
```
<!DOCTYPE html>
<html>
<head lang="zh-CN">
    <meta charset="UTF-8">
    <title>Hello Word</title>
</head>
<body>
	Hello NTNODE
</body>
</html>
```

###app.js
```
var appname = 'ntnode',
	port = 80,
	ntnode = require('ntnode')(appname, port);

ntnode.start(function() {
    console.log('Server listening on port ' + port);
});
```

###启动
```
node app.js
```

##三、数据整合的解决方案
public/index.html，作为前端工程师，我们只需要关注public目录。

###完整的demo
```
<!DOCTYPE html>
<html>
<head lang="zh-CN">
    <meta charset="UTF-8">
    <title>Hello Word</title>

    <script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>

    <script type="text/javascript">
        function add() {
            var json = {
                tablename: 'syuser',
                check: ['name'],
                checkmsg: '用户已存在，不能重复添加！',
                data: {
                    name: 'test',
                    rename: '测试',
                    age: 27
                }
            };
            service('/base/add', json, function(json) {
                if(json.success) {
                    alert('添加成功！');
                } else {
                    alert('添加失败！错误原因：' + json.error);
                }
            });
        }

        function get() {
            var json = {
                tablename: 'syuser',
                field: 'name',
                value: 'test'
            };
            service('/base/get', json, function(json) {
                if(json.success) {
                    alert(JSON.stringify(json.data));
                } else {
                    alert('获取失败！错误原因：' + json.error);
                }
            });
        }

        function mod() {
            var json = {
                tablename: 'syuser',
                query: {
                    name: 'test'
                },
                data: {
                    rename: '测试用户名称修改',
                    age: 20
                }
            };
            service('/base/update', json, function(json) {
                if(json.success) {
                    alert(JSON.stringify(json.data));
                } else {
                    alert('修改失败！错误原因：' + json.error);
                }
            });
        }

        function del() {
            var json = {
                tablename: 'syuser',
                query: {
                    name: 'test'
                }
            };
            service('/base/remove', json, function(json) {
                if(json.success) {
                    alert(JSON.stringify(json.data));
                } else {
                    alert('删除失败！错误原因：' + json.error);
                }
            });
        }

        function list() {
            var json = {
                tablename: 'syuser'
            };
            service('/base/list', json, function(json) {
                if(json.success) {
                    alert(JSON.stringify(json.data));
                } else {
                    alert('查询失败！错误原因：' + json.error);
                }
            });
        }

        function service(url, data, callback) {
            $.ajax({
                dataType: 'json',
                url: url,
                data: data,
                cache: false,
                success: function(json) {
                    callback(json);
                }
            });
        }
    </script>
</head>
<body>
    <button onclick="add()">添加</button>
    <button onclick="get()">获取</button>
    <button onclick="mod()">修改</button>
    <button onclick="del()">删除</button>
    <button onclick="list()">列表</button>
</body>
</html>
```

###添加
URL：/base/add
可直接提交json数据到/base/add进行保存，tablename为需要保存的数据表名，添加时可通过check数组对字段内容是否有重复进行检查。
```
function add() {
    var json = {
        tablename: 'syuser',
        check: ['name'],
        checkmsg: '用户已存在，不能重复添加！',
        data: {
            name: 'test',
            rename: '测试',
            age: 27
        }
    };
    service('/base/add', json, function(json) {
        if(json.success) {
            alert('添加成功！');
        } else {
            alert('添加失败！错误原因：' + json.error);
        }
    });
}
```

###获取Item
URL：/base/get
通过tablename、field和值从数据库获取对应的记录。
```
function get() {
    var json = {
        tablename: 'syuser',
        field: 'name',
        value: 'test'
    };
    service('/base/get', json, function(json) {
        if(json.success) {
            alert(JSON.stringify(json.data));
        } else {
            alert('获取失败！错误原因：' + json.error);
        }
    });
}
```

###修改
URL：/base/update
```
function mod() {
    var json = {
        tablename: 'syuser',
        query: {
            name: 'test'
        },
        data: {
            rename: '测试用户名称修改',
            age: 20
        }
    };
    service('/base/update', json, function(json) {
        if(json.success) {
            alert(JSON.stringify(json.data));
        } else {
            alert('修改失败！错误原因：' + json.error);
        }
    });
}
```

###删除
URL：/base/remove
```
function del() {
    var json = {
        tablename: 'syuser',
        query: {
            name: 'test'
        }
    };
    service('/base/remove', json, function(json) {
        if(json.success) {
            alert(JSON.stringify(json.data));
        } else {
            alert('删除失败！错误原因：' + json.error);
        }
    });
}
```

###获取list
URL：/base/list
```
function list() {
    var json = {
        tablename: 'syuser'
    };
    service('/base/list', json, function(json) {
        if(json.success) {
            alert(JSON.stringify(json.data));
        } else {
            alert('查询失败！错误原因：' + json.error);
        }
    });
}
```