//博客前台首页
const { Article } = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res)=>{
	//获取客户端请求的page页数
	let page = req.query.page||1;
	//每一页显示的数据条数
	let pagesize = 8;
	//查询用户数据的总数
	let count = await Article.countDocuments({});
	//总页数
	let total = Math.ceil(count/pagesize);
	//页码对应的数据查询开始位置
	let start = (page-1)*pagesize;

	//多集合联合查询 使用populate方法
	//数据库中查询数据
	//populate方法返回mongoose document对象而非json对象需要用lean方法转换
	//By default, Mongoose queries return an instance of the Mongoose Document class. 
	//Documents are much heavier than vanilla JavaScript objects, 
	//because they have a lot of internal state for change tracking. 
	//Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document 
	//and just give you the POJO(plain old javascript object).
	let results = await Article.find({}).limit(pagesize).skip(start).populate('author').lean();

	//str_res = JSON.stringify(results);
	//res.send(results);
	//console.log(typeof str_res);
	//渲染模板

	res.render('home/default', {
		results: results,
		page: page,
		total: total
	});
}

/*
	
		
	,{
		results: results,
		page: page,
		total: total
	});
*/