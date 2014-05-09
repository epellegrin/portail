jQuery(document).ready(function() {
	svgeezy.init('nocheck', 'png');
	
	(function($) {
		  $.randomize = function(arr) {
		    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
		    return arr;
		  };
	})(jQuery);
	
	/* Functions */
	if (matchMedia('(min-width: 992px)').matches) {
		$( ".fonctionnalite li" ).hover(
		  function() {
		    $(".fonctionnalite .titre_fonctionnalite").css('opacity',0);
		  }, function() {
			  $(".fonctionnalite .titre_fonctionnalite").css('opacity',1);
		  }
		);
	}
	
	
	jQuery('.scroll').bind('click',function(event){
	    var anchor = jQuery(this);
	
	    jQuery('html, body').stop().animate({
	        scrollTop: jQuery(anchor.attr('href')).offset().top-50
	    }, 1000);
	    
	    event.preventDefault();
	});
	
	/* Social Feed */
	$("#twitter").lifestream({
		  classname: "feed",
		  feedloaded: function(){
			  $('time').timeago();
				var ul = $("#twitter").find(".feed");
				var ticker = function() {
					setTimeout(function() {
						var top = ul.position().top;
						var h = ul.height();
						var incr = (h / ul.children().length);
						var newTop = top - incr;
						if (h + newTop <= 0) newTop = 0;
						ul.animate( {top: newTop}, 500 );
						ticker();
					}, 4000);
				};
				ticker();
		  },
		  limit: 20,
		  list:[
		    {
		      service: "twitter",
		      user: "mobvino"
		    }
		  ]
		});
		$("#facebook").lifestream({
			  classname: "feed",
			  feedloaded: function(){
				  $('time').timeago();
					var ul = $("#facebook").find(".feed");
					var ticker = function() {
						setTimeout(function() {
							var top = ul.position().top;
							var h = ul.height();
							var incr = (h / ul.children().length);
							var newTop = top - incr;
							if (h + newTop <= 0) newTop = 0;
							ul.animate( {top: newTop}, 500 );
							ticker();
						}, 4000);
					};
					ticker();
			  },
			  limit: 20,
			  list:[
			    {
			      service: "facebook_page",
			      user: "145904368938627"
			    }
			  ]
			});
			
			/* Initalize Instagram Feed : http://instagram.com/developer/authentication/ */
			jQuery.fn.spectragram.accessData={accessToken:'174781598.f27bb94.cc72b1b537d54f5d9e807c0ea6a311f9',clientID:'f27bb9455d8748efa3344af792b4c84a'};
			jQuery('#instagram').spectragram('getUserFeed',{
			    query: 'mobvino',
			    max: 4
			});
				
			jQuery('.text_social li').click(function(){
				jQuery('.text_social li').removeClass('active');
				jQuery(this).addClass('active');
				$("#twitter").find(".feed").css('top', '0');
				$("#facebook").find(".feed").css('top', '0');
				if(jQuery(this).attr('id') == 'instagram-feed'){
					jQuery('.feed-container').hide();
					jQuery('#instagram').fadeIn(1000);
					var $li = $('li', '#instagram').get();
				    var random = $.randomize($li);
				    $('#instagram').empty();
				    $(random).appendTo('#instagram');
				} else if ($(this).attr('id') == 'twitter-feed') {
					$('.feed-container').hide();
					$('#twitter').fadeIn();
				} else if (jQuery(this).attr('id') == 'facebook-feed') {
					jQuery('.feed-container').hide();
					jQuery('#facebook').fadeIn(1000);
				}
	    	});	
			jQuery("#twitter-feed").click();
			
			/* Validation Form with AJAX while typing for inputs */
			jQuery('input').bind('input propertychange', function() {
				jQuery(this).parent().find('.error').remove();
				jQuery(this).parent().find('.valid').remove();
			    if( jQuery(this).attr('id') == 'email' ){
					var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if (jQuery(this).val() == "" || jQuery(this).val() == " ") {
						jQuery(this).after("<span class='error'></span>");
						jQuery(this).parent().find('.error').fadeIn('slow');
					} else if (!checkEmail.test(jQuery(this).val())) { 
						jQuery(this).after("<span class='error'></span>");
						jQuery(this).parent().find('.error').fadeIn('slow');
					} else {
						jQuery(this).after("<span class='valid'></span>");
						jQuery(this).parent().find('.valid').fadeIn('slow');	
					}    
			    } else {
					if(jQuery(this).val() == "" || jQuery(this).val() == " "){
						jQuery(this).after("<span class='error'></span>");
						jQuery(this).parent().find('.error').fadeIn('slow');			   
					} else {
						jQuery(this).after("<span class='valid'></span>");
						jQuery(this).parent().find('.valid').fadeIn('slow');	
					}
			    }
			});
			
			/* Validation Form with AJAX while typing for textarea */
			jQuery('textarea').bind('input propertychange', function() {
				jQuery(this).parent().find('.error').remove();
				jQuery(this).parent().find('.valid').remove();	
				if(jQuery(this).val() == "" || jQuery(this).val() == " "){
					jQuery(this).after("<span class='error'></span>");
					jQuery(this).parent().find('.error').fadeIn('slow');			   
				} else {
					jQuery(this).after("<span class='valid'></span>");
					jQuery(this).parent().find('.valid').fadeIn('slow');	
				}
			});	
			
			/* Validation Form with AJAX on Submit */
			jQuery('#submit').click(function(){
				jQuery("#contact-form .btn").attr("disabled",true);
				jQuery("#contact-form .loader").show();
				return contactus();
			});
			
			function contactus(){
				jQuery('span.error').fadeOut('slow');
				jQuery('span.valid').fadeOut('slow');
				jQuery('#thanks').hide();
				jQuery('#error').hide();
				jQuery('#timedout').hide();
				jQuery('#state').hide();
				
				var error = false;
				
				var name = jQuery('#name').val(); 
				if(name == "" || name == " ") {
					jQuery('#name').after("<span class='error'></span>");
					jQuery('#name').parent().find('.error').fadeIn('slow');
					error = true; 
				} else {
					jQuery('#name').after("<span class='valid'></span>");
					jQuery('#name').parent().find('.valid').fadeIn('slow');			
				}
				
				var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
				var email = jQuery('#email').val();
				if (email == "" || email == " ") {
					jQuery('#email').after("<span class='error'></span>");
					jQuery('#email').parent().find('.error').fadeIn('slow');
					error = true;
				} else if (!checkEmail.test(email)) { 
					jQuery('#email').after("<span class='error'></span>");
					jQuery('#email').parent().find('.error').fadeIn('slow');
					error = true;
				} else {
					jQuery('#email').after("<span class='valid'></span>");
					jQuery('#email').parent().find('.valid').fadeIn('slow');			
				}
				
				var message = jQuery('#message').val(); 
				if(message == "" || message == " ") {
					jQuery('#message').after("<span class='error'></span>");
					jQuery('#message').parent().find('.error').fadeIn('slow');
					error = true; 
				} else {
					jQuery('#message').after("<span class='valid'></span>");
					jQuery('#message').parent().find('.valid').fadeIn('slow');			
				}
				
				var subject = jQuery('#subject').val(); 
				if(subject == "" || subject == " ") {
					jQuery('#subject').after("<span class='error'></span>");
					jQuery('#subject').parent().find('.error').fadeIn('slow');
					error = true; 
				} else {
					jQuery('#subject').after("<span class='valid'></span>");
					jQuery('#subject').parent().find('.valid').fadeIn('slow');			
				}
				
				var betatest = jQuery("#betatest").is(':checked')?'oui':'non';
				
				if(error == true) {
					jQuery("#contact-form .btn").attr("disabled",false);
					jQuery("#contact-form .loader").hide();
					
					jQuery('#error').fadeIn('slow');
					setTimeout(function() {
					    jQuery('#error').fadeOut('slow');
					}, 3000);
					return false;
				}
				
				jQuery.ajax({
					type: "POST",
					url: "includes/m.php",
					data: {name:name,subject:subject,email:email,message:message,betatest:betatest}, 
					timeout: 6000,
					error: function(request,error) {
						jQuery("#contact-form .btn").attr("disabled",false);
						jQuery("#contact-form .loader").hide();
						
						if (error == "timeout") {
							jQuery('#timedout').fadeIn('slow');
							setTimeout(function() {
							    jQuery('#timedout').fadeOut('slow');
							}, 3000);
						}
						else {
							jQuery('#state').fadeIn('slow');
							jQuery("#state").html('Problème d\'envoi du message');
							setTimeout(function() {
							    jQuery('#state').fadeOut('slow');
							}, 3000);
						}
					},
					success: function() {
						jQuery("#contact-form .btn").attr("disabled",false);
						jQuery("#contact-form .loader").hide();
						
						jQuery('span.valid').remove();
						jQuery('#thanks').fadeIn('slow');
						jQuery('input').val('');
						jQuery('textarea').val('');
						setTimeout(function() {
						    jQuery('#thanks').fadeOut('slow');
						}, 3000);
					}
				});
				
				return false;
			}
});