const { User } = require('../../model/user');

module.exports = async (req, res)=>{
	//添加标识属性并开放到模板当中 表示当前访问的时用户管理页面
	req.app.locals.currentLink = 'user';
	
	//通过req.query 获取浏览器地址栏里的query参数
	const { message, id } = req.query;
	if (id){
		//如果当前传递了id参数就说明当前是用户修改操作router
		//将需要修改的用户的信息渲染到页面当中
		let user = await User.findOne({_id: id});
		//渲染用户编辑页面
		res.render('admin/user-edit',{
			message: message,
			user: user,
			link: '/admin/user-modify?id='+id,
			button: '修改'
		});
	}else{
		//没有id说明新增用户操作
		res.render('admin/user-edit',{
			message: message,
			link: '/admin/user-add',
			button: '添加'
		});
		
	}

}
