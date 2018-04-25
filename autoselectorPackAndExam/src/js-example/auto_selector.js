/**
 * Plugin wrapper.
 * @param {Object} config_opts configuration options
 * @constructor
 */
annotorious.plugin.autoSelector = function(config_opts) { 
  if (config_opts)
    this._activate = config_opts.activate;
}

/**
 * Attach a new selector onInitAnnotator.
 */
annotorious.plugin.autoSelector.prototype.onInitAnnotator = function(annotator) {
  annotator.addSelector(new annotorious.plugin.autoSelector.Selector());
  if (this._activate)
    annotator.setCurrentSelector('rect');
}

/**
 * A autosel selector.
 * @constructor
 */
annotorious.plugin.autoSelector.Selector = function() { }

annotorious.plugin.autoSelector.Selector.prototype.init = function(annotator, canvas) {
  /** @private **/
  this._annotator = annotator;
  //console.log(annotator);

  /** @private **/
  this._canvas = canvas;  
  //console.log("canvas", canvas);

  /** @private **/
  this._g2d = canvas.getContext('2d');
  
  /** @private **/
  this._anchor;
  
  /** @private **/
  this._points = [];

  /** @private **/
  this._mouse;

  /** @private **/
  this._enabled = false;

  /** @private **/
  this._mouseUpListener;

}

/*
 * attach Handler.
 */
annotorious.plugin.autoSelector.Selector.prototype._attachListeners = function() {
  var self = this; 
  this._mouseUpListener = function(event){
    var shape = self.getShape();
      if(shape){
        self._enable = false;
        self.drawRect(self._anchor.x, self._anchor.y);
        
        try{
          self._annotator.fireEvent("onSelectionCompleted", 
          {mouseEvent:event, shape:shape, viewportBounds: self.getViewportBounds()});
          console.log("mission completed");
          console.log(shape);
          console.log(self.getViewportBounds());
        } catch(err){
          console.log("fireEvent Error",err);
        }
      } else {
        self._annotator.fireEvent("onSelectionCanceled");
      }		
  };
  this._canvas.addEventListener('mouseup', this._mouseUpListener);	
}


/*
 * detach Handler.
 */
annotorious.plugin.autoSelector.Selector.prototype._detachListeners = function() {
  var self = this;
  if (this._mouseMoveListener) {
     this._canvas.removeEventListener("mousemove", self._mouseMoveListener);
  }
  if (this._mouseUpListener) {
     this._canvas.removeEventListener("mouseup", self._mouseUpListener);
  }
}

annotorious.plugin.autoSelector.Selector.prototype.getName = function() {
  return 'rect';
}


/*
 * become view for area that is selection sample.
 */
annotorious.plugin.autoSelector.Selector.prototype.drawRect = function(click_x, click_y){

  this._g2d.strokeStyle = "#35E5F1";
  this._g2d.lineWidth = 6;

  var x = click_x - 240;
  var y = click_y - 240;
  var w = 480;
  var h = 480;

  if( x < 0 ){
    x = 0;
  }
  if( y < 0) {
    y = 0;
  }
  this._g2d.strokeRect(x, y, w, h);
  return {x : x, y : y, w : w, h : h};
  
}

annotorious.plugin.autoSelector.Selector.prototype.clearRect = function(){
  this._g2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

annotorious.plugin.autoSelector.Selector.prototype.getSupportedShapeType = function() {
  return 'rect';
}

annotorious.plugin.autoSelector.Selector.prototype.startSelection = function(x, y) {
  console.log("start autoSelect!!");
  this._enabled = true;
  this._anchor = { x : x,
                   y : y};
  this._attachListeners();
}

annotorious.plugin.autoSelector.Selector.prototype.stopSelection = function() {
  var self = this;
  self.clearRect();
  delete this._anchor;
}

/*
 * get gemoetry for drawing tagbox
*/
annotorious.plugin.autoSelector.Selector.prototype.getShape = function() {
  console.log("init getShape function");

  var points = [];
  points.push(this._annotator.toItemCoordinates(this._anchor));
  
  // if overfited (x or y) than (width or height), do checked below
  var x = (this._anchor.x - 240) / this._canvas.width;
  if(x < 0){
    x = 0;
  }
  else if ( x + (480/this._canvas.width) > 1 ){
    x = 1 - (480/this._canvas.width);
  } 
  var y = (this._anchor.y - 240 )/ this._canvas.height;
  if(y < 0){
    y = 0;
  }
  else if ( y + (480/this._canvas.height) > 1 ){
    y = 1 - (480 / this._canvas.height);
  }

  var testmetry = { x: x, 
                    y: y, 
                    width: 480 / this._canvas.width, 
                    height: 480 / this._canvas.height};
  
  return { type: 'rect', geometry: { x: testmetry.x, y: testmetry.y, width: testmetry.width, height: testmetry.height } };
}


annotorious.plugin.autoSelector.Selector.prototype.getViewportBounds = function() {

/** set Veiwport location 
    1) set Tagging tool
    2) get tag box size.
**/

  var right = (this._anchor.x - 240); /// this._canvas.width;
  var left = (this._anchor.x + 240); // / this._canvas.width;
  var top = (this._anchor.y + 240); // / this._canvas.height;
  var bottom = (this._anchor.y - 240); // / this._canvas.height;


  if(right < 0){
    right = 0;
  }

  if(bottom < 0){
    bottom = 0;
  }

 
  var x = { top: top, right: right, bottom: bottom, left: left};
  // var x = { top: 0, right: 0.2, bottom: 0.2, left: 0}; //test
  console.log("getViewBinding",x);
  return x 
}


/** no more to need.
 
annotorious.plugin.autoSelector.Selector.prototype.drawShape = function(g2d, shape, highlight) {
  
  // TagBox UI Rectangle
  var self = this;
  console.log("drawShape!!", shape);
  var x = shape.geometry.points[0].x - 240;
  var y = shape.geometry.points[0].y - 240;
  if( x < 0 ){
    x = 0;
  }
  else if ( x > this._canvas.width){
    x = this._canvas.width;
  }
    
  if( y < 0) {
    y = 0;
  }

  console.log("get start drawShape");
  var keyBuff = { x : x,
                  y : y,
                  w : 480,
                  h : 480};

  this._rectArray.push(keyBuff);

  g2d.lineWidth = 2.3;
  g2d.strokeStyle = "#FA0101";
  g2d.beginPath();
  for(var i = 0; i < this._rectArray.length; i++){
    console.log("drawStarted");
    g2d.strokeRect(self._rectArray[i].x, self._rectArray[i].y, self._rectArray[i].w, self._rectArray[i].h);

  }
}

**/
