/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    // $(window).on('scroll load', function() {
	// 	if ($(".navbar").offset().top > 60) {
	// 		$(".fixed-top").addClass("top-nav-collapse");
	// 	} else {
	// 		$(".fixed-top").removeClass("top-nav-collapse");
	// 	}
    // });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 3,
		spaceBetween: 70,
        breakpoints: {
            // when window is <= 767px
            767: {
                slidesPerView: 1
            },
            // when window is <= 991px
            991: {
                slidesPerView: 2,
                spaceBetween: 40
            }
        }
    });


    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    // $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    // var amountScrolled = 700;
    // $(window).scroll(function() {
    //     if ($(window).scrollTop() > amountScrolled) {
    //         $('a.back-to-top').fadeIn('500');
    //     } else {
    //         $('a.back-to-top').fadeOut('500');
    //     }
    // });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);

// new
var swiper = new Swiper('.product-slider', {
	spaceBetween: 30,
	effect: 'fade',
	// initialSlide: 2,
	loop: false,
	navigation: {
		nextEl: '.next',
		prevEl: '.prev'
	},
	// mousewheel: {
	//     // invert: false
	// },
	on: {
		init: function(){
			var index = this.activeIndex;

			var target = $('.product-slider__item').eq(index).data('target');

			console.log(target);

			$('.product-img__item').removeClass('active');
			$('.product-img__item#'+ target).addClass('active');
		}
	}

});

swiper.on('slideChange', function () {
	var index = this.activeIndex;

	var target = $('.product-slider__item').eq(index).data('target');

	console.log(target);

	$('.product-img__item').removeClass('active');
	$('.product-img__item#'+ target).addClass('active');

	if(swiper.isEnd) {
		$('.prev').removeClass('disabled');
		$('.next').addClass('disabled');
	} else {
		$('.next').removeClass('disabled');
	}

	if(swiper.isBeginning) {
		$('.prev').addClass('disabled');
	} else {
		$('.prev').removeClass('disabled');
	}
});

$(".js-fav").on("click", function() {
	$(this).find('.heart').toggleClass("is-active");
});

// gg 
function sendForm() {
    // đem tất cả dữ liệu trong form id là 'google-form' gom thành biến data
    let data = $('#google-form').serialize();

    $.ajax({ //Sử dụng Ajax gửi dữ liệu đi
        url: 'https://script.google.com/macros/s/AKfycbyySbij8n-Rwhp_1dWl4vQGm1HHJIar5idy1c_79V4aoyUvwbN4d6A3UgvM8V0-TIAeWA/exec',
        method: 'GET',
        dataType: 'json',
        data: data,
        success: function(responseData, textStatus, jqXHR) {
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    window.jQuery(this).trigger('reset');
    alert('Thành Công');

    return true;
};

Vue.filter('zerofill', function (value) {
	//value = ( value < 0 ? 0 : value );
	return (value < 10 && value > -1 ? '0' : '') + value;
  });
  
  var Tracker = Vue.extend({
	template: `
	<span v-show="show" class="flip-clock__piece">
	  <span class="flip-clock__card flip-card">
		<b class="flip-card__top">{{current | zerofill}}</b>
		<b class="flip-card__bottom" data-value="{{current | zerofill}}"></b>
		<b class="flip-card__back" data-value="{{previous | zerofill}}"></b>
		<b class="flip-card__back-bottom" data-value="{{previous | zerofill}}"></b>
	  </span>
	  <span class="flip-clock__slot">{{property}}</span>
	</span>`,
	props: ['property', 'time'],
	data: () => ({
	  current: 0,
	  previous: 0,
	  show: false }),
  
  
	events: {
	  time(newValue) {
  
		if (newValue[this.property] === undefined) {
		  this.show = false;
		  return;
		}
  
		var val = newValue[this.property];
		this.show = true;
  
		val = val < 0 ? 0 : val;
  
		if (val !== this.current) {
  
		  this.previous = this.current;
		  this.current = val;
  
		  this.$el.classList.remove('flip');
		  void this.$el.offsetWidth;
		  this.$el.classList.add('flip');
		}
  
	  } } });
  
  
  
  
  
  
  var el = document.createElement('div');
  document.body.appendChild(el);
  
  var Countdown = new Vue({
  
	el: el,
  
	template: ` 
	<div class="flip-clock" data-date="2017-02-11" @click="update">
	  <tracker 
		v-for="tracker in trackers"
		:property="tracker"
		:time="time"
		v-ref:trackers
	  ></tracker>
	</div>
	`,
  
	props: ['date', 'callback'],
  
	data: () => ({
	  time: {},
	  i: 0,
	  trackers: ['Dsays', 'Hours', 'Minutes', 'Seconds'] //'Random', 
	}),
  
	components: {
	  Tracker },
  
  
	beforeDestroy() {
	  if (window['cancelAnimationFrame']) {
		cancelAnimationFrame(this.frame);
	  }
	},
  
	watch: {
	  'date': function (newVal) {
		this.setCountdown(newVal);
	  } },
  
  
	ready() {
	  if (window['requestAnimationFrame']) {
		this.setCountdown(this.date);
		this.callback = this.callback || function () {};
		this.update();
	  }
	},
  
	methods: {
  
	  setCountdown(date) {
  
		if (date) {
		  this.countdown = moment(date, 'YYYY-MM-DD HH:mm:ss');
		} else {
		  this.countdown = moment().endOf('day'); //this.$el.getAttribute('data-date');
		}
	  },
  
	  update() {
		this.frame = requestAnimationFrame(this.update.bind(this));
		if (this.i++ % 10) {return;}
		var t = moment(new Date());
		// Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
		if (this.countdown) {
  
		  t = this.countdown.diff(t);
  
		  //t = this.countdown.diff(t);//.getTime();
		  //console.log(t);
		  this.time.Days = Math.floor(t / (1000 * 60 * 60 * 24));
		  this.time.Hours = Math.floor(t / (1000 * 60 * 60) % 24);
		  this.time.Minutes = Math.floor(t / 1000 / 60 % 60);
		  this.time.Seconds = Math.floor(t / 1000 % 60);
		} else {
		  this.time.Days = undefined;
		  this.time.Hours = t.hours() % 13;
		  this.time.Minutes = t.minutes();
		  this.time.Seconds = t.seconds();
		}
  
		this.time.Total = t;
  
		this.$broadcast('time', this.time);
		return this.time;
	  } } });