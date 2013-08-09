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
        var maxli = 250;
            minli = 148;
            marginli = 4;
            marginnav = 3;
            interval = 0000;
            duration = 1000;
            wrap = null;

        var carouselStage      = $('.carousel-stage').jcarousel({
                'wrap': wrap,
                'animation': {
                    'duration': duration,
                },
                'visble': 4
            });

        // var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') == 75 ? 1 : 0;
        // console.log('is chrome '+is_chrome);
        var responsive = function() {
            w = $(window).width();
            wc = $('.connected-carousels .carousel-stage').width();
            numli = Math.ceil(wc/maxli);    
            page = $('.carousel-stage li').length/numli;

            if (w < 481) {
                $('.carousel-stage img').css('width', wc);
            } else {
                $('.carousel-stage img').css('width', wc/numli - marginli * 2);
                $('.carousel-stage li').css('margin', marginli);
            };

            $('.prev-stage')             
                .on('inactive.jcarouselcontrol', function() {
                    $(this).addClass('inactive');
                })
                .on('active.jcarouselcontrol', function() {
                    $(this).removeClass('inactive');

                })
                .jcarouselControl({
                    target: '-='+numli
                });
            
            $('.next-stage')
                .on('inactive.jcarouselcontrol', function() {
                    $(this).addClass('inactive');               
                })
                .on('active.jcarouselcontrol', function() {
                    $(this).removeClass('inactive');

                })
                .jcarouselControl({
                    target: '+='+numli
                });


            console.log('first-last');
            console.log(carouselStage.jcarousel('first').index());

            console.log(carouselStage.jcarousel('last').index());


            carouselStage
                .on('animateend.jcarousel', function(event, carousel) {
                    console.log('numli '+numli);
                    console.log('first-last');
                    console.log(carouselStage.jcarousel('first').index());

                    console.log(carouselStage.jcarousel('last').index());

                    // var current = carouselStage.jcarousel('first').index()/numli + 1;
                    // if (is_chrome) {
                    //     current = (carouselStage.jcarousel('first').index()-1)/numli + 1;
                    // }
                    // console.log(current);
                    // $('.navigation li.active').removeClass('active');
                    // $('a[href=#'+current+']').parent('li').addClass('active');
                });  

            $('.carousel-stage img').css('height', 'auto');


            $('.prev-navigation')      
                .on('inactive.jcarouselcontrol', function() {
                    $(this).addClass('inactive');               
                })
                .on('active.jcarouselcontrol', function() {
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '-='+numli
                });  

            $('.next-navigation')
                .on('inactive.jcarouselcontrol', function() {
                    $(this).addClass('inactive');               
                })
                .on('active.jcarouselcontrol', function() {
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '+='+numli
                });

            $('.jcarousel-pagination').jcarouselPagination({
                'carousel': $('.carousel-stage'),
                'perPage': numli,
                'item': function(page, carouselItems) {
                    return '<li><a href="#' + page + '"><img src="img/nav_w.png" width="10" height="10" alt=""></a></li>';
                }                
            });

            $('.carousel-navigation li:first-child').addClass('active');
            $('.carousel-navigation ul').css('width',($(".carousel-navigation img").width()+marginnav*2)*page); 
            $('.carousel-navigation').css('width',($(".carousel-navigation img").width()+marginnav*2)*page + 2*parseInt($('.carousel-navigation ul').css('margin-left')));

        };

        var autoscroll = function() {
            $('.next-stage').click();
        };
        $(window).resize(function(){
            responsive();
        });

        responsive();

        if (interval !== 0) {
            window.setInterval(autoscroll,interval);
        }
    });
})(jQuery);
