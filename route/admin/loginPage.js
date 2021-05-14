module.exports = (req, res)=>{
	//渲染模板 参数1是模板路径 因为已经设置过了默认路径 所以这里‘admin’指的是views下面的admin
	//模板引擎要求的模板后缀是.art 需要将所有html文件后缀改为.art 这样render才能找到相应的文件
	res.render('admin/login');
}