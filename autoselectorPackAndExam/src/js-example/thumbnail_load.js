function thumbnamePut() {
  //데이터 리드 구현.
  var imgInfoObj

  imgInfoObj = getImageList();
  console.log(imgInfoObj.imglist);
  imgInfoObj.imglist.forEach(img => {
    /*
      {name : "", Done : "false or true"}
    */ 
    const name = img.M.name.S;
    console.log(imgInfoObj.path, name);
    var tag = '<div data-p="30.00"> <img data-u="image" src="' + imgInfoObj.path.concat(name) + 
              '" style="width:250px" hspace=10 onclick=thumbClick("' + 
              imgInfoObj.path.concat(name) + '");> </div>'
    // create thumbnail.
    $("#thumbnail_area").append(tag);

  });

  thumbnail_start();
}

function thumbClick(imgPath) {
  //Image Changer.
  $(".annotorious-annotationlayer").remove()
  .promise().done($("#block").append('<img id="preview" src="' + imgPath + '" width="100%" height="100%">'))
  .promise().done(init());
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
