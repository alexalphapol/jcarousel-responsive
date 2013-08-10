// ! In chrome, issue related to image loading
// + add easing plugin
// ! refactor to not self invoke
// ! touch friendly (swipe)
// ? error when we change the view on native - fixed
// + performance: css transition
// ! pagination - fixed

// ! > ? > +

(function($) {
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };
    //Same as document ready
    $(function() {
        // Setup the carousel
        var maxLi = 250;
            minLi = 148;
            marginLi = 4;
            marginNav = 3;
            interval = 0000;
            duration = 1000;
            wrap = 'last';

        var carouselStage = $('.carousel-stage').jcarousel({
            animation: {
                'duration': duration,
            },
            wrap: wrap
            // transitions: Modernizr.csstransitions ? {
            //         transforms:   Modernizr.csstransforms,
            //         transforms3d: Modernizr.csstransforms3d,
            //         easing:       'ease'
            //     } : false
            });

        // var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') == 75 ? 1 : 0;
        // console.log('is chrome '+is_chrome);
        $('.carousel-stage').jcarousel('scroll', 0);
        
        var responsive = function() {
            w = $(window).width();
            wc = $('.connected-carousels .carousel-stage').width();
            //wc = $('.connected-carousels .carousel-stage').outerWidth(true);
            
            numLi = Math.ceil(wc/maxLi);    
            page = $('.carousel-stage li').length/numLi;

            if (w < 481) {
                $('.carousel-stage img').css('width', wc);
            } else {
                $('.carousel-stage img').css('width', wc/numLi - marginLi * 2);
                $('.carousel-stage li').css('margin', marginLi);
            };

            console.log('first-last');
            console.log(carouselStage.jcarousel('first').index());

            console.log(carouselStage.jcarousel('last').index());


            carouselStage
                .on('animateend.jcarousel', function(event, carousel) {
                    console.log('numLi '+numLi);
                    console.log('first-last');
                    console.log(carouselStage.jcarousel('first').index());

                    console.log(carouselStage.jcarousel('last').index());

                    // var current = carouselStage.jcarousel('first').index()/numLi + 1;
                    // if (is_chrome) {
                    //     current = (carouselStage.jcarousel('first').index()-1)/numLi + 1;
                    // }
                    // console.log(current);
                    // $('.navigation li.active').removeClass('active');
                    // $('a[href=#'+current+']').parent('li').addClass('active');
                });  

            $('.carousel-stage img').css('height', 'auto');


            $('.prev-stage')             
                .on('inactive.jcarouselcontrol', function() {
                    $(this).addClass('inactive');
                })
                .on('active.jcarouselcontrol', function() {
                    $(this).removeClass('inactive');

                })
                .jcarouselControl({
                    target: '-='+numLi
                });
            
            $('.next-stage')
                .on('inactive.jcarouselcontrol', function() {
                    $(this).addClass('inactive');               
                })
                .on('active.jcarouselcontrol', function() {
                    $(this).removeClass('inactive');

                })
                .jcarouselControl({
                    target: '+='+numLi
                });

            $('.prev-navigation')      
                .on('inactive.jcarouselcontrol', function() {
                    $(this).addClass('inactive');               
                })
                .on('active.jcarouselcontrol', function() {
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '-='+numLi
                });  

            $('.next-navigation')
                .on('inactive.jcarouselcontrol', function() {
                    $(this).addClass('inactive');               
                })
                .on('active.jcarouselcontrol', function() {
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '+='+numLi
                });

            $('.jcarousel-pagination').jcarouselPagination({
                'carousel': $('.carousel-stage'),
                'perPage': numLi,
                'item': function(page, carouselItems) {
                    return '<li><a href="#' + page + '"><img src="img/nav_w.png" width="10" height="10" alt=""></a></li>';
                }                
            });

            $('.carousel-navigation li:first-child').addClass('active');
            $('.carousel-navigation ul').css('width',($(".carousel-navigation img").width()+marginNav*2)*page); 
            $('.carousel-navigation').css('width',($(".carousel-navigation img").width()+marginNav*2)*page + 2*parseInt($('.carousel-navigation ul').css('margin-left')));

        };

        var autoscroll = function() {
            $('.next-stage').click();
        };
        $(window).resize(function(){
            window.location.reload();
        });

        responsive();

        if (interval !== 0) {
            window.setInterval(autoscroll,interval);
        }
    });
})(jQuery);
