$(document).ready(function () {


    $('.accountM').mouseenter(function (e) {
        $('.mypage').slideDown(800);
    });

    $('.accountM').mouseleave(function (e) {
        e.preventDefault();
        $('.mypage').slideUp(800);
    });


    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    });


    var aa = 1;
    if ($(window).width() > 768) {
        $('.menuUl > li').mouseenter(function () {
            $('.subbg').stop().slideDown(800);

            $('.menuUl > li').mouseleave(function () {
                $('.subbg').stop().slideUp(800);
            });
        });
    }
    else if ($(window).width() <= 768) {

      /*  $('.menuUl').addClass('menuUlM');
        $('.subbg').addClass('subbgM');*/

        $('.menuWrap').click(function () {
            if (aa == 1) {

                $('.menuUl.menuUlM').animate({
                    'left': '0'
                }, 800);

            }
            aa = 1;
            console.log('>>');
        });

        $('.menuUl > .mClose').click(function () {
            console.log('?');
            $('.menuUl').animate({
                'left': '-80%'
            }, 800);
            aa = 0;

        });
    }
    
    
    $(window).resize(function () {
    var aa = 1;
    if ($(window).width() > 768) {
        $('.menuUl').removeClass('menuUlM');
        $('.subbg').removeClass('subbgM');

        $('.menuUl > li').on('mouseenter',function () {
            $('.subbg').stop().slideDown(800);
            console.log($(window).width());

            $('.menuUl > li').on('mouseleave',function () {
                $('.subbg').stop().slideUp(800);
            });
        });
    //} else {
        
//        $('.menuUl').addClass('menuUlM');
//        $('.subbg').addClass('subbgM');
        
    }  
    else if ($(window).width() <= 768) {

        $('.menuUl').addClass('menuUlM');
        $('.subbg').addClass('subbgM');

        $('.menuWrap').click(function () {
            if (aa == 1) {

                $('.menuUl.menuUlM').animate({
                    'left': '0'
                }, 800);

            }
            aa = 1;
            console.log('>>');
        });

        $('.menuUl.menuUlM > .mClose').click(function () {
            console.log('?');
            $('.menuUl.menuUlM').animate({
                'left': '-80%'
            }, 800);
            aa = 0;

        });
    } else {
    	$('.menuUl > li').off('mouseenter');
        $('.menuUl > li').off('mouseleave');
//        $('.menuUl').removeClass('menuUlM');
//        $('.subbg').removeClass('subbgM');
    }
});

});




