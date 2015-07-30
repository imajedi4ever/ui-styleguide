// Global javaScript for all views
$(document).ready(function() {
	bindHeaderNavEvents();
	bindPrimaryNavEvents();
	loadScreenContent();

	$( window ).resize( function() { togglePrimaryNavText(); } );
});

var bindHeaderNavEvents = function () {
	var headerNavLinks = $( "header a, header nav ul li, header nav ul li ul li" );
	
	headerNavLinks.on( "click", "a", function( event ) {
		event.preventDefault();
	});		
	
	// When header nav link is selected, load screen content via static HTML AJAX calls
	headerNavLinks.on( "mousedown", "a", function() {
		var targetUrl = $(this).attr( "href" );

		loadScreenContent( targetUrl, null );
	});
};

var bindPrimaryNavEvents = function () {
	togglePrimaryNavText();
	
	var primaryNavLinks = $( "#primary-nav ul li" );
	primaryNavLinks.on( "click", "a", function( event ) {
		event.preventDefault();	
	});	
	
	// When nav link is selected, load screen content via static HTML AJAX calls
	primaryNavLinks.on( "mousedown", "a", function() {
		var targetUrl = $(this).attr( "href" );
		var callbackFunctionList = $.Callbacks();
		
		$( "#primary-nav ul li a" ).removeClass( "active-nav" );
		$( "span.active-nav" ).remove();
		
		$( this ).addClass( "active-nav" );	
		$( this ).append( "<span class='active-nav'>&nbsp;</span>" );

 		// Add callbackFunctions (if needed)
		//switch ( targetUrl ) {
			//default:
			//	callbackFunctionList.add( loadDatamartInstanceTable );
		//};
			
		// Load the correct screen content and callbackfunction 
		loadScreenContent( targetUrl, callbackFunctionList );
	});
	
	$(".navbar-toggle-primary").click( function() { toggleMiniPrimaryNav(); } );
};

var toggleMiniPrimaryNav = function() { 
	// For responsive view, display or hide the mini, primary navigation bar 
	$("#main-section").toggleClass( "mini-primary-nav" );
	$("#primary-nav-wrapper").toggle( 200 );
	
	togglePrimaryNavText();
};

var togglePrimaryNavText = function () {
	// For responsive view, remove navigation text <span> 
	if ( $( "#primary-nav-wrapper" ).width() > 35 ) {
		$("#primary-nav > ul.main-menu > li > a span ").show(); 
	}
	else {
		$("#primary-nav > ul.main-menu > li > a span ").hide();
	}	
};

var loadLoginContent = function () {
	$( "body" ).load( contentUrl, function () { callbackFunctions.fire(); } );
};

var loadScreenContent = function ( targetUrl, callbackFunctions ) {
	if ( targetUrl ) {
		var contentUrl = "/ui-styleguide/resources/html/" + targetUrl + ".html";
		
		switch ( targetUrl ) {
			case "login": 
				$( "body" ).load( contentUrl );	
				$( "body" ).addClass( "login" );
			return;
		};
		
		if ( callbackFunctions ) {
			$( "#main-section" ).load( contentUrl, function () { callbackFunctions.fire(); } );
		} else {
			$( "#main-section" ).load( contentUrl, function () {} );
		}
	}
	else {
		$( "#main-section" ).load( "/ui-styleguide/resources/html/home.html", function() {} );
	} 
};
