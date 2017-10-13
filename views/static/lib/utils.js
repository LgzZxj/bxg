define(function(){
    return {
        //功能： 将url中所有的参数信息，转换成对应的对象
        //以后获取指定的参数内容的时候，直接访问对象的属性即可！
        getQueryObj: function (){
            //?key=value&key=value  转成对象
            var kvp = location.search.slice(1).split("&");

            var result = {};
            for(var i = 0; i < kvp.length; i++){
                var kv = kvp[i].split("=");
                result[kv[0]] = kv[1];
            }
            return result;
        },
        getQuery: function (key){
            return this.getQueryObj()[key];
        }
    }
})