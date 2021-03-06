(function($) {
    "use strict";
    
    if ($('.accrodion-grp').length) {
        var accrodionGrp = $('.accrodion-grp');
        accrodionGrp.each(function () {
            var accrodionName = $(this).data('grp-name');
            var Self = $(this);
            var accordion = Self.find('.accrodion');
            Self.addClass(accrodionName);
            Self.find('.accrodion .accrodion-content').hide();
            Self.find('.accrodion.active').find('.accrodion-content').show();
            accordion.each(function () {
                $(this).find('.accrodion-title').on('click', function () {
                    if ($(this).parent().parent().hasClass('active') === false) {
                        $('.accrodion-grp.' + accrodionName).find('.accrodion').removeClass('active');
                        $('.accrodion-grp.' + accrodionName).find('.accrodion').find('.accrodion-content').slideUp();
                        $(this).parent().parent().addClass('active');
                        $(this).parent().parent().find('.accrodion-content').slideDown();
                    };


                });
            });
        });

    };
    
    /*==================================================================
    [ Load page ]*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="cp-spinner cp-skeleton"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
        transition: function(url) { window.location.href = url; }
    });


    /*==================================================================
    [ Back to top ]*/
    var windowH = $(window).height() / 2;

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display', 'flex');
        } else {
            $("#myBtn").css('display', 'none');
        }
    });

    $('#myBtn').on("click", function() {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input input, .validate-input textarea');

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $(input).each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


    /*==================================================================
    [ Fixed Header ]*/
    var menuHeader = $('.container-menu-desktop');
    var posWrapHeader = $('.top-bar').height();

    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= posWrapHeader) {
            $(menuHeader).addClass('fix-menu-desktop');
        } else {
            $(menuHeader).removeClass('fix-menu-desktop');
        }
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function() {
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for (var i = 0; i < arrowMainMenu.length; i++) {
        $(arrowMainMenu[i]).on('click', function() {
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function() {
        if ($(window).width() >= 992) {
            if ($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display', 'none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function() {
                if ($(this).css('display') == 'block') {
                    console.log('hello');
                    $(this).css('display', 'none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });

        }
    });


    /*==================================================================
    [ Play video 01 ]*/
    var srcOld = $('.video-mo-01').children('iframe').attr('src');

    $('[data-target="#modal-video-01"]').on('click', function() {
        $('.video-mo-01').children('iframe')[0].src += "&autoplay=1";

        setTimeout(function() {
            $('.video-mo-01').css('opacity', '1');
        }, 300);
    });

    $('[data-dismiss="modal"]').on('click', function() {
        $('.video-mo-01').children('iframe')[0].src = srcOld;
        $('.video-mo-01').css('opacity', '0');
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function() {
        $filter.on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({ filter: filterValue });
        });

    });

    // init Isotope
    $(window).on('load', function() {
        var $grid = $topeContainer.each(function() {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine: 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function() {
        $(this).on('click', function() {
            for (var i = 0; i < isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('actived-1');
            }

            $(this).addClass('actived-1');


            if ($(this).data('filter') == "*") {
                $('.isotope-grid-gallery .isotope-item a').attr('data-lightbox', 'all-gallery');
            } else {
                $('.isotope-grid-gallery ' + $(this).data('filter') + ' a').attr('data-lightbox', $(this).data('filter'));
            }
        });
    });


    /*==================================================================
    [ Show content Product detail ]*/
    $('.active-dropdown-content .js-toggle-dropdown-content').toggleClass('show-dropdown-content');
    $('.active-dropdown-content .dropdown-content').slideToggle();

    $('.js-toggle-dropdown-content').on('click', function() {
        $(this).toggleClass('show-dropdown-content');
        $(this).parent().find('.dropdown-content').slideToggle(300);
    });

    /*==================================================================
    [ Show gird / list course ]*/

    $('.js-show-grid').on('click', function() {
        $('.js-show-grid').addClass('actived-2');
        $('.js-show-list').removeClass('actived-2');
        $('.js-list').fadeOut();
        $('.js-grid').fadeIn();
    });

    $('.js-show-list').on('click', function() {
        $('.js-show-list').addClass('actived-2');
        $('.js-show-grid').removeClass('actived-2');
        $('.js-grid').fadeOut();
        $('.js-list').fadeIn();
    });

    $(window).on('load', function() {

        if ($('.testimonials-one__thumb-carousel').length) {
            var testiOneThumbCarousel = new Swiper('.testimonials-one__thumb-carousel', {
                slidesPerView: 1,
                spaceBetween: 0,
                freeMode: true,
                effect: 'fade',
                speed: 1400,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                loop: true,
                autoplay: {
                    delay: 5000,
                },
            });
        }


        if ($('.testimonials-one__carousel').length) {
            var testiOneCarousel = new Swiper('.testimonials-one__carousel', {
                observer: true,
                observeParents: true,
                speed: 1400,
                mousewheel: false,
                autoplay: {
                    delay: 5000,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                thumbs: {
                    swiper: testiOneThumbCarousel
                }
            });
        }

        if ($('.thm__owl-carousel').length) {
            $('.thm__owl-carousel').each(function() {
                var Self = $(this);
                var carouselOptions = Self.data('options');
                var carouselPrevSelector = Self.data('carousel-prev-btn');
                var carouselNextSelector = Self.data('carousel-next-btn');
                var thmCarousel = Self.owlCarousel(carouselOptions);
                if (carouselPrevSelector !== undefined) {
                    $(carouselPrevSelector).on('click', function() {
                        thmCarousel.trigger('prev.owl.carousel');
                        return false;
                    });
                }
                if (carouselNextSelector !== undefined) {
                    $(carouselNextSelector).on('click', function() {
                        thmCarousel.trigger('next.owl.carousel');
                        return false;
                    });
                }
            });
        }
    });

    /*==================================================================
    [ Anisto - Popup share social ]*/
    $('.share').click(function() {
        var NWin = window.open($(this).prop('href'), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
        if (window.focus) {
            NWin.focus();
        }
        return false;
    });

    /*==================================================================
    [ Anisto - Random general code ]*/

    function codeGen() {
        var code = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890987654321"
        for (i = 0; i < 7; i++) {
            code += possible.charAt(Math.round(Math.random() * possible.length));
        }
        return code;
    }

    function setVal() {
        document.getElementById("coupon").style.animationDuration = null;
        document.getElementById("coupon").style.animationName = null;
    }

    $('.getCoupon').click(function() {
        document.getElementById("coupon").style.animationName = "fadeIn";
        document.getElementById("coupon").style.animationDuration = "1s";
        document.getElementById("coupon").innerHTML = (codeGen());
        setTimeout(setVal, 2000);
    });

    // FrontPage Time Counter
    var expiryDate = $('#counter').data('date');
    var target = new Date(expiryDate),
        finished = false,
        availiableExamples = {
            set15daysFromNow: 15 * 24 * 60 * 60 * 1000,
            set5minFromNow: 5 * 60 * 1000,
            set1minFromNow: 1 * 60 * 1000
        };

    function callback(event) {
        var $this = $(this);
        switch (event.type) {
            case "seconds":
            case "minutes":
            case "hours":
            case "days":
            case "weeks":
            case "daysLeft":
                $this.find('div span#' + event.type).html(event.value);
                if (finished) {
                    $this.fadeTo(0, 1);
                    finished = false;
                }

                break;
            case "finished":
                $this.fadeTo('slow', .5);
                finished = true;
                break;
        }
    }
    // Xuat thang uu dai module Price
    var d = new Date();
    if(document.getElementById("month")) {
        document.getElementById("month").innerHTML = (d.getMonth() + 1).toString().padStart(2, "0");
    }
})(jQuery);
