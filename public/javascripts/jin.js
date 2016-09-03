$(document).ready(function() {
    //alert("document ready occurred!");

	var funContent= $('.fun-body > p').text();
	var sharpIndex=funContent.indexOf('#');
	var targetFunContent='';
	var tempFunContent=funContent;
    if(sharpIndex!=-1){
    	while(sharpIndex!=-1){
    		targetFunContent=targetFunContent+tempFunContent.substring(0,sharpIndex)+'<strong>#';
    		tempFunContent=tempFunContent.substring(sharpIndex+1,tempFunContent.length);
    		sharpIndex=tempFunContent.indexOf('#');
    		targetFunContent=targetFunContent+tempFunContent.substring(0,sharpIndex+1)+'</strong>';
    		tempFunContent=tempFunContent.substring(sharpIndex+1,tempFunContent.length);
    		sharpIndex=tempFunContent.indexOf('#');
    	}
    }else{
        targetFunContent=funContent;
    }
	$('.fun-body > p').html(targetFunContent);

    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px',
        reset:true
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200,
        reset:true
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px',
        reset:true
    }, 300);

    // Initialize and Configure Magnific Popup Lightbox Plugin
    /*$('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });*/

	// End of use strict

});
