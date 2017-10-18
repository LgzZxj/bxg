define(["jquery", "template", "utils", "uploadify", "jcrop", "form"], function($, template, utils){
    $(function(){
        //1. 获取url中的id
        var id = utils.getQuery("id");

        var jcrop_api = null;

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

                                //判断jcrop_api有没有内容，如果有就证明页面上已经有裁切插件在显示了，那么需要将其摧毁
                                //如果没有内容，就什么都不用做
                                jcrop_api && jcrop_api.destroy();
                                //由于jcrop自带的destory方法并不能将之前生成的缩略图移除
                                //所以我们手动将其移除
                                $(".jcrop-thumb").remove();

                                //因为重新上传图片之后，按钮得变成裁切功能
                                $("#crop-btn").text("裁切图片").data("type", "crop");
                            }
                        }
                    });

                    //由于uploadify插件生成的按钮默认有一个line-height 是30px
                    //会导致文字显示不正常，所以我们通过jquery直接将其修改为正常的样式1.5
                    $("#upload-btn-button").css("line-height", 1.5)


                    //4. 给裁切插件注册相应的事件
                    $(".preview").on("cropstart cropmove cropend", function(e, s, c){
                        $("input[name='x']").val(c.x);
                        $("input[name='y']").val(c.y);
                        $("input[name='w']").val(c.w);
                        $("input[name='h']").val(c.h);
                    })

                     //3. 给裁切按钮注册点击事件
                    $("#crop-btn").click(function(){

                        //我们在按钮中新增了一个属性data-type
                        //这个属性表示的是当前按钮的功能
                        var type = $(this).data("type");

                        //判断按钮的功能，如果是crop，那么就执行裁切的操作
                        if(type == "crop"){
                            //使用图片裁切插件
                            $(".preview>img").Jcrop({
                                setSelect: [0, 0, 200, 200],
                                aspectRatio: 2,
                                boxWidth: 400
                            }, function(){
                                jcrop_api = this;
                                var thumb = jcrop_api.initComponent('Thumbnailer', {width: 240, height: 120, container: ".thumb"})
                            })

                            $(this).text("保存图片");
                            $(this).data("type", "save")
                        }else{
                            //保存功能
                            // alert("保存")
                            $("form").ajaxSubmit({
                                url: "/api/course/update/picture",
                                type: "post",
                                data: {cs_id: id},
                                success: function(data){
                                    if(data.code == 200){
                                        location.href = "/course/lessons?id=" + data.result.cs_id;
                                    }
                                }
                            })
                        }    
                    })
                }
            }
        })

       
    })
})