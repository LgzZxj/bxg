$(function(){

	//如果不是在登录页面，才需要从cookie中获取用户数据然后展示在页面
	if(location.pathname != "/dashboard/login"){
		//从cookie中获取userinfo的信息
		var userinfo = $.cookie("userinfo");
		userinfo = JSON.parse(userinfo);

		//使用模板引擎将获取到的信息展示到侧边栏
		var html = template("profile-tpl", userinfo);
		$("#user-info").html(html);
	}

	
})