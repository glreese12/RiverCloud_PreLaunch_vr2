// jQuery Plugin RiverCloud 2015
// RiverCloud plugin for dynamic streaming of content
// version 1.0, Febuary 14th, 2015
// by Glenn Reese

(function($) {

    $.riverCloud = function(element, options) {

        var defaults = {
            contentId: null,
            widgetId:  null,
            statusTitle: true,
            statusAvatar: true,
            statusLogo: true,
            titleBar: 'bottom', //top, bottom, none  
            appTitle: 'RiverCloud',
            subTitle: 'Real Time Updates ~ Relevant Content',
            styleType: 'fullSlide'
        }
            
         var circleColor = ["#7BAFB7", "#F9C383", "red", "green"];


        

         // Speed Settings

         // Slideshow Speed 
         var slideDuration = 30000; // How long (in milliseconds) before a slide transitions
         var slideFade = 2000; // How long (in milliseconds) the fade between slides lasts

         // Tagline Speed 
         //var taglineFadeIn = 5000; // How long (in milliseconds) it takes the tagline to fade in
         //var taglineFadeOut = 2000; // How long (in milliseconds) it takes the tagline to fade out
         //var taglineDelay = slideDuration - taglineFadeIn - taglineFadeOut; // Delay between tagline fade in and out
         //var taglineColorFade = 600; // How long (in milliseconds) it takes for the color in the tagline to crossfade

         // Countdown Circle Border Speed 
         var circleBorderFade = 600; // How long (in milliseconds) it takes for the color in the countdown circle borders to crossfade

         // Headline Banner Fade Speed 
         //var headlineBannerFade = 600; // How long (in milliseconds) it takes for the headline banner to fade

         // Do not change these - for memory efficiency
         //var $tagline = $('.tagline');
         //var $headlineAccent = $('.headline-accent');
        // var $circle = $('.circle');
         // var $yourIcon = $('#Your_Icon'); SVG Animate didn't like this one, disabled 
                
        //initialize variables        
        var plugin = this;
        var etitle = document.getElementById("eventTitle"); 
        var counter = 0;
        var j = 0 
        var imgList = [];
        var imglist =  [];
        var usrlist = [];
        var title = '';
        var $element = $(element),
             element = element;

        //init plugin
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            var contentUrl = 'https://s3.amazonaws.com/rivercloud-production/rivercloudtv/' + plugin.settings.contentId + '/playlist.xml';


            var html = '';
            var i = 0

            // AJAX  access the playlist from S3
            $.ajax({
                type: 'GET',
                dataType: 'xml',
                data: null,
                url: contentUrl,
                success: function(xml) {
                    title = $(xml).find('title').text();
                    user = $(xml).find('user').text();
                    var $entries = $(xml).find('item');
                    $entries.each(function() {
                        var $entry = $(this);
                        var entry = $entry[0]; // DOM element
                        var content = $entry.find('content').text();
                        var usrlink = $entry.find('user').text();
                        var thumbnail = entry.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0].getAttribute('url');
                        html += '<img src="' + thumbnail + '" />';
                        imglist[i] = thumbnail;
                        usrlist[i] = usrlink;
                        html += content;
                        i = i + 1;
                    });



        //switch based on desired template
        switch(plugin.settings.styleType) {

                // old standard
                case "standard":

                    //add the rivercloudtv logo - default is "true"
                    if(plugin.settings.statusLogo == 'true') {
                       
                     //  var contentLogo = '<div class="sidebar">'; 
                     //   contentLogo += '<div class="grid">';
                     //   contentLogo += '<div class="sidebar-wrapper">';
                     //   contentLogo += '<div class="grid__item one-whole vacation-getaway">';
                     var  contentLogo = '<body>';
                          contentLogo += '<div class="pull-left river-logo"><h4 class=""><i>RiverCloudTV</i></h4>';    
                     //   contentLogo +=  '</div>'; 
                          contentLogo +=  '</div>'; 
                          contentLogo += '</body>';
                    //    contentLogo +=  '</div>';
                     //   contentLogo +=   '</div>'; 
                      //  contentLogo +=   '</div>';
                        //element.innerHTML = contentLogo;
                    }

                
                          contentLogo += '<div class="footer">';
                    //    contentLogo += '<div class="grid">'; 
                     //   contentLogo += '<div class="grid__item one-whole vacation-getaway">'; 
                        if(plugin.settings.statusAvatar == true) contentLogo += '<img id="userImage" class="circle" align="right" />';
                        if(plugin.settings.statusTitle == true) contentLogo += '<i class="" id="eventTitle">' + title + '</i>' ;
                          contentLogo += '</div>';  
                      //  contentLogo += '</div>';
                      //  contentLogo += '</div>';
                        element.innerHTML  = contentLogo;

                        var $circle = $('.circle');

                       //var etitle = document.getElementById("eventTitle"); 

                    $element.backstretch(imglist, {duration: slideDuration, fade: slideFade});


                    $element.on("backstretch.show", function (e, instance) {

                          if (plugin.settings.statusAvatar == true) { document.getElementById("userImage").setAttribute("src",usrlist[j]) }
                            j += 1
                            if (j > imglist.length - 1 ) { //  imglist.length - 1 when the counter gets to the end of the slideshow, restart the counter
                                j = 0;
                            }
                      
                    });
                        $(window).on("backstretch.after", function (e, instance, index){
                        if (counter > imglist.length - 1) { // when the counter gets to the end of the slideshow, restart the counter
                            counter = 0;

                        }

                        
                       // $tagline.animate({"opacity": 1}, taglineFadeIn).delay(taglineDelay).animate({"opacity": 0}, taglineFadeOut).css("color", taglineColor[counter]).text(taglineText[counter]);
                        //$headlineAccent.animate({color: headlineAccentColor[counter]}, taglineColorFade);
                        $circle.animate({"border-color": circleColor[counter]}, circleBorderFade);
                        //$('#Your_Icon').animate({svgFill: headlineAccentColor[counter]}, headlineBannerFade);
                        counter++;
                    

                    });
                  
                break; 

                case "fullSlide":

                //full slide template
               // var contentLogo = '<body>';
                var contentLogo = '<section id="" class="river-solid">'
                contentLogo += '<div class="river-container">';
                contentLogo += '<div class="row">';
                contentLogo += '<div class="col-sm-12">';
                if(plugin.settings.titleBar == 'top') contentLogo += '<div class="river-title-border"></div>';
                contentLogo += '<h3 class="river-title-padding"><i>'+ plugin.settings.appTitle + '</i> </h3>';
                contentLogo += '<p class="river-subtitle">' + plugin.settings.subTitle + '</p>'
                if(plugin.settings.titleBar == 'bottom') contentLogo += '<div class="river-title-border"></div>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</section>'
                contentLogo += '<div id="mediaContent" class="river-fullslide">'; //style="height:100%;width:100%;padding-top:100px;">'
                contentLogo += '</div>';

                contentLogo += '<section class="river-solid">'
                contentLogo +='<div class="river-container">';
                contentLogo += '<div class="row">';
                contentLogo +=  '<div class="col-sm-12">';
                contentLogo += '<h3 class="river-title-footer"><i>' + title + '</i> </h3>';
                //contentLogo += '<h3 class="section-title"><i>' + title + '</i></h3>';
                contentLogo += '<div class="river-title-border"></div>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</section>';
                //contentLogo += '</body>';



                element.innerHTML  = contentLogo;

                $('#mediaContent').backstretch(imglist, {duration: slideDuration, fade: slideFade, centeredx: false});


                $('#mediaContent').on("backstretch.show", function (e, instance) {
                

                        //  if (plugin.settings.statusAvatar == true) { document.getElementById("userImage").setAttribute("src",usrlist[j]) }
                            j += 1
                            if (j > imglist.length - 1 ) { //  imglist.length - 1 when the counter gets to the end of the slideshow, restart the counter
                                j = 0;
                            }
                      
                    });
                        $(window).on("backstretch.after", function (e, instance, index){
                        if (counter > imglist.length - 1) { // when the counter gets to the end of the slideshow, restart the counter
                            counter = 0;

                        }

                        
                       // $tagline.animate({"opacity": 1}, taglineFadeIn).delay(taglineDelay).animate({"opacity": 0}, taglineFadeOut).css("color", taglineColor[counter]).text(taglineText[counter]);
                        //$headlineAccent.animate({color: headlineAccentColor[counter]}, taglineColorFade);
                        //$circle.animate({"border-color": circleColor[counter]}, circleBorderFade);
                        //$('#Your_Icon').animate({svgFill: headlineAccentColor[counter]}, headlineBannerFade);
                        counter++;
                    

                    });

                    break;    


                case "shuffleSlide":


                var j = 0;
                var k = 6;
                var imgNum = 6;



                //header information
                // contentLogo = '<body>'

                var contentLogo = '<section id="river-portfolio" class=" river-solid">';
                contentLogo +='<div class="river-container">';
                contentLogo += '<div class="row">';
                contentLogo +=  '<div class="col-sm-12">';
                if(plugin.settings.titleBar == 'top') contentLogo += '<div class="river-title-border"></div>';
                contentLogo += '<h3 class="river-title-padding"><i>'+ plugin.settings.appTitle + '</i> </h3>';
                contentLogo += '<p class="river-subtitle">' + plugin.settings.subTitle + '</p>'
                if(plugin.settings.titleBar == 'bottom') contentLogo += '<div class="river-title-border"></div>';
                //contentLogo += '<h3 class="section-title"><i>' + title + '</i></h3>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</div>'
                contentLogo += '</section>';

               contentLogo += '<div class="GITheWall">';
                contentLogo += '<section id="team" class="river-section" style="margin: 0; padding: 0; list-style-type: none;" >'; 
                contentLogo += '<ul id="river-portfolio-container" style="margin: 0; padding: 0; list-style-type: none;" class="text-center wow fadeInDown" data-wow-duration="0.7s" data-wow-delay="0s">';
               // contentLogo += '<ul id="portfolio-container"  data-groups=["'+ k +'"] style="margin: 0; padding: 0; list-style-type: none;" class="text-center wow fadeInDown" data-wow-duration="0.7s" data-wow-delay="0s">';
  

                for (j=0; j < imglist.length; j++ ) { //imglist.length  imglist.length - 1 when the counter gets to the end of the slideshow, restart the counter
           
                    if(j==imgNum){
                  
                      k+=imgNum;
                     // contentLogo += '<ul id="portfolio-container" data-groups=["'+ k +'"] style="margin: 0; padding: 0; list-style-type: none;" class="text-center wow fadeInDown" data-wow-duration="0.7s" data-wow-delay="0s">';
                      }
                      contentLogo += '<li class="river-portfolio-item" style="margin: 0; padding: 0; list-style-type: none;" data-groups=["'+ k +'"]>';
                      contentLogo += '<figure>';
                      contentLogo +=  '<div class="river-portfolio-img">';
                      contentLogo += '<a href="#" class="river-overlay">';
                      contentLogo +=      '<span class="river-title">' + title + '</span>';
                    //  contentLogo +=          '<span class="category">branding</span>';
                      contentLogo +=         '</a>';
                      contentLogo +=          '<img src="' + imglist[j] + '" alt="" class="img-responsive" ">';
                      contentLogo +=  '</div>';
                      contentLogo += '</figure>';
                      contentLogo += '</li>';  
                     
                    //if (j == imglist.length-1) {
                    //}

                }
                contentLogo += '</ul>';
                contentLogo += '</section>';
                contentLogo += '</div>';

                 contentLogo += '<section class="river-solid">';
                contentLogo +='<div class="river-container">';
                contentLogo += '<div class="row">';
                contentLogo +=  '<div class="col-sm-12">';
               // contentLogo += '<h3 class="section-title-footer"><i></i> </h3>';
                contentLogo += '<h3 class="river-title-footer"><i>' + title + '</i></h3>';
                contentLogo += '<div class="river-title-border"></div>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</section>';

               // contentLogo += '</body>';


                element.innerHTML  = contentLogo;


                /* ---------------------------------------------------------
                 *  Portfolio
                 */
                
                var p = imgNum;
                var $grid = $("#river-portfolio-container");
               //  var groupName = $("#portfolio-container[data-groups='12'] li");
                //var $imggrp = $('.portfolio-item li');

                var startImages = p.toString();

                //$grid.shuffle('shuffle',startImages);
                    
                $grid.imagesLoaded( function() {

    
                    $grid.shuffle({
                        itemSelector: '.river-portfolio-item',
                        speed: 2000
                    }); 

                    $grid.shuffle('shuffle',startImages);
                    //$grid.shuffle('shuffle',groupName);
                }); 

 

                setInterval(function() {
                        console.log("timout interval");
            
                                 // reshuffle grid
                        var images = p.toString();       
                        $grid.shuffle('shuffle', images );
                        p+=imgNum;
                        if(p==k) {
                            p=imgNum;
                        }


                    
    
                }, 9000);
                 



               
                /* ---------------------------------------------------------
                 *  GITheWall
                 */
                
              /*  $('.GITheWall').GITheWall({
                    nextButtonClass: 'fa fa-chevron-right',
                    prevButtonClass: 'fa fa-chevron-left',
                    closeButtonClass: 'fa fa-times',
                    dynamicHeight: false,
                    onShow: function(){
                        $("#portfolio-container").slideDown(300).fadeOut(300);
                        $(".filter-tags").slideDown(300).fadeOut(300);
                        $("#portfolio-more").slideDown(300).fadeOut(300);
                    },
                    onHide: function(){
                        $("#portfolio-container").slideUp(300).fadeIn(300);
                        $(".filter-tags").slideUp(300).fadeIn(300);
                        $("#portfolio-more").slideUp(300).fadeIn(300);
                    }
                }); */

                /* ---------------------------------------------------------
                 *  WOW
                 */
                
                new WOW({
                    mobile: false
                }).init();
    

                break;

            case "smoothSlide":

             var j = 0;


                //header information
               // var contentLogo = '<body>'
                var contentLogo = '<section id="river-portfolio" class="river-solid">';
                contentLogo += '<div class="river-container">';
                contentLogo += '<div class="row">';
                contentLogo += '<div class="col-sm-12">';
                if(plugin.settings.titleBar == 'top') contentLogo += '<div class="river-title-border"></div>';
                contentLogo += '<h3 class="river-title-padding"><i>'+ plugin.settings.appTitle + '</i> </h3>';
                contentLogo += '<p class="river-subtitle">' + plugin.settings.subTitle + '</p>';
                if(plugin.settings.titleBar == 'bottom') contentLogo += '<div class="river-title-border"></div>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</section>';

              //  contentLogo += '<div class="GITheWall">'; //GitWall
                //contentLogo += '<div id="portfolio-container" class="text-center wow fadeInDown" data-wow-duration="0.7s" data-wow-delay="0s">';
              //  contentLogo += '<div class="col-md-7">';
                contentLogo += '<section id="river-team" class="river-section">';
                contentLogo += '<div class="carousel-container">';
                 
                contentLogo += '<div id="teamCarousel" class="owl-carousel text-center">';

                for (j=0; j < imglist.length; j++ ) { //imglist.length  imglist.length - 1 when the counter gets to the end of the slideshow, restart the counter
                contentLogo += '<div class="text-center river-member-container wow fadeInDown">';
                contentLogo += '<div class="river-member">';
                contentLogo += '<div class="river-member-img">';
                contentLogo += '<img src= "' + imglist[j] + '" alt="" class="img-responsive">';
                contentLogo += '</div>';
                contentLogo +=  '</div>';
                contentLogo += '</div>';  
           
                }

               // contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</div>';  //container 
                contentLogo += '</section>';
               // contentLogo += '</div>'; //port container
              //  contentLogo += '</div>'; //Git Wall

                 contentLogo += '<section class="river-solid">';
                contentLogo +='<div class="river-container">';
                contentLogo += '<div class="row">';
                contentLogo +=  '<div class="col-sm-12">';
                contentLogo += '<h3 class="river-title-footer"><i>' + title + '</i> </h3>';
                //contentLogo += '<h3 class="section-title"><i>' + title + '</i></h3>';
                contentLogo += '<div class="river-title-border"></div>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</div>';
                contentLogo += '</section>';

                //contentLogo += '</body>';


                element.innerHTML  = contentLogo;


               
                /* ---------------------------------------------------------
                 *  WOW
                 */
                
                new WOW({
                    mobile: false
                }).init();

                /* ---------------------------------------------------------
                 * Team carousel
                 */
                
        

               var owl = $('#teamCarousel');
                owl.owlCarousel({
                    items:4,
                    itemsTablet: [768,3],
                    itemsTabletSmall: [690,2],
                    itemsMobile : [480,1],
                    margin:10,
                    autoplay:true,
                    autoplayTimeout:3000,
                    autoplayHoverPause:true,
                    mouseDrag: false,
                    touchDrag: false,
                    pullDrag: false
                });

         


    

                break;

               
                

                }
            }      
        });

       }


        plugin.init();



    }

    $.fn.riverCloud= function(options) {

        return this.each(function() {
            if (undefined == $(this).data('riverCloud')) {
                var plugin = new $.riverCloud(this, options);
                $(this).data('riverCloud', plugin);
            }
        });

    }

})(jQuery);


