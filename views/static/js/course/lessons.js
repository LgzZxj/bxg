define(["jquery", "template", "utils", "bootstrap", "form"], function($, template, utils){
    $(function(){
        // 1. 获取id
        var cs_id = utils.getQuery("id");
        // 2. 发送请求获取数据
        $.ajax({
            url: "/api/course/lesson",
            data: {cs_id: cs_id},
            success: function(data){
                if(data.code == 200){
                    // console.log(data);
                    var html = template("lessons-tpl", data.result);
                    $(".steps").html(html);
                }
            }
        })


        $(".steps").on("click", ".add-btn,.edit-btn", function(){
            //获取当前按钮中的data-id属性
            var ct_id = $(this).data("id");
            var data = {};
            if(ct_id){
                //编辑
                data.title = "编辑课时";
                data.buttonText = "保 存";
                data.url = "/api/course/chapter/modify";

                $.ajax({
                    url: "/api/course/chapter/edit",
                    data: {ct_id: ct_id},
                    success: function(msg){
                        if(msg.code == 200){
                            $.extend(data, msg.result);
                            renderData();
                        }
                    }
                })

            }else{
                //添加
                data.title = "添加课时"
                data.buttonText = "添 加"
                data.url = "/api/course/chapter/add"
                renderData();
                
            }

            function renderData(){
                var html = template("lessons-edit-tpl", data);
                $(".modal-content").html(html);

                $("#chapterModal").modal("show");
            }

            
        })

        $(".modal-content").on("submit", "form", function(){

            $("form").ajaxSubmit({
                data: {
                    ct_cs_id: cs_id,
                    ct_is_free: $("#isfree").is(":checked")? "1": "0"
                },
                success: function(data){
                    if(data.code == 200){
                        $("#chapterModal").modal("hide");
                        // location.reload();
                        // 局部刷新列表数据
                        $.ajax({
                            url: "/api/course/lesson",
                            data: {cs_id: cs_id},
                            success: function(data){
                                var html = template("lesson-list-tpl", data.result);
                                $(".lessons").html(html);
                            }
                        })
                    }
                }
            })

            return false;
        })
    })
})