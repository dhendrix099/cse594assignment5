// INPUT: Gather input and update rotations/velocity/etc.  (This is through the use of github repository 'kibo')
// https://github.com/marquete/kibo.git


// PC INPUTS
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
console.log('Mobile device recognized');
// MOBILE INPUTS
$.mobile.defaultPageTransition   = 'none';
$.mobile.defaultDialogTransition = 'none';
$.mobile.buttonMarkup.hoverDelay = 0;

$(document).ready(function() {
  $(document).live('swiperight', function(event, data) {
    event.stopImmediatePropagation(); // to prevent "Double Event Firing" of a swipe event's function
    if(gameRunning && allowInput){
	  clearBlock(ctx, activeBlock);
	  activeBlock.moveRight();
	  activeBlock.draw();
    }
  });
  $(document).live('swipeleft', function(event, data) {
    event.stopImmediatePropagation(); // to prevent "Double Event Firing" of a swipe event's function
    if(gameRunning && allowInput){
	  clearBlock(ctx, activeBlock);
      activeBlock.moveLeft();
	  activeBlock.draw();
    }
  });
  $(document).live('tap', function(event, data) {
    event.stopImmediatePropagation(); // to prevent "Double Event Firing" of a swipe event's function
    if(gameRunning && allowInput){
	  clearBlock(ctx, activeBlock);
	  activeBlock.rotate();
	  activeBlock.draw();
    }
  });
  $(document).live('taphold', function(event, data) {
    event.stopImmediatePropagation(); // to prevent "Double Event Firing" of a swipe event's function
    if(gameRunning && allowInput){
	  activeBlock.fullDrop();
	  allowInput = false;
    }
  });
});
}
else{
console.log('Non-mobile device');
var k = new Kibo();
k.down(['left'], function () {
  if(gameRunning && allowInput){
	clearBlock(ctx, activeBlock);
	activeBlock.moveLeft();
	activeBlock.draw();
  }
});
k.down(['right'], function () {
  if(gameRunning && allowInput){
	clearBlock(ctx, activeBlock);
	activeBlock.moveRight();
	activeBlock.draw();
  }
});
k.down(['down'], function () {
  if(gameRunning && allowInput){
	clearBlock(ctx, activeBlock);
	activeBlock.moveDown();
	activeBlock.draw();
  }
});
k.down(['up'], function () {
  if(gameRunning && allowInput){
	clearBlock(ctx, activeBlock);
	activeBlock.rotate();
	activeBlock.draw();
  }
});
k.down(['p'], function () {
  if(gameRunning && allowInput){
	gameRunning = false;
 }
});
k.down(['space'], function () {
  if(gameRunning && allowInput){
	activeBlock.fullDrop();
	allowInput = false;
 }
});
k.down(['enter'], function () {
  if(gameRunning && allowInput){
	swapBlocks();
 }
});
}
