	 		function initialization(){
	 			$('#myContainer').fullpage({
	                sectionsColor: ['#EDEDEF', '#EDEDEF', '#EDEDEF', 'whitesmoke'],
	                anchors: ['home', 'sipping', 'payment', 'contactus'],
					navigationTooltips: ['Home', 'Sipping', 'Payment','Contact us'],
					showActiveTooltip: false,
	                animateAnchor:true,
					scrollOverflow: true,
					autoScrolling:true,
					responsive: 900,
					fitSection: false,
					menu: '#menu',
					navigation:true,
					continuousVertical:false,
					navigationPosition: 'left',
					touchSensitivity: 15,
					scrollBar:false,
					
					slidesNavigation: true,
					slidesNavPosition: 'bottom',
					loopHorizontal:true,
					fitToSection: true,
					
					//Accessibility
					keyboardScrolling: true,
					animateAnchor: true,
					recordHistory: true,	                
					css3: true,
					
					//Design
					controlArrows: true,
					verticalCentered: true,
					resize : true,
					paddingTop: '3em',
					paddingBottom: '10px',
					fixedElements: '#header',
					responsiveWidth: 0,
					responsiveHeight: 0,		
					scrollingSpeed:1000,
							
					//events
					onLeave: function(index, nextIndex, direction){},
					afterLoad: function(anchorLink, index){},
					afterRender: function(){},
					afterResize: function(){},
					afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
					onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
	            });
	 		}
	
			function do_slide(){
				interval = setInterval(function(){
				  $.fn.fullpage.moveSlideRight();
				}, 5000);
			  }
	
	 $(document).ready(function() {

	 		//fullPage.js initialization
            initialization();

			do_slide();

			$('#moveSectionUp').click(function(e){
				e.preventDefault();
				$.fn.fullpage.moveSectionUp();
			});

			$('#moveSectionDown').click(function(e){
				e.preventDefault();
				$.fn.fullpage.moveSectionDown();
			});

			$('#moveTo').click(function(e){
				e.preventDefault();
				$.fn.fullpage.moveTo(2, 3);
			});

			$('#silentMoveTo').click(function(e){
				e.preventDefault();
				$.fn.fullpage.silentMoveTo(1);
			});

			$('#setAutoScrollingTrue').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setAutoScrolling(true);
			});

			$('#setAllowScrollingTrue').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setAllowScrolling(true);
			});

			$('#setKeyboardScrollingTrue').click(function(e){
				e.preventDefault();
				$.fn.fullpage.setKeyboardScrolling(true);
			});

			$('#destroy').click(function(e){
				e.preventDefault();
				$.fn.fullpage.destroy('all');
			});

			$('#undestroy').click(function(e){
				e.preventDefault();

				//fullPage.js initialization
				initialization();
			});

			$('#reBuild').click(function(e){
				e.preventDefault();
				$.fn.fullpage.reBuild();
			});

			$('#setLockAnchorsTrue').click(function(e){
				e.preventDefault;
				$.fn.fullpage.setLockAnchors(true);
			});

			$('#setLockAnchorsFalse').click(function(e){
				e.preventDefault;
				$.fn.fullpage.setLockAnchors(false);
			});
        });