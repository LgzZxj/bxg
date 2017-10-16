define(["jquery", "template", "utils", "uploadify"], function($, template, utils){
    $(function(){
        //1. 获取url中的id
        var id = utils.getQuery("id");

        //2. 向后台发送请求，获取当前课程封面数据
        $.ajax({
            url: "/api/course/picture",
            data: {cs_id: id},
            success: function(data){
                if(data.code == 200){
                    // console.log(data);
                    var html = template("cover-tpl", data.result);
                    $(".steps").html(html);


                    //给选择图片按钮，加载uploadify插件
                    
                    $("#upload-btn").uploadify({
                        swf: "/views/assets/uploadify/uploadify.swf",
                        uploader: "/api/uploader/cover",
                        fileObjName: "cs_cover_original",
                        buttonText: "选择图片",
                        buttonClass: "btn btn-success btn-sm",
                        itemTemplate: "<p></p>",
                        width: 70,
                        height: 30,
                        formData: {cs_id: id},
                        onUploadSuccess: function(file, data, response){
                            data = JSON.parse(data);
                            if(data.code == 200){
                                // console.log(data);
                                //上传图片成功之后，需要将后台返回的图片的地址
                                //赋值给页面中原图标签
                                $(".preview>img").attr("src", data.result.path);

                                //将裁切按钮设置为启用状态
                                $("#crop-btn").prop("disabled", false);
                            }
                        }
                    });

                    //由于uploadify插件生成的按钮默认有一个line-height 是30px
                    //会导致文字显示不正常，所以我们通过jquery直接将其修改为正常的样式1.5
                    $("#upload-btn-button").css("line-height", 1.5)
                }
            }
        })

    })
})