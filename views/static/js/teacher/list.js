define(["jquery", "template", "bootstrap"], function($, template){
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

    //给所有的查看按钮注册点击事件 (委托)
    $("#teacher-list").on("click", ".btn-checkinfo", function(){

        //1. 从后台获取当前行讲师的信息
        // 先要获取当前行讲师的 tc_id
        var id = $(this).parent().data("id")
        $.ajax({
            url: "/api/teacher/view",
            data: {tc_id: id},
            success: function(data){
                //将获取到信息渲染到模态框中
                if(data.code == 200){
                    console.log(data);
                    
                    var html = template("teacher-info-tpl", data.result);
                    $("#teacher-info").html(html);

                    //2. 打开模态框
                    $("#teacherModal").modal("show");
                }
            }
        })
    })


    //讲师注销和启用功能的实现：
    
    //讲师账号的状态：
    //已启用： tc_status == 0     按钮： 注销
    //已注销： tc_status == 1     按钮： 启用

    $("#teacher-list").on("click", ".btn-status", function(){
        //向后台发送请求
        var id = $(this).parent().data("id");
        var status = $(this).data("status");

        var that = this;

        $.ajax({
            url: "/api/teacher/handle",
            type: "post",
            data: {
                tc_id: id,
                tc_status: status
            },
            success: function(data){
                console.log(data);
                if(data.code == 200){
                    var enable = data.result.tc_status == 0
                    //在请求成功之后，
                    //1. 更改按钮的文字
                    //2. 更改按钮的样式
                    //3. 更改按钮中的自定义属性data-status的值
                    $(that)
                        .text(enable ? "注 销" : "启 用")
                        .removeClass(enable ? "btn-success": "btn-warning")
                        .addClass(enable ? "btn-warning": "btn-success")
                        .data("status", data.result.tc_status)
                }
            }
        })
    })
})


