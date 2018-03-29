$(function(){

    $("#banner").owlCarousel({
        items:1,
       autoplay:true,
       autoplayTimeout:2000,
        loop:true,
        autoplayHoverPause:true
    });

    $("#tabs li").mouseover(function(){
        var index=0;
        $(this).addClass("active").siblings().removeClass();
        index = $(this).index();
        $("#columnsTab #content div").eq(index).addClass("conShow").siblings().removeClass("conShow");
    });

    $("#columnsTab #content ul li").mouseover(function(){
        // $(this).stop(true).animate({width:800},500).siblings().stop(true).animate({width:160},500);

    });



});