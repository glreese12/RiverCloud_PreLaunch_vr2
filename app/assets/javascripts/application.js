// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.flexslider
//= require bootstrap 
//= require foundation
//= require jquery.backstretch.min
//= require jquery.countdown.min
//= require jQuery.GI.TheWall.min
//= require jquery.shuffle.min
//= require owl.carousel.min 
//= require bootstrapValidator.min
//= require validator/emailAddress
//= require spin.min
//= requre ladda.min
//= require retina.min
//= require imagesloaded.pkgd.min
//= require wow.min
//= require init
//= require jquery.rivercloud
// require_tree .

//$(function(){ $(document).foundation(); });


$(document).ready(function() {
    $('.carousel').carousel({interval: 7000});


/*     $('.flexslider').flexslider(); */


	$('.mobileSlider').flexslider({
		animation: "fade",
		slideshowSpeed: 3000,
		controlNav: false,
		directionNav: false,
		prevText: "&#171;",
		nextText: "&#187;"
	});
	$('.flexslider').flexslider({
		animation: "slide",
		directionNav: false
	}); 
		
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if ($(window).width() < 768) {
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - $('.navbar-header').outerHeight(true) + 1
					}, 1000);
					return false;
				}
			}
			else {
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - $('.navbar').outerHeight(true) + 1
					}, 1000);
					return false;
				}
			}

		}
	});
	
	$('#toTop').click(function() {
		$('html,body').animate({
			scrollTop: 0
		}, 1000);
	});
	
	var timer;
    $(window).bind('scroll',function () {
        clearTimeout(timer);
        timer = setTimeout( refresh , 50 );
    });
    var refresh = function () {
		if ($(window).scrollTop()>100) {
			$(".tagline").fadeTo( "slow", 0 );
		}
		else {
			$(".tagline").fadeTo( "slow", 1 );
		}
    };

    $('#riverContent').riverCloud({'contentId' : '32XUM5SPCKDX', 'statusLogo' : 'true' , 'titleBar' : 'top', 'styleType' : 'fullSlide'});



		
});


