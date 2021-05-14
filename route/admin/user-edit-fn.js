
//引入用户集合的构造函数
const { User, validateUser } = require('../../model/user.js');
//引入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next)=>{
	//验证
	try{
		await validateUser(req.body);
	}catch(ex){
		//验证没有通过
		//重定向到用户添加		//ES6 模板字符串方式拼接错误信息
		//res.redirect(`/admin/user-edit?message=${ex.message}`);
		//next方法只接受一个string的参数
		//JSON.stringify()将对象类型转换为字符串类型数据
		return next(JSON.stringify({path:'/admin/user-edit?', message: ex.message}));
	}
	//根据邮箱地址查询用户是否存在
	let user = await User.findOne({email: req.body.email})
	//如果用户已经存在 邮箱地址已经被别人占用了
	if (user){
		return next(JSON.stringify({path: '/admin.user-edit', message: '邮箱地址已经被别人占用了'}));
	}

	//成功 对添加用户密码加密
	//生成随机字符串
	const salt = await bcrypt.genSalt(10);
	//加密
	const password = await bcrypt.hash(req.body.password, salt);
	//替换密码
	req.body.password = password;

	//将用户信息添加到数据库
	await User.create(req.body);
	//将页面重定向到用户列表页面
	res.redirect('/admin/user');
	//根据邮箱地址查询
	res.send(req.body);
}