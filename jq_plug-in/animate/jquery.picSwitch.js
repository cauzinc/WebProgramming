;(function($){
    $.fn.picSwitch = function(options){
        var defaults = {
            autoScroll:true,    //是否可以运动，默认为是
            numControl:false,   //是否由数字来进行控制
            arrowControl:false,  //是否由箭头来进行控制
            speed:1000             //控制图片移动的速度
        };

        var settings = $.extend({},defaults,options);

        //开始写业务逻辑
        var box = $(this),  //取得调用函数的选择器，也就是div节点对象
            ul = box.find("ul"),    //在div节点对象下寻找ul节点对象
            li = ul.find("li"),     //在ul节点对象下寸照li节点对象
            img = li.find("img"),   //在li节点对象下寻找img节点对象
            width = box.width(),    //取得box的宽
            height = box.height(),  //取得box的高
            len = li.length,
            timer = null,       //定时器
            idx = 0;

        //让图片和li的宽高跟着box变化，这样一来，在css中就只用设置box（div）的宽高了
        //用add函数来同时给li和img加上样式
        li.add(img).css({
           width:width,
           height:height
        });
        ul.css({
            width:width*len,
            height:height
        });


        if(settings.autoScroll){
            timer = setInterval(picMove,settings.speed);
        }
        if (settings.numControl) {
            //在box中加入装数字的div节点，并且赋予其id nums，注意在Html中不要给其他节点nums的id
            box.append("<div id='nums'></div>");
            for (var i = 0; i < len; i++) {
                $("#nums").append("<span>" + (i + 1) + "</span>");
            }
            //鼠标移入的时候要实现两个效果：一个是给移入的span增加class，并删除其他span的class；另一个则是将ul图片的位置进行移动
            $("#nums").find("span").on("mouseover", function () {
                $(this).addClass("active").siblings().removeClass("active");
                idx = $(this).index();

                ul.animate({left: -(width * idx)}, settings.speed);
            });
        }

        if(settings.arrowControl){
            //在box中加入装数字的div节点，并且赋予其id arrows，注意在Html中不要给其他节点arrows的id
            box.append("<div id='arrows'></div>");
            //加入两个span，分别赋予其左右箭头的class
            $("#arrows").append("<span class='leftBtn'>" + "<" + "</span>");
            $("#arrows").append("<span class='rightBtn'>" + ">" + "</span>");

            //鼠标点击的时候要实现的效果：按左箭头则让图片向左移动（left值正向移动），右箭头则相反
            $("#arrows").find(".leftBtn").on("click",function(){
                idx--;
                if(idx<0){
                    idx=5;
                }
                ul.animate({left:-(width*idx)},settings.speed);
            });
            $("#arrows").find(".rightBtn").on("click",function(){
                picMove();
            });

        }



        box.on("mouseover",function(){
            clearInterval(timer);
        });
        box.on("mouseout",function(){
            if(settings.autoScroll){
                timer = setInterval(picMove,settings.speed);
            }
        });


        //控制图片移动的函数
        function picMove(){

            idx++;
            if(idx>len-1){
                idx=0;
            }
            $(box).find("span").eq(idx).addClass("active").siblings().removeClass("active");
            ul.animate({left:-(width*idx)},settings.speed);


        }

        return this;
    }
})(jQuery);