var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var nunjucks = require('nunjucks');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var chatServer = require('./chatserver');

var app = express();
// 设置端口信息
app.set('port', (process.env.PORT || 5000));
var server = app.listen(app.get('port'), function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Running app at http://%s:%s', host, port);
});

global.server = server;
var io;
chatServer(io,server);

// 很重要，这是让相关目录中的文件被访问到的保证（Css，图片）
app.use(express.static(__dirname + '/views'));
//app.use(express.static(__dirname + '/client'));
// 解析表单用的
app.use(bodyParser.urlencoded({extended: true}));
// 解析json
app.use(bodyParser.json());
// 设定session （10分钟过期）
app.use(session({
	secret:'secret',
	resave:true,
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*10
	}
}));

// nunjucks视图引擎设置
app.set('view', __dirname + '/views');
//app.set('client', __dirname + '/client');
const env = nunjucks.configure(app.get('view'), {
	autoescape: true,
	express: app
});
//nunjucks.configure(app.get('client'), {
//	autoescape: true,
//	express: app
//});

app.set('view engine', 'nunjucks');

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);

app.get('/', (req, res) => {
    res.render('index');
});

// 错误处理
process.on('uncaughtException', (err)=>{
    console.error('Caught exception: ' + err);
    console.error(err.stack);
    //setTimeout(process.exit.bind(process, 666),1000);
});