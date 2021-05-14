//引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
module.exports = (req, res)=>{

	//1.创建表单解析对象
	const form = new formidable.IncomingForm();
	//2.配置上传的客户端上传文件的存储位置
	//__dirname 是指当前文件的所属路径
	form.uploadDir = path.join(__dirname,'../','../', 'public', 'uploads');
	//3.保留上传文件的后缀 一般是不保留的
	form.keepExtensions = true;
	//4.解析表单 
	form.parse(req, async (err, fields, files)=>{
		//err错误对象 如果表单解析失败 err存储错误信息 如果表单解析成功 err将会是null
		//fields 对象类型 保存了普通表单数据 
		//files 对象类型 保存了跟上传文件相关的信息
		//res.send(fields);
		await Article.create({
			title: fields.title,
			author: fields.author,
			publishDate: fields.publishDate,
			//需要对上传文件路径切割 否则客户端无妨访问
			//"path" : "C:\\Node\\day09\\code\\blog\\public\\uploads\\upload_d9976763d106b64b243260232s1adq.jpg"
			//res.send(files.cover.path.split('public')[1]);
			cover: files.cover.path.split('public')[1],
			content: fields.content
		});
		
		//当提交后 将页面重定向到文章列表页面
		res.redirect('/admin/article');

	});
}
