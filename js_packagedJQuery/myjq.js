//模拟jq库的编写

//用面向对象封装功能的时候，要创建对象才可以实现各种方法，而封装库的时候，直接写一个匿名函数的自我执行，然后返回一个对象，这样就可以用现成的对象来进行操作了

;(function(){



    var jQuery = function(selector){

        //返回一个原型中的init方法，这样使用$()或者jQeury()方法的时候，实际上就是在调用原型中的init方法
        //不要忘记这里也要传入参数
        return new jQuery.prototype.init(selector);
    };


    //由选择器init来调用的函数，由于querySelectorAll函数返回的是节点对象的数组，因此要用一个函数将这个数组转化为对象
    //传入两个参数，第一个参数是节点元素数组，第二个参数是存放元素的init对象
    var markArray = function(arr,that){
        var arrObj = that;
        /*这里用for循环让arrobj来接收数组，arrObj[i]=arr[i]就代表key为i，value为arr[i]，最后结果为
        {
            0:arr[0],
            1:arr[1],
            2:arr[2],
            ...
            i:arr[i],
        }*/
        //此外，还要手动给对象设置Length
        for(var i=0; i<arr.length; i++){
            arrObj[i] = arr[i];
        }
        arrObj.length = arr.length;
        return arrObj;
    };

    jQuery.prototype = {

        //init函数用来做选择器
        init:function(selector){

            var doms;
            if(typeof selector != "string"){
                //如果参数不是字符串，那么直接把参数放入数组中，赋值给doms
                doms =  [selector];
            }else{
                //querySelectorAll方法的参数和getElementByXX的参数不同，这里选用这个函数;此外，这个函数返回的是数组，不是对象
                doms = document.querySelectorAll(selector);
            }

            return markArray(doms,this);
        },

        hover:function(over,out){
            //由于this是init对象，而不是节点对象，因此不能直接用Init来调用事件
            this[0].onmouseover = over;
            this[0].onmouseout = out;
            return this;
        },

        css:function(attr,val){

            var arg = arguments.length;
            if(arg == 2){
                //当参数为两个的时候，设置属性
                for(var i=0; i<this.length; i++){
                    this[i].style[attr] = val;
                }
            }else{
                //否则就是获取属性
                if(this[0].currentStyle){
                    return this[0].currentStyle[attr];
                }else{
                    return getComputedStyle(this[0],null)[attr];
                }
            }
            return this;
        },

        //一定要想清楚，返回的对象什么时候用this 什么时候用$(this)
        // 虽然两者都是init对象，但是后者是前者对象中的元素经过包装后的init对象，只有这样才可以链式地使用jq方法，如果直接返回元素节点对象，是不能使用jq方法的
        first:function(){
            return $(this[0]);
        },

        last:function(){
            return $(this[this.length-1]);
        },

        eq:function(index){
            return $(this[index]);
        },

    };

    //这应该是一种利用原型链实现的继承吧？这样一来，init对象就可以使用jquery原型中的所有方法了，包括他自身。
    jQuery.prototype.init.prototype = jQuery.prototype;

    //只有先把函数Jquery给全局变量的jquery和$，才可以在全局环境中直接调用jquery或者$
    window.jQuery = window.$ = jQuery;



})();

/*

$等于jQuery
$()等于节点选择器
$().fu()意味着$()方法返回了一个对象，使得链式变成可以得到实现

*/
