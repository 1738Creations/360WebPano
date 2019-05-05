function afterLoad() {
	var targetObject = document.getElementsByClassName('bg-test')[0];

	// Put the ID's of the scroll areas in this array
	var targetObjects = ['bg-test', 'bg-testt'];
	var targetObjectsCount = targetObjects.length;

	var moveFlag = 0;
	var i_MoveCounter = 0;
	var i_FinalPos = 0;
	var ts_focused = '';

	// We'll set a listener for each item in the array
	targetObjects.forEach(function(item) {
		CurrentTargetObject = document.getElementsByClassName(item)[0];

// MOBILE
		// Start on tap down
		CurrentTargetObject.addEventListener("touchstart", function(e){
			moveFlag = 1;
			
			// Set the ID of the pano clicked
			// If not, the last one added from the array would be used
			ts_focused = this.id;

			// Get original bg position
			s_FullText = window.getComputedStyle(CurrentTargetObject).getPropertyValue("background-position");
			i_OrigBgPosition = parseInt(s_FullText.substring(0, s_FullText.indexOf("px")));

			// Reset stored mouse x positions
			i_MousePosOrig = parseInt(e.touches[0].clientX);
			i_MousePosCurr = parseInt(e.touches[0].clientX);

			tsMainLoop();
		}, false);


		// Get cursor position on move
		CurrentTargetObject.addEventListener("touchmove", function(e){
			if(moveFlag == 1){
				i_MousePosCurr = parseInt(e.touches[0].clientX);
			}

			// prevent mouse interactions when using tap
			e.preventDefault();
		}, false);


		// Get cursor position on move
		CurrentTargetObject.addEventListener("touchend", function(e){
			moveFlag = 0;
			i_MoveCounter = 0;
		}, false);


		// Get cursor position on move
		CurrentTargetObject.addEventListener("touchcancel", function(e){
			moveFlag = 0;
			i_MoveCounter = 0;
		}, false);
// END MOBILE


// DESKTOP
		// Start on mouse down
		CurrentTargetObject.addEventListener("mousedown", function(e){
			moveFlag = 1;
			
			// Set the ID of the pano clicked
			// If not, the last one added from the array would be used
			ts_focused = this.id;

			// Get original bg position
			document.getElementsByClassName(item)[0];
			
			CurrentTargetObject = document.getElementsByClassName(ts_focused)[0];
			
			s_FullText = window.getComputedStyle(CurrentTargetObject).getPropertyValue("background-position");
			i_OrigBgPosition = parseInt(s_FullText.substring(0, s_FullText.indexOf("px")));

			// Reset stored mouse x positions
			i_MousePosOrig = parseInt(e.clientX);
			i_MousePosCurr = parseInt(e.clientX);

			tsMainLoop();		
		}, false);


		// Get cursor position on move
		CurrentTargetObject.addEventListener("mousemove", function(e){
			if(moveFlag == 1){
				i_MousePosCurr = parseInt(e.clientX);
			}
		}, false);


		// Stop on mouse up
		CurrentTargetObject.addEventListener("mouseup", function(){
			moveFlag = 0;
			i_MoveCounter = 0;
		}, false);


		// Stop on leaving container
		CurrentTargetObject.addEventListener("mouseout", function(){
			moveFlag = 0;
			i_MoveCounter = 0;
		}, false);
// END DESKTOP


// MAIN
		function tsMainLoop() {
			if (moveFlag == 1) {

				// Smoothes and gives bigger drag margin
				// Increase '30' to scroll faster
				i_ImageXAdjustment = (i_MousePosOrig - i_MousePosCurr) / 30;

				// Calculate whether to scroll left or right
				// '30' is the threshold between current and last mouse/tap drag positions
				if (i_ImageXAdjustment > 30) {
					i_ImageXAdjustment = 30;
				} else if (i_ImageXAdjustment < -30) {
					i_ImageXAdjustment = -30;
				}

				// Update stored positions for adjustments in next frame
				i_MoveCounter -= i_ImageXAdjustment;
				i_FinalPos = i_OrigBgPosition + i_MoveCounter;

				// Change image position
				CurrentTargetObject.style.backgroundPosition = i_FinalPos.toString() + "px 0px";

				// Delay between image move in milliseconds (5)
				// Think of it as framerate - lower is faster but more processing
				setTimeout(function MainLoopRepeat() {tsMainLoop();}, 5);
			}
		}

	});
}