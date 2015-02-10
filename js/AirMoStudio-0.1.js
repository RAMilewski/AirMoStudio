// VideoStudio-0.1.js
// Copyright 2015 by Richard A. Milewski
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 

 
$( document ).ready(function() {
	
	
	//JQuery UI initialization
	
	$( "#tabs" ).tabs();
	
	// End JQuery UI init
	
	
	var microphone = 0;
	var camera = 0;
	var slide = 0;
	var overlay = 0;
	var lastCamera = -1;
	var stream = false;
	var recordRemote = false;
	var recordLocal = false;
	var aspectRatio = 16/9;
	var mediapath = "./media/16x9/";
	
	var canvas = document.getElementById('pgmCanvas');
	var ctx = canvas.getContext("2d");
	canvas.mozOpaque = true;
	
	var layer1 = document.getElementById('layer1');
	layer1.valid = false;
	var layer2 = document.getElementById('layer2');
	var layer3 = document.getElementById('layer3');
	layer3.valid = false;
	
	var format = new Object();
	
	
	function setFormat(theFormat) {	
		format.height = theFormat;
		format.width = parseInt((format.height * aspectRatio), 10);
		format.mediaWidth = parseInt((720 * aspectRatio), 10);
		$(".layer").attr("height", format.height);
		$(".layer").attr("width", format.width);
		canvas.height = format.height;
		canvas.width  = format.width;
		$("#fmt"+theFormat).addClass("activeButtonGreen");
		console.log(format.width, format.height, format.mediaWidth);
	}  
	
	
	function setAspect(theRatio) {
		
		if (theRatio == "4/3") {

			aspectRatio = 4/3;
			$(".aspect").removeClass("AR16x9");
			$(".aspect").addClass("AR4x3");
			mediapath = "./media/4x3/";
			
			
		} else {
			
			aspectRatio = 16/9;
			$(".aspect").removeClass("AR4x3");
			$(".aspect").addClass("AR16x9");
			mediapath = "./media/16x9/";
		}
		
		
		console.log(theRatio, aspectRatio, format.height);
		setFormat(format.height);
		
		for (var i=1; i<7; i++) {    // This is a temporary hack - media source paths and names should be stored in local storage.
			$("#slide"+i).attr("src", mediapath + "slides/slide"+i+".png");
			$("#slideSrc"+i).attr("src", mediapath + "slides/slide"+i+".png");
			$("#overlay"+i).attr("src", mediapath + "overlays/overlay"+i+".png");
			$("#overlaySrc"+i).attr("src", mediapath + "overlays/overlay"+i+".png");
		
		}
	}
	
	layer1.onload = function(){
			layer1.valid = true;
	};
	
	layer3.onload = function(){
			layer3.valid = true;
	};
	
	function drawFrame(){
		
			ctx.clearRect(0, 0, format.width, format.height);
			
			if (layer1.valid) {
				ctx.drawImage(layer1, 0, 0, format.mediaWidth, 720, 0, 0, format.width, format.height);
			}
			
			if (layer2.readyState === layer2.HAVE_ENOUGH_DATA) {
				ctx.drawImage(layer2, 0, 0, layer2.videoWidth, layer2.videoHeight, 0, 0, format.width, format.height);
			}
			
			if (layer3.valid) {
				ctx.drawImage(layer3, 0, 0, format.mediaWidth, 720, 0, 0, format.width, format.height);
			}
			
			requestAnimationFrame(drawFrame);
	}

	
	drawFrame();
	
	
	//Initialize 
	setFormat(720);
	setAspect("16/9");
	$("#fmt720").addClass("activeButtonGreen");
	$("#aspect16x9").addClass("activeButtonGreen");
	microphone = 0;
	$("#mic0").addClass("activeButtonGreen");   //auto-follow mode
	

	$( ".microphone" ).click(function( event ) {
		$(".microphone").removeClass("activeButtonGreen");
	});
	
	$( "#mic0, #mic1, #mic2").click(function (event) {
		$(this).addClass("activeButtonGreen");
		//microphone = (this.attr("id")substring-after(this.attr("id"), "#mic");
		microphone = parseInt($(this).attr("id").substr(3), 10);
		
		// Code here to select audio source
		// if microphone == 0, then use audio from current camera
	});
	

	
	$( "#stream").click(function (event) {
		if (!stream) {
			$(this).addClass("activeButtonRed");
			stream = true;
			//code here to turn stream on.
		} else {
			stream = false;
			$(this).removeClass("activeButtonRed");
			// code here to turn stream off.	
		}
	});
	
	$( "#recordLocal").click(function (event) {
		if (!recordLocal) {
			$(this).addClass("activeButtonRed");
			recordLocal = true;
			//code here to start local recording.
		} else {
			$(this).removeClass("activeButtonRed");
			recordLocal = false;
			// code here to end local recording.	
		}
	});

	$( "#recordRemote").click(function (event) {
		if (!recordRemote) {
			$(this).addClass("activeButtonRed");
			recordRemote = true;
			//code here to start remote recording.
		} else {
			$(this).removeClass("activeButtonRed");
			recordRemote = false;
			// code here to end remote recording.	
		}
	});
	
	
	
	$( ".format" ).click(function( event ) {
		var element = $(this);
		$(".format").removeClass("activeButtonGreen");
		element.addClass("activeButtonGreen");
		setFormat(parseInt(element.attr("data-format"),10));
	});
	
	
	$( ".btnAspect" ).click(function( event ) {
		var element = $(this);
		$(".btnAspect").removeClass("activeButtonGreen");
		element.addClass("activeButtonGreen");
		setAspect(element.attr("data-aspect"));
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
		layer3.valid = false;							//mark layer as empty until the next load completes.
		var element = $(this);
		var thisImage = element.attr("src");
		if (element.hasClass("activeLayer")) {			//Is already active so de-activate all.
			element.removeClass("activeLayer");
		} else {
			$(".overlay").removeClass("activeLayer");	//clear the green borders
			element.addClass("activeLayer");			//make this overlay active
			layer3.src = thisImage;						//set overlay layer source to this image
        }
	});
	
	
	$(".connection").on("click", function(e){
		var element = $(this);
		$(".connection").removeClass("activeButtonGreen");
		$("#qrWindow").html(""); //clear any existing QR canvas
		element.addClass("activeButtonGreen");
		var QRdata = $("#address").val() + "?input='"+element.attr("data-connect")+"'";
		console.log(QRdata);
		$("#qrWindow").qrcode(QRdata); //Show the new QR code on a canvas
	});
	

});
