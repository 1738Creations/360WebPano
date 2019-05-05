function afterLoad() {
	var targetObject = document.getElementsByClassName('ts-pano-area')[0];
	
	var controlBackground = document.getElementById('ts-pano-controls');
	var controlButtonLeft = document.getElementById('ts-btn-l');
	var controlButtonStop = document.getElementById('ts-btn-s');
	var controlButtonRight = document.getElementById('ts-btn-r');
	
	var moveFlag = 0;
	var autoScrollAmount = 10;
	var autoScrollCurrent = 0;
	var isAutoPlaying = false;
	var i_MoveCounter = 0;
	var i_FinalPos = 0;


// MOBILE
	// Start on tap down
	targetObject.addEventListener("touchstart", function(e){
		moveFlag = 1;

		// Get original bg position
		s_FullText = window.getComputedStyle(targetObject).getPropertyValue("background-position");
		i_OrigBgPosition = parseInt(s_FullText.substring(0, s_FullText.indexOf("px")));

		// Reset stored mouse x positions
		i_MousePosOrig = parseInt(e.touches[0].clientX);
		i_MousePosCurr = parseInt(e.touches[0].clientX);

		tsMainLoop();	
	}, false);


	// Get cursor position on move
	targetObject.addEventListener("touchmove", function(e){
		if(moveFlag == 1){
			i_MousePosCurr = parseInt(e.touches[0].clientX);
		}

		// prevent mouse interactions when using tap
		e.preventDefault();
	}, false);


	// Get cursor position on move
	targetObject.addEventListener("touchend", function(e){
		moveFlag = 0;
		i_MoveCounter = 0;
	}, false);


	// Get cursor position on move
	targetObject.addEventListener("touchcancel", function(e){
		moveFlag = 0;
		i_MoveCounter = 0;
	}, false);
// END MOBILE


// DESKTOP
	// Start on mouse down
	targetObject.addEventListener("mousedown", function(e){
		moveFlag = 1;

		// Get original bg position
		s_FullText = window.getComputedStyle(targetObject).getPropertyValue("background-position");
		i_OrigBgPosition = parseInt(s_FullText.substring(0, s_FullText.indexOf("px")));

		// Reset stored mouse x positions
		i_MousePosOrig = parseInt(e.clientX);
		i_MousePosCurr = parseInt(e.clientX);

		tsMainLoop();
	}, false);


	// Get cursor position on move
	targetObject.addEventListener("mousemove", function(e){
		if(moveFlag == 1){
			i_MousePosCurr = parseInt(e.clientX);
		}
	}, false);


	// Stop on mouse up
	targetObject.addEventListener("mouseup", function(e){
		moveFlag = 0;
		i_MoveCounter = 0;
	}, false);


	// Stop on leaving container
	targetObject.addEventListener("mouseout", function(){
		moveFlag = 0;
		i_MoveCounter = 0;
	}, false);
// END DESKTOP


// MAIN - called from HTML
	function tsMainLoop() {
		
		autoScrollCurrent = 0;
		
		if (moveFlag == 1) {

			// Smoothes and gives bigger drag margin
			// Increase '30' to scroll faster
			i_ImageXAdjustment = (i_MousePosOrig - i_MousePosCurr) / 30;

			// Calculate whether to scroll left or right
			// '30' is the threshold between current and last mouse/tap drag positions
			// lower this value to prevent extreme spins
			if (i_ImageXAdjustment > 30) {
				i_ImageXAdjustment = 30;
			} else if (i_ImageXAdjustment < -30) {
				i_ImageXAdjustment = -30;
			}

			// Update stored positions for adjustments in next frame
			i_MoveCounter -= i_ImageXAdjustment;
			i_FinalPos = i_OrigBgPosition + i_MoveCounter;

			// Change image position
			targetObject.style.backgroundPosition = i_FinalPos.toString() + "px 0px";

			// Delay between image move in milliseconds (5)
			// Think of it as framerate - lower is faster but more processing
			setTimeout(function MainLoopRepeat() {
				tsMainLoop();
			}, 5);
		
		}
	};

	
	
// CONTROL AREA

	// prevent click-through on the control area
	controlBackground.addEventListener("mousedown", function(e){
		e.stopPropagation();
	}, false);


	// LEFT
	controlButtonLeft.addEventListener("click", function(e){
		autoScrollCurrent += autoScrollAmount;
		if (isAutoPlaying == false) {
			isAutoPlaying = true;
			tsButtonLoop();			
		}
	}, false);
	
	
	// STOP
	controlButtonStop.addEventListener("click", function(e){
		autoScrollCurrent = 0;
	}, false);
	
	
	// RIGHT
	controlButtonRight.addEventListener("click", function(e){
		autoScrollCurrent -= autoScrollAmount;
		if (isAutoPlaying == false) {
			isAutoPlaying = true;
			tsButtonLoop();
		}
	}, false);

	
	function tsButtonLoop() {

		if (autoScrollCurrent == 0) {
			isAutoPlaying = false;
		}
		else {
			i_FinalPos = i_OrigBgPosition + autoScrollCurrent;
			
			// Change image position
			targetObject.style.backgroundPosition = i_FinalPos.toString() + "px 0px";
			
			i_OrigBgPosition = i_FinalPos;

			// Delay between image move in milliseconds (5)
			// Think of it as framerate - lower is faster but more processing
			setTimeout(function MainLoopRepeat() {
				tsButtonLoop();
			}, 5);
		
		};
	};


}