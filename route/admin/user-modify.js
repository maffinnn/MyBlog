const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next)=> {
	//res.send(req.body);
	//接收客户端传递过来的请求参数
	//即将要修改的用户id 
	const id = req.query.id;

	//根据id查询用户信息
	let user = await User.findOne({_id: id});
	const isValid = await bcrypt.compare(req.body.password, user.password);
	if (isValid){
		//res.send('密码比对成功');
		//密码比对成功
		//将用户信息更新到数据库中
		await User.updateOne({_id: id}, {
			username: req.body.username,
			email: req.body.email,
			role: req.body.role,
			status: req.body.status
		});
		//将页面重定向到用户列表页面
		res.redirect('/admin/user');

	}else{
		//密码比对失败 触发错误处理中间件
		let obj = {path: '/admin/user-edit', message:'密码错误', id: id};
		next(JSON.stringify(obj));

	}

}