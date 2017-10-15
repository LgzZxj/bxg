define(["utils", "jquery", "template", "form", "datepicker", "datepickerCN", "validate"], function(utils, $, template){

    //一个页面中，要实现两个功能： 添加  编辑

    //问题1： 如何判断是哪个功能
        //根据当前页面的url地址中是否有id参数被传入，就可以判断究竟是添加还是编辑
        //有就编辑
        //没有就是添加
    
    var id = utils.getQuery("id");
    var data = {};
    if(id){
        // alert("编辑功能");
        data.title = "讲师编辑";
        data.buttonText = "保 存"
        data.url = "/api/teacher/update";

        //由于是编辑功能，所以需要将当前编辑的用户的数据从后台获取回来
        //将其渲染到页面中
        $.ajax({
            url: "/api/teacher/edit",
            data: {tc_id: id},
            success: function(msg){
                if(msg.code == 200){
                    // console.log(data);
                    data.teacher = msg.result;
                    renderData();
                }
            }
        })
    }else{
        // alert("添加功能");
        data.title = "讲师添加";
        data.buttonText = "添 加";
        data.url = "/api/teacher/add";
        data.teacher = {
            tc_gender: "0"
        };
        renderData();
    }



    //问题2： 知道是哪个功能之后，如何在页面上显示不同的内容
    //将页面主体部分直接提取成模板，将两个功能中不同的项，用模板中的数据来代替
    //title 表单内容 buttonText

    function renderData(){
        var html = template("manage-tpl", data);
        $(".body.teacher").html(html);


        //使用日期选择插件
        $("input[name='tc_join_date']").datepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            language: "zh-CN"
        })

        //使用表单验证插件，为表单注册验证功能
        $("form").validate({
            onBlur: true,
            onChange: true,
            sendForm: false,
            conditional: {
                forbidden: function(value){
                    return value != "前端学院";
                }
            },
            description: {
                name: {
                    required: "用户名不能为空",
                    conditional: "不能使用前端学院",
                },
                pass: {
                    required: "密码不能为空",
                    pattern: "密码必须为6-15位的字母或数字"
                    // /((?=.\d)(?=.\D)|(?=.[a-zA-Z])(?=.[^a-zA-Z]))^.{8,16}$/
                },
                joindate: {
                    required: "入职日期不能为空"
                }
            },
            valid: function(){
                //在表单通过验证的时候会调用
                //我们要在表单验证通过的时候发送ajax请求提交表单

                //this就是这个表单的jquery对象！
                this.ajaxSubmit({
                    success: function(data){
                        if(data.code == 200){
                            location.href = "/teacher/list"
                        }
                    }
                })
                // console.log("表单通过验证了");
            },
            eachValidField: function(){
                //当表单项通过验证的时候调用
                //让当前表单项变成绿色 也就是要给爷爷元素加上一个类样式 has-success
                this.parent().parent().addClass("has-success").removeClass("has-error")
            },
            eachInvalidField: function(){
                //当表单项不通过验证的时候调用 
                //让当前表单项变成绿色 也就是要给爷爷元素加上一个类样式 has-error
                this.parent().parent().addClass("has-error").removeClass("has-success")
                
            }
        })
    }
   

    // $(".body.teacher").on("submit", "form", function(){
        
    //     return false;
    // })
})