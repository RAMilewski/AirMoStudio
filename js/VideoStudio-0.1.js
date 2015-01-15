// VideoStudio-0.1.js
// Copyright 2015 by Richard A. Milewski
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 

 
$( document ).ready(function() {
	
	var microphone = camera = slide = overlay = 0;
	var lastCamera = 9;
	
	var canvas = document.getElementById('pgmCanvas');
	var ctx = canvas.getContext("2d");
	var layer1 = document.getElementById('layer1');
	var layer2 = document.getElementById('layer2');
	var layer4 = document.getElementById('layer4');
	
	var nullImg = "./slides/blank.png";   
	
	var frame = 0 ;
	
	function drawFrame(){
			ctx.clearRect(0,0,1280,720);
			ctx.drawImage(layer1, 0, 0, 1280, 720, 0, 0, 1280, 720);
			
			if (layer2.readyState === layer2.HAVE_ENOUGH_DATA) {
				ctx.drawImage(layer2, 0, 0, layer2.videoWidth, layer2.videoHeight, 0, 0, 1280, 720);
			}
			
			ctx.drawImage(layer4, 0, 0, 1280, 720, 0, 0, 1280, 720);
			frameLoop();
	}

	function frameLoop () {
		frame++;
		requestAnimationFrame(drawFrame);
	}
	
	frameLoop();
	
	
	//Initialize 
	$("#mic0").addClass("activeMicrophone");  //auto-follow mode
	$("#slide0").addClass("activeLayer");
	$("#overlay0").addClass("activeLayer");
	$("#clip0").addClass("activeLayer");


	$( ".microphone" ).click(function( event ) {
		$(".microphone").removeClass("activeMicrophone");
	});
	
	$( "#mic0, #mic1, #mic2").click(function (event) {
		$(this).addClass("activeMicrophone");
		//microphone = (this.attr("id")substring-after(this.attr("id"), "#mic");
		microphone = parseInt($(this).attr("id").substr(3), 10);
		
		// Code here to select audio source
		// if microphone == 0, then use audio from current camera
	});
	
	$( ".cameraShot" ).click(function( event ) {
		$(".cameraShot").removeClass("activeCamera");
	});
	
	
	$( "#cam1, #cam2, #cam3").click(function( event ) {
		var element = $(this);
		camera = parseInt(element.attr("id").substr(3), 10);  //find the camera number
		
		if (camera === lastCamera) {
			element.removeClass("activeCamera");
			$("#layer2").attr("src", "");				// remove source from video layer
		} else {
			element.addClass("activeCamera");
			$("#layer2").attr("src", element.attr("src"));	//set video layer source to this camera
			lastCamera = camera;
		}
			
		// Code here to select video source
		// if microphone == 0, then use audio from current camera
	
	});
	
		
	
    $(".slide").on("click", function(e){  //background handler
		var element = $(this);
		var thisImage = element.attr("src");
		if (element.hasClass("activeLayer")) {		//Is alreay active so de-activate all.
			$("#layer1").attr("src", nullImg);
			element.removeClass("activeLayer");
		} else {
        	$(".slide").removeClass("activeLayer");	//clear the green borders
			element.addClass("activeLayer");		//make this slide active
			$("#layer1").attr("src", thisImage);	//set background layer source to this image
        }
	});
	

	
	$(".overlay").on("click", function(e){  //overlay handler
		var element = $(this);
		var thisImage = element.attr("src");
		if (element.hasClass("activeLayer")) {		//Is alreay active so de-activate all.
			$("#layer4").attr("src", nullImg);
			element.removeClass("activeLayer");
		} else {
        	$(".overlay").removeClass("activeLayer");	//clear the green borders
			element.addClass("activeLayer");			//make this overlay active
			$("#layer4").attr("src", thisImage);		//set overlay layer source to this image
        }
	});
	
	

	

});
