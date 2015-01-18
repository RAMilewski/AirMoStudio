// VideoStudio-0.1.js
// Copyright 2015 by Richard A. Milewski
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 

 
$( document ).ready(function() {
	
	var format = new Object;
	format.name = "360p";
	
	var microphone = camera = slide = overlay = 0;
	var lastCamera = -1;
	
	var canvas = document.getElementById('pgmCanvas');
	var ctx = canvas.getContext("2d");
	var layer1 = document.getElementById('layer1');
	layer1.valid = false;
	var layer2 = document.getElementById('layer2');
	var layer4 = document.getElementById('layer4');
	layer4.valid = false;
	
	switch (format.name) {
		case "360p":
			format.width = 640;
			format.height = 360;
		break;
		
		case "720p":
			format.width = 1280;
			format.height = 720;
		break;
		
		case "1080p":
			format.width = 1920;
			format.height = 1080;
	}  
	
	$(".layer").attr("height", format.height);
	$(".layer").attr("width", format.width);
	
	var frame = 0 ;
	
	layer1.onload = function(){
			layer1.valid = true;
	};
	
	layer4.onload = function(){
			layer4.valid = true;
	};
	
	function drawFrame(){
		
			ctx.clearRect(0, 0, format.width, format.height);
			
			if (layer1.valid) {
				ctx.drawImage(layer1, 0, 0, layer1.width, layer1.height, 0, 0, format.width, format.height);
			}
			
			if (layer2.readyState === layer2.HAVE_ENOUGH_DATA) {
				ctx.drawImage(layer2, 0, 0, layer2.videoWidth, layer2.videoHeight, 0, 0, format.width, format.height);
			}
			
			if (layer4.valid) {
				ctx.drawImage(layer4, 0, 0, layer4.width, layer4.height, 0, 0, format.width, format.height);
			}
			
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
			lastCamera = -1;
		} else {
			element.addClass("activeCamera");
			$("#layer2").attr("src", element.attr("src"));	//set video layer source to this camera
			lastCamera = camera;
		}
			
		// Code here to select video source
		// if microphone == 0, then use audio from current camera
	
	});
	
		
	
		$(".slide").on("click", function(e){		//background handler
        layer1.valid = false;						//mark layer as empty until the next load completes.
		var element = $(this);
		var thisImage = element.attr("src");
		if (element.hasClass("activeLayer")) {		//Is already active so de-activate all.
			element.removeClass("activeLayer");
		} else {
			$(".slide").removeClass("activeLayer");	//clear the green borders
			element.addClass("activeLayer");		//make this slide active
			layer1.src = thisImage;					//set background layer source to this image
        }
	});
	

	
	$(".overlay").on("click", function(e){				//overlay handler
		layer4.valid = false;							//mark layer as empty until the next load completes.
		var element = $(this);
		var thisImage = element.attr("src");
		if (element.hasClass("activeLayer")) {			//Is already active so de-activate all.
			element.removeClass("activeLayer");
		} else {
			$(".overlay").removeClass("activeLayer");	//clear the green borders
			element.addClass("activeLayer");			//make this overlay active
			layer4.src = thisImage;						//set overlay layer source to this image
        }
	});
	
	

	

});
