define(["jquery", "template", "cookie"], function($, template){
	$(function(){

		//如果不是在登录页面，才需要从cookie中获取用户数据然后展示在页面
		if(location.pathname != "/dashboard/login"){

			//判断用户是否已经登录，如果没有登录，就让其跳回到登录页面
			//注意：正常的工作项目中，判断用户是否已经登录，是后台提供一个接口
			//我们向后台发送请求，后台会返回登录状态信息

			//当前项目中，由于接口不够完善，我们没有接口可以用来判断用户是否已经登录
			//暂时，先依据cookie中是否存有phpsessid来确定用户是否已经登录

			if(!$.cookie("PHPSESSID")){
				location.href = "/dashboard/login"
			}


			//从cookie中获取userinfo的信息
			var userinfo = $.cookie("userinfo");
			userinfo = JSON.parse(userinfo);
	
			//使用模板引擎将获取到的信息展示到侧边栏
			var html = template("profile-tpl", userinfo);
			$("#user-info").html(html);
		}


		//给退出登录按钮注册点击事件
		$("#btn-logout").click(function(){
			//向后台发送退出登录的请求
			$.ajax({
				url: "/api/logout",
				type: "post",
				success: function(data){
					if(data.code == 200){
						//跳转到登录页面
						location.href = "/dashboard/login"
					}
				}
			})
		})
	})
})