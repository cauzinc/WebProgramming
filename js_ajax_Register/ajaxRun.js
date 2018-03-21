function ajaxRun(options){
    /*
    各个参数：
    method:get或者post
    url:传输对象
    data{}传输的数据对象，key:value的形式
    async：是否异步
    sucess:回调函数，当使用异步的时候，由于此时ajax不能返回数据，所以只负责把接收的服务端的数据传入该函数中，由主页面的js来负责完成业务逻辑，实现该函数功能
    */

    //创建xhr对象
    var xhr=null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //对传输的数据进行处理

    function getData(data){
        var formatStr=[];
        for(i in data){
            formatStr.push(i+"="+data[i]);
        }
        // console.log(formatStr);
        return formatStr.join("&");
    }
    var data = getData(options.data);

    //链接文件，并且发送数据
    if(options.method.toLowerCase() == "get"){
        //三个参数分别代表数据传输方式、目标、是否采用异步
        xhr.open("get", options.url+"?"+data, options.async);
        // console.log(options.url+"?"+data);
        xhr.send(null);
    }else{
        xhr.open("post", options.url, options.async);
        xhr.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    //返回信息，并且将数据传入主函数
    xhr.onreadystatechange = function(){

        if(xhr.readyState == 4 && xhr.status == 200){
            options.success(this.responseText);
        }
    };

}