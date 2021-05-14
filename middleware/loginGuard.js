const guard = (req, res, next)=>{
	//判断用户访问的是否是登录页面
	//判断用户登录的状态
	//如果用户是登录的 将请求放行
	//如果用户不是登录的 将请求重定向到登录页面
	if (req.url!='/login' && !req.session.username){
		//判断session下是否添加了username
		res.redirect('/admin/login');
	}else{
		//用户是登录状态 将请求放行 向下匹配路由
		//判断用户角色
		if(req.session.role === 'normal'){
			//普通用户跳转到首页
			//使用return阻止代码向下执行
			return res.redirect('/home/');
		} else {
			//管理员
			next();
		}

	}
}
module.exports = guard;