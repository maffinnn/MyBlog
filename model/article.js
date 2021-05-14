//引入mongoose模块
const mongoose = require('mongoose');
//创建文章集合规则
const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		maxlength: 100,
		minlength: 1,
		//数组第二项是error message
		required: [true, '请填写文章标题']
	},
	//将文章集合中的作者和用户集合中的作者相关联
	//在author这个字段里面其实存贮的是User集合中的_id字段
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, '请添加作者']
	},
	publishDate: {
		type: Date,
		default: Date.now
	},
	cover: {
		type: String,
		default: null
	},
	content: {
		type: String
	}
	
});

//根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

//将集合规则作为模块成员导出
module.exports = {
	Article: Article
}