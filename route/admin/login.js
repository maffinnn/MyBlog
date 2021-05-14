 //导入用户集合构造函数
const { User } = require('../../model/user.js');
//引入bcrypt第三方模块
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
	//console.log('post /login');
	//接受请求参数
	//对请求参数二次验证
	//客户端的验证不是100%安全的
	//浏览器可以禁用js代码执行
	//如果客户端禁用了javascript代码的执行 之前前端的验证就失效了
	const {email, password} = req.body;//在app.js 文件中使用了body-parser模块分析post请求参数
	//如果用户没有输入邮件地址或没有输入密码
	if(email.trim().length === 0||password.trim().length === 0){
		//渲染模板
		return res.status(400).render('admin/common/error', {msg: '邮件地址或者密码错误'});
	};
	//根据邮箱地址查询用户信息 
	//在ECMA6 中规定 如果一个对象中的属性的名字和值得名字相同可以只写一个
	//findOne 如果查询到了则返回user对象类型 对象中存储的是用户信息
	//如果没查询到则返回空
	let user = await User.findOne({email: email});
	if (user){
		//查询到了用户
		//将客户端传递过来的密码和数据库中的用户密码进行比对
		//bcrypt.compare()方法来对明文密码和数据库中加密密码进行比对
		//返回true 比对成功
		//返回false 比对失败
		let isValid = await bcrypt.compare(password, user.password);
		//如果密码比对成功
		if(isValid){
			//登录成功
			//将用户登录信息存储在session中(由expres-session模块添加)
			req.session.username = user.username;
			req.session.role = user.role;
			//res.send("登录成功");
			//将用户信息数据开放到模板当中
			//在req下面拿到的app就是app.js中的app对象
			req.app.locals.userInfo = user;
			//对用户的角色进行判断
			if (user.role === 'admin'){
				//跳转到用户列表页面
				res.redirect('/admin/user');
			} else {
				//普通用户直接跳转到博客首页
				res.redirect('/home/');
			}


		} else {
			//密码错误
			res.status(400).render('admin/common/error', {msg:'邮箱地址或者密码错误'});
		}

	}else{
		//没有查询到用户
		//渲染error page
		res.status(400).render('admin/common/error', {msg:'邮箱地址或者密码错误'});
	}
}