function thumbnamePut(){
    //데이터 리드 구현.
    var imgInfoObj

    imgInfoObj = getImageList();
    imgInfoObj.imglist.forEach(imgObj => {
    console.log(imgInfoObj.path.concat(imgObj.name));
    	/*
    		{name : "", Done : "false or true"}
    	*/
    	var tag = '<div data-p="30.00"> <img data-u="image" src="'+ imgInfoObj.path.concat(imgObj.name) +'" style="width:250px" hspace=10 onclick=thumbClick(' + imgObj.name +');> </div>'
    	
      // create thumbnail.
      $("#thumbnail_area").append(tag);

    });

    thumbnail_start();
}

function thumbClick(imageName){
	alert("click name : " + imageName);
}

function thumbnail_start(){
  var jssor_1_options = {
              //$AutoPlay: 1,
              $Idle: 0,
              //$SlideDuration: 5000,
              //$SlideEasing: $Jease$.$Linear,
              //$PauseOnHover: 4,
              $SlideWidth: 140,
              $Align: 0
          };

  var jssor_1_slider = new $JssorSlider$("thumbnail_block", jssor_1_options);

          /*#region responsive code begin*/

  var MAX_WIDTH = 980;

            //$(window).bind("load", ScaleSlider);
            //$(window).bind("resize", ScaleSlider);
            //$(window).bind("orientationchange", ScaleSlider);
            /*#endregion responsive code end*/
}
