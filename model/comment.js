//引入mongoose模块
const mongoose = require('mongoose');
//创建评论集合规则
const commentSchema = new mongoose.Schema({
	//文章id article_id
	aid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
	},
	//评论人id
	uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	//评论时间
	time: {
		type: Date
	},
	//评论内容
	content: {
		type: String
	}
});

//创建评论集合 参数1是集合名称 参数2是集合规则
const Comment  = mongoose.model('Comment', commentSchema);
//导出
module.exports = {
	Comment: Comment
}