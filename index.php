<?php

    //1. 要知道用户请求网页的时候连接的格式
    // http://studyit.com/index.php/文件夹名称/文件名称


    //2. 需要通过php代码获取到用户要请求的文件夹名称以及文件名

    //如果用户没有传递文件夹以及文件名的信息，我们应该让他默认显示首页

    $path = "/dashboard/index";

    // var_dump($_SERVER);
    if(array_key_exists('PATH_INFO', $_SERVER)){
        $path = $_SERVER['PATH_INFO'];
    }

    //3. 获取到文件夹名称以及文件名之后，要将文件拿到，返回给浏览器

    if(file_exists("views/".$path.".html")){
        include $_SERVER["DOCUMENT_ROOT"]."/views/".$path.".html";
    }else{
        header("HTTP/1.1 404 NotFound");
        echo "404";
    }

    //$_SERVER["DOCUMENT_ROOT"] 这个指的就是网站跟目的绝对路径

    // include $_SERVER["DOCUMENT_ROOT"]."/views/dashboard/index.html"
    // var_dump($_SERVER);
?>