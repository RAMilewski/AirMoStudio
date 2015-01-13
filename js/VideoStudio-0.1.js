// VideoStudio-0.1.js
// Copyright 2015 by Richard A. Milewski
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 

 
$( document ).ready(function() {
	
	var microphone = 0;
var camera     = 0;
var layer0source = "";
var layer1source = "";
var layer2source = "";
var layer3source = "";
var layer4source = "";
var layer5source = "";
var canvas = $("#programCanvas");
var ctx = canvas.getContext("2d");
var image = document.getElementById('source');
/*
ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);

function redraw(){
	ctx.drawImage(layer0source, 0, 0, 100%, 100%, 0, 0, 100%, 100%);
	ctx.drawImage(layer4source, 0, 0, 100%, 100%, 0, 0, 100%, 100%);
}

*/
	
	//Initialize in audo-follow mode
	$("#mic0").addClass("activeMicrophone");
	


	$( ".microphone" ).click(function( event ) {
		$(".microphone").removeClass("activeMicrophone");
	});
	
	$( "#mic0, #mic1, #mic2").click(function (event) {
		$(this).addClass("activeMicrophone");
		//microphone = (this.attr("id")substring-after(this.attr("id"), "#mic");
		microphone = parseInt($(this).attr("id").substr(3));
		
		// Code here to select audio source
		// if microphone == 0, then use audio from current camera
		
	});
	
	$( ".camera" ).click(function( event ) {
		$(".camera").removeClass("activeCamera");
	});
	
	$( "#cam1, #cam2, #cam3").click(function (event) {
		$(this).addClass("activeCamera");
		camera = parseInt($(this).attr("id").substr(3));
		console.log("camera: "+camera);
		
		// Code here to select video source
		// if microphone == 0, then use audio from current camera
		
	});
	
         
	
    $(".overlay, .slide").on("click", function(e){  //background and overlay handler
	    
	    var element = $(this);
	    var elementClass = element.attr("class");
		var thisImage = element.attr("src");
        
        $("."+elementClass).removeClass("activeLayer");	//deselect all images of this class
        
        if (elementClass == "slide") {
            layer0source = thisImage;         			//set background layer source to this image
        } else {
            layer4source = thisImage;					//set overlay layer source to this image
        }
        element.addClass("activeLayer"); 			 	//highlight this element
        
        var thisImage = element.attr("src");
        $('#layer1').attr("src", thisImage);    	 //set PGM overlay layer to this overlay
           	
	});
	

	

});
