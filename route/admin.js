//引用express框架
const express = require('express');

//创建博客展示页面路由
const admin = express.Router();

//挂载二级路由 渲染登录页面
admin.get('/login', require('./admin/loginPage.js'));

//实现登录功能
admin.post('/login', require('./admin/login.js'));

//创建用户列表路由 进入到用户列表页面
admin.get('/user', require('./admin/userPage.js'));

//实现退出功能
admin.get('/logout', require('./admin/logout.js'));

//创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit.js'));

//创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn.js'));

//实现用户修改信息功能路由
admin.post('/user-modify', require('./admin/user-modify.js'));

//删除用户功能路由
admin.get('/delete', require('./admin/user-delete.js'));

//文章列表页面
admin.get('/article', require('./admin/article.js'));
//文章编辑页面
admin.get('/article-edit', require('./admin/article-edit.js'));

//实现文章添加功能路由
admin.post('/article-add', require('./admin/article-add.js'));

//将路由对象作为模块成员进行导出
module.exports = admin;