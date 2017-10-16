define(["jquery", "template"], function($, template){
    $(function(){
        //1. 向后台发送请求，获取课程列表数据
        $.ajax({
            url: "/api/course",
            success(data){
                if(data.code == 200){
                    console.table(data.result);
                    //将请求到的数据，使用模板引擎渲染到页面

                    var html = template("course-tpl", data.result);
                    $(".courses").html(html);
                }
            }
        })
    })
})