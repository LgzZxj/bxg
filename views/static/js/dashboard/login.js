define(["jquery", "cookie", "form"], function ($) {
    
    $(function () {
        //1. 获取登录按钮，并注册点击事件(因为页面结构没有获取按钮的合适的选择器，我 们不用了)
        //1. 获取表单，为表单注册一个提交事件
        $("form").submit(function (e) {

            //校验用户输入的内容是否合法
            if ($("input[name=tc_name]").val().trim() == "") {
                alert("请输入用户名");
                return false;
            }

            if ($("input[name=tc_pass]").val().trim() == "") {
                alert("请输入密码");
                return false;
            }

            // //1. 获取用户的输入
            // var data = $(this).serialize();

            //2. 将用户输入的内容发送给接口api进行登录
            $(this).ajaxSubmit({
                url: "/api/login",
                type: "post",
                success: function (data) {
                    if (data.code == 200) {
                        //先将后台返回的用户的用户名以及头像信息存储到cookie中
                        //因为首页中要用到这些信息
                        //cookie又可以做到各个页面间共享数据

                        //cookie中只能存储字符串，如果要将对象存入cookie
                        //需要先将对象转成字符串，存入cookie
                        //以后用的时候，直接将存储字符串获取出来之后，再将其转成对象！
                        $.cookie("userinfo", JSON.stringify(data.result), { path: "/", expires: 365 });

                        //如果用户登录成功，则将页面跳转到首页
                        location.href = "/";
                    }
                }
            })


            //阻止默认事件，不让表单自己提交，因为我们要发送ajax请求！
            return false;
        });
    })
})
