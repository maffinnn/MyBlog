//将评论集合构造函数导入
const { Comment } = require('../../model/comment');

module.exports = async (req, res)=>{
	//通过req.body来接收客户端的请求参数
	const {content, aid, uid } = req.body;

	//将评论信息存储到评论集合中
	await Comment.create({
		content: content,
		aid: aid,
		uid: uid,
		time: new Date()
	});

	//将页面重定向到文章详情页面
	//每一个文章详情页面都是由aid来确定的
	res.redirect('/home/article?id=' + aid);
};