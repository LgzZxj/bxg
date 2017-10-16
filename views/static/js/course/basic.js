define(["jquery", "template", "utils", "ckeditor", "form"], function($, template, utils, CKEDITOR){
    $(function(){
        //1. 从url中获取用户传入id
        var id = utils.getQuery("id");
        // alert(id);

        //2. 向后台发送ajax请求，获取当前要编辑的课程的基本信息
        $.ajax({
            url: "/api/course/basic",
            data: {
                cs_id: id
            },
            success: function(data){
                if(data.code == 200){
                    console.log(data);
                    var html = template("basic-tpl", data.result);
                    $(".steps").html(html);

                    CKEDITOR.replace("cs_brief");
                }
            }
        })


        $(".steps").on("submit", "form", function(){

            $(this).ajaxSubmit({
                url: "/api/course/update/basic",
                type: "post",
                data: {cs_id: id},
                success: function(data){
                    if(data.code == 200){
                        // console.log(data);
                        location.href = "/course/cover?id=" + data.result.cs_id;
                    }
                }
            })

            return false;
        })
    })
})