//创建用户集合
//设定用户集合
const mongoose = require('mongoose');
//导入bcrypt
const bcrypt = require('bcrypt');
//引入joi模块
const Joi =  require('joi');

//创建集合规则
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true, 
		maxlength: 20,
		minlength: 2
	},
	email: {
		type: String,
		//保证创建时每个邮箱都是唯一的 不重复
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	//admin: 超级管理员
	//normal: 普通用户
	role: {
		type: String,
		required: true
	},
	//0 启动状态
	//1 禁用状态
	status: {
		type: Number,
		default: 0
	}
});

//创建集合
const User = mongoose.model('User', userSchema);

//再插入database之前需对用户信息进行加密操作
async function createUser(){
	const salt = await bcrypt.genSalt(10);
	const pass = await bcrypt.hash('123424e', salt);
	const user = await User.create({
		username: '想不出来昵称了',
		email: 'nihao@gmail.com',
		password: pass,
		role:'normal',
		status: 0
	});
}
//createUser();

//验证用户信息
const validateUser = (user)=>{
	//定义对象验证规则
	const schema = {
		username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
		//email 方法验证邮箱格式
		email: Joi.string().email().error(new Error('密码不符合规则')),
		//$ 标识以前面的结尾
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('邮箱格式不符合要求')),
		//valid() 作用 只有normal和admin这两个合法值
		role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
		status: Joi.number().valid(0,1).required().error(new Error('状态值非法'))
	};
	//验证
	return Joi.validate(user, schema);
}

//将用户集合作为模块成员导出
module.exports = {
	User: User,
	validateUser
};