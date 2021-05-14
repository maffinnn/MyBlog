//博客前台详情页面
const { Article } = require('../../model/article');
//导入评论集合构造函数
const { Comment } = require('../../model/comment');
module.exports = async (req, res)=>{
	//获取post请求中的article_id
	let article_id = req.query.id;
	//根据article_id来查询
	//find方法查询结果是一个数组
	let article = await Article.findOne({_id: article_id}).populate('author').lean();

	//查询当前文章所对应的信息
	let comments = await Comment.find({aid: article_id}).populate('uid').lean();

	res.render('home/article', {
		article: article,
		comments: comments
	});

}