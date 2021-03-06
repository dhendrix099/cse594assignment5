// INPUT: Gather input and update rotations/velocity/etc.  (This is through the use of github repository 'kibo')
// https://github.com/marquete/kibo.git
$(document).ready(function() {
  var originalX = 0;
  var originalY = 0;
  var moved = false;
  var windowWidthOffset = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var windowHeightOffset = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  windowWidthOffset = Math.floor(windowWidthOffset * 0.075);
  windowHeightOffset = Math.floor(windowHeightOffset * 0.075);
  window.onload = function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { // MOBILE INPUTS
      console.log('Mobile device recognized');
      window.addEventListener('touchstart', function(event) {
        event.preventDefault();
        originalX = event.touches[0].screenX;
        originalY = event.touches[0].screenY;
      });
      window.addEventListener('touchmove', function(event) {
        event.preventDefault();
        var newX = event.touches[0].screenX;
        var newY = event.touches[0].screenY;
      
        if ( newY >= originalY+windowHeightOffset ) { // scrolling down
          inpDown();
          originalX = newX;
          originalY = newY;
          moved = true;
        }
        
        if ( newX <= originalX-windowWidthOffset ) { // scrolling left
          inpLeft();
          originalX = newX;
          originalY = newY;
          moved = true;
        }
        
        if( newX >= originalX+windowWidthOffset ) { // scrolling right
          inpRight();
          originalX = newX;
          originalY = newY;
          moved = true;
        }
      });
      window.addEventListener('touchend', function(event) {
        event.preventDefault();
        if(moved === false) {
          if( originalX+windowWidthOffset >= event.changedTouches[0].screenX && originalX-windowWidthOffset <= event.changedTouches[0].screenX) {
            if( originalY+windowHeightOffset >= event.changedTouches[0].screenY && originalY-windowHeightOffset <= event.changedTouches[0].screenY) inpRotate();
          }
        }
        originalY = 0;
        originalY = 0;
        moved = false;
      });
    }
    else {
      // PC INPUTS
      console.log('Desktop/non-touchscreen device');
      var k = new Kibo();
      k.down(['left'], inpLeft);
      k.down(['right'], inpRight);
      k.down(['down'], inpDown);
      k.down(['up'], inpRotate);
      k.down(['p'], inpPause);
      k.down(['space'], inpDrop);
      k.down(['enter'], inpSwap);
    }
    tetrisLoop();
  };
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