function serializeToJson(form) {
	var result = {};
	console.log("found common.js");
	//获取到表单中用户输入的内容
	//对象数组 [{name: 'email', value: '用户输入的内容'}]
	//name 属性是表单的name属性， 而value是用户输入的内容
	var f = form.serializeArray();
	//console.log(f);
	//将serialise返回的数组对象转化为我们需要的对象
	//{email: 'zhangsan@email.com', password:'124566'}
	f.forEach(function(item) {
		//==result.email
		result[item.name] = item.value;
	});
	
	return result;
}