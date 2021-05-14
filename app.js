//引用express框架
const express = require('express');
//处理路径的模块
const path = require('path');
//创建网站服务器
const app = express();
//数据库链接
//connect模块并没有返回模块成员 不需使用变量接受
require('./model/connect');
//引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser');
//为bodyParser进行配置
//处理post请求参数 使用app.use中间件拦截所有请求
//extended 为false bodyparser将用系统模块querystring来处理请求参数
//如果为true则用qs第三方模块来处理
app.use(bodyParser.urlencoded({extended: false}));

//导入express-session模块
const session = require('express-session');
//导入art-template模板引擎
const template = require('art-template');
//导入dateformat第三方模块
const dateFormat = require('dateformat');
//导入morgan第三方模块
const morgan = require('morgan');
//导入config模块
const config = require('config');

//告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
//告诉express框架的默认后缀是什么
app.set('view engine', 'art');
//当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

//向模板内部导入dateFormat变量 对art-template全局配置
//这样就可以在art-template中调用dateFormat这个方法了
template.defaults.imports.dateFormat = dateFormat;

console.log(config.get('title'));

//拦截所有请求 并交给session进行处理
//配置session
//方法内部会为请求对象添加session属性 其值是一个对象
//这个对象可以在用户登录后保存用户信息 并生成session id
//session id 是当前存储的数据的唯一标识
//session id 存储在客户端的cookie当中 当客户端再次访问时 会拿到客户端传递的cookie
//并从cookie中提取出session id 建立联系
app.use(session({
	secret:'secret key',
	//当用户没有登录时 无需保存未初始化cookie
	saveUninitialized: false,
	//指定cookie过期时间
	//如果没有指定 则当浏览器关闭时cookie被删除即失效
	cookie: {
		//指定最大过期时间 为1天以后 如果不登录 则自动退出
		//maxAge接收时间单位为毫秒
		maxAge: 24*60*60*1000
	}
}));

//开放静态资源文件 images and css 都是静态页面可以开放
//express.static 用来处理静态资源文件
app.use(express.static(path.join(__dirname,'public')));

//获取系统环境变量 返回值是对象
if(process.env.NODE_ENV === 'development'){
	//当前是开发环境
	console.log('currently development env');
	//在开发环境中 将客户端发送到服务端的请求信息打印到控制台中
	app.use(morgan('dev'));
}else{
	//当前是生产环境
	console.log('currently production env');
}

//引入路由模块
const home  =  require('./route/home');
const admin  = require('./route/admin');

//拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next)=>{

	//将字符串对象转换为对象类型
	//JSON.parse
	const result = JSON.parse(err);
	//result结构体参数数量是不固定的 需要使用for循环来进行拼接
	//{path: '/admin/user-edit', message:'密码错误', id: id}
	//将错误信息输出在路由的get参数里
	let params = [];
	for (let attr in result){
		//path 是固定的 即每个传过来的对象中都会有path属性
		if (attr!='path'){
			params.push(attr + '=' + result[attr]);//相当于message='密码错误'
		}
	}

	//重定向到用户添加		//ES6 模板字符串方式拼接错误信息
	//当get参数有多个时 要以&符进行分隔 使用数组里的join方法 按照某一个字符进行拼接
	res.redirect(`${result.path}?${params.join('&')}`);

})


//监听端口
app.listen(80);
console.log('Server is listening...');