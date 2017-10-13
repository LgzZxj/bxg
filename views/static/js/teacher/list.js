define(["jquery", "template"], function($, template){

    
    
    //注册过滤器
    //语法： template.defaults.imports.自定义的过滤器名称 = function(value){
            //value接收到的就是 | 前面的要被过滤的数据
            //这个函数需要有个返回值，返回值就是最终过滤之后的内容
    // }

    //使用过滤器
    //语法 {{数据 | 过滤器名称}}

    //最终在页面上使用这个过滤器的时候
    //{{v.tc_birthday | getage}}
    template.defaults.imports.getage = function(value){
        return new Date().getFullYear() - new Date(value).getFullYear();
    };

    //1. 向后台发送ajax请求，获取讲师列表的数据
    $.ajax({
        url: "/api/teacher",
        success: function(data) {
            if(data.code == 200){
                //将请求回来的讲师列表数据，通过模板引擎，渲染到页面中

                console.log(data.result);
                // data.result.forEach(function(v, i){
                //     v.age =  new Date().getFullYear() - new Date(v.tc_birthday).getFullYear();
                // })

                var html = template("teacher-list-tpl", data);
                $("#teacher-list").html(html);
            }
        }
    })
})


