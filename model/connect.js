//引入mongoose第三方模块
const mongoose = require('mongoose');
//导入config模块
const config = require('config');
//连接数据库
//'mongodb://maffinnn:Sally991210*@localhost:27017/blog'
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {useNewUrlParser: true})
	.then(()=> console.log('Database is connected...'))
	.catch(()=> console.log('Database connection failed...'));




