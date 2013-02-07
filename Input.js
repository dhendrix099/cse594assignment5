// INPUT: Gather input and update rotations/velocity/etc.  (This is through the use of github repository 'kibo')
// https://github.com/marquete/kibo.git

$(document).ready(function() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { // MOBILE INPUTS
    console.log('Mobile device recognized');
    $.mobile.defaultPageTransition   = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.buttonMarkup.hoverDelay = 0;
    $(document).bind('swiperight', function(event, data) {
      event.stopImmediatePropagation(); // to prevent "Double Event Firing" of a swipe event's function
      inpRight();
    });
    $(document).bind('swipeleft', function(event, data) {
      event.stopImmediatePropagation();
      inpLeft();
    });
    $(document).bind('tap', function(event, data) {
      event.stopImmediatePropagation();
      inpRotate();
    });
    $(document).bind('taphold', function(event, data) {
      event.stopImmediatePropagation();
      inpDrop();
    });
  }
  else { // PC INPUTS
    console.log('Non-mobile device');
    var k = new Kibo();
    k.down(['left'], inpLeft);
    k.down(['right'], inpRight);
    k.down(['down'], inpDown);
    k.down(['up'], inpRotate);
    k.down(['p'], inpPause);
    k.down(['space'], inpDrop);
    k.down(['enter'], inpSwap);
  }
});

// Input definitions
inpRight = function() {
  if(gameRunning && allowInput){
	clearBlock(ctx, activeBlock);
	activeBlock.moveRight();
	activeBlock.draw();
  }
}
inpLeft = function() {
  if(gameRunning && allowInput){
	clearBlock(ctx, activeBlock);
	activeBlock.moveLeft();
	activeBlock.draw();
  }
}
inpRotate = function() {
  if(gameRunning && allowInput){
	clearBlock(ctx, activeBlock);
	activeBlock.rotate();
	activeBlock.draw();
  }
}
inpDown = function() {
  if(gameRunning && allowInput){
	clearBlock(ctx, activeBlock);
	activeBlock.moveDown();
	activeBlock.draw();
  }
}
inpDrop = function() {
  if(gameRunning && allowInput){
	activeBlock.fullDrop();
	allowInput = false;
  }
}
inpSwap = function() {
  if(gameRunning && allowInput){
	swapBlocks();
  }
}
inpPause = function() {
  console.log('pause');
  if(gameRunning && allowInput){
	gameRunning = false;
  }
  else {
	gameRunning = true;
	setTimeout("tetrisLoop()", INTERVAL);
  }
}