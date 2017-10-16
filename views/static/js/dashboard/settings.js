define(["jquery", "ckeditor", "template", "uploadify", "datepicker", "datepickerCN", "region", "form"], function($, CKEDITOR, template){
    $(function(){
        //1. 向后台发送数据请求，获取当前用户的数据
        $.ajax({
            url: "/api/teacher/profile",
            success: function(data){
                if(data.code == 200){
                    // console.log(data);
                    var html = template("settings-tpl", data.result);
                    $(".settings").html(html);

                    loadPlugins();
                }
            }
        })

        
        function loadPlugins(){
            //1. 加载图片上传插件
            $("#upfile").uploadify({
                swf: "/views/assets/uploadify/uploadify.swf",
                uploader: "/api/uploader/avatar",
                fileObjName: "tc_avatar",
                height: 120,
                width: 120,
                buttonText: "",
                onUploadSuccess: function(file, data){
                    // console.log(data);
                    data = JSON.parse(data);
                    if(data.code == 200){
                        $(".preview>img").attr("src", data.result.path);
                    }
                }
            })

            //2. 日期选择插件的使用
            $("input[name='tc_birthday'],input[name='tc_join_date']").datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                language: "zh-CN"
            })

            //3. 省市区三级联动插件
            //1. 获取到省市区三个select的父元素, 调用region方法
            //2. 给省市区三个select分别加上id p c d 
            //3. 设置选中项，可以使用data-id来指定选中的内容
            $("#region").region({
                url: "/views/assets/jquery-region/region.json"
            })

            //4.富文本编辑器插件的使用
            CKEDITOR.replace("tc_introduce", {
                toolbarGroups: [
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                    // { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                    { name: 'links' },
                    { name: 'insert' },
                    // { name: 'forms' },
                    // { name: 'tools' },
                    { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                    // { name: 'others' },
                
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                    // { name: 'styles' },
                    // { name: 'colors' },
                    // { name: 'about' }
                ]
            });
        }

        $(".settings").on("submit", "form", function(){

            //如果遇到富文本编辑器编辑内容之后，无法保存的情况
            //很可能是，富文本编辑器中的内容没有同步到我们的textarea中
            //那就需要手动做一步，同步操作
            
            //CKEDITOR
            // console.log(CKEDITOR.instances)
            //下面的代码，就可以将富文本编辑器中的内容更新到textarea中！！
            // CKEDITOR.instances.content.updateElement()


            $(this).ajaxSubmit({
                url: "/api/teacher/modify",
                type: "post",
                data: {
                    tc_hometown: $("#p>option:selected").text() + "|" + $("#c>option:selected").text() + "|" +$("#d>option:selected").text()
                },
                success: function(data){
                    if(data.code == 200){
                        // console.log(data);
                        alert("个人资料更新成功")
                    }
                }
            });
            return false;
        })
    })
})