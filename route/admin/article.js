//将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
	//接收客户端传递过来的页码
	const page = req.query.page;
	//添加标识属性并开放到模板当中 表示当前访问的是文章管理页面
	req.app.locals.currentLink = 'article';
	//查询所有文章数据 以数组形式存储
	//author 需要多集合联合查询 使用populate方法
	//page方法指定当前页
	//size方法指定每页显示的数据条数
	//display方法指定客户端显示的页码数量
	//exec方法向数据库发送查询请求
	let articles = await Article.find({}).populate('author').lean();
	//渲染文章列表页面模板
	//res.send(articles);
	//res.send(JSON.parse(articles));
	res.render('admin/article.art', {
		articles: articles
	});
};