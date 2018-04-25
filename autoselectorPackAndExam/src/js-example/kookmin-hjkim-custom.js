// create by hjKim. KOOKMIN UNIV.
// Annotorious Coustom version.
// + autu_selector.js <-- applied prototype annotorious.

/* Annotorious Initialize */
var init = function init(){
	anno.makeAnnotatable(document.getElementById('testimage'));
	importPatternListID();
	//autoSelector
	anno.addPlugin('autoSelector', { activate: true });
//	anno.addPlugin('PolygonSelector', { activate: true });

	anno.addHandler('onAnnotationCreated', function(annotation){
		//console.log(annotation.text);
		getData(annotation);
	});
	anno.addHandler('onAnnotationUpdated', function(annotation){
		deleteData(annotation);
		getData(annotation);
	});
	
	
	var isDragging = false;
	var isMouseDown = false;
	$("#block")
 	.mouseup(function(){
		isMouseDown = false;
 	})
 	.mousedown(function(){
		console.log("click");
		isMouseDown = true;
 	}).
 	mousemove(function(){
		isDragging = true;
		if(isDragging == true && isMouseDown == true){
			onClickedDragListener();
			console.log("click and drage");
		}
 	});
	
	function onClickedDragListener(){
		console.log(anno.addPlugin());
	}
};

/* delet annotation data */
function deleteData(annotation){

        text = annotation.text
        sourceImage = annotation.src;
        geometry = annotation.shapes[0].geometry;
	var name = sourceImage.split("/");
	var url = window.location.href + "jsondata/" +
		name[name.length-1].split(".")[0] + ".json";
	
	$.getJSON({
		method:"POST",
		url: url,
		contentType: "text/plain ; charset=utf-8", 
		dataType: 'text',
		success: function(jsonData){
			// cuuren not json data
			// please change to json.
			console.log(jsonData);
			},
		error: function(jsonData,error,status){
			console.log(error + "  " + status);
			//console.log(jsonData.responseText);
		}
	});	
}

/* get annotation data */
function getData(annotation){

	text = $("#selectTagName option:checked").text();
	
	annotation.text = text;
	sourceImage = annotation.src;
	geometry = annotation.shapes[0].geometry; // annotation shanpes is array form. 
	// and you want to get the geometry, must be toget previous row.
	changeJson(text, sourceImage, geometry);
};

/* file create function */
function changeJson(text, sourceImage, geometry){
	var annotationInfo = new Object();
	annotationInfo.tag = text;
	annotationInfo.timeStamp = new Date().getTime();
	annotationInfo.anno = geometry;
	annotationInfo.imageLocation = sourceImage;
	
	var name = sourceImage.split("/");
	console.log(name[name.length-1].split(".")[0]);
	
	var toJson = JSON.stringify(annotationInfo);
	console.log("test 1 : " + toJson);

	//if(sourceImage != 
	var addJson  = addJsonData(toJson, name[name.length-1].split(".")[0]);

}


function addJsonData(toJson, name){
	var req = new XMLHttpRequest();
	var url = window.location.href + "/php/formToJson.php";

	// why don't use XMLHttpRequests????
	//
	//	req.open("POST", url, true);
	//	req.onreadystatechange = function(){
	//		if(this.status == 200){
	//			console.log("test");
	//		}
	//	
	//	};
	//	sort = "data=".concat(toJson);
	//	console.log(sort);
	//	req.send("data=stringdata");

	// POST send
	$.ajax({
		data: 'data=' + toJson + "&name=" + name,
		url: url,
		method: 'POST',
		success: function(msg){
			console.log("test 2 : " + msg);
		}

	});
}

//custom hjkim
function appendTagEditID(){
	document.getElementsByClassName("annotorious-annotationlayer")[0].getElementsByClassName("annotorious-popup top-left")[0]
	.getElementsByClassName("annotorious-popup-buttons")[0]
	.getElementsByClassName("annotorious-popup-button annotorious-popup-button-edit")[0].id = 'tagedit';
}

function appendCanvasID(){
        console.log(document.getElementsByClassName("annotorious-annotationlayer")[0].getElementsByClassName("annotorious-item annotorious-opacity-fade")[1].id = 'canvasID');
}

function appendAnnoTagID(){
	document.getElementsByClassName("annotorious-annotationlayer")[0].getElementsByClassName("annotorious-popup top-left")[0].id = 'annoTag';
}

//select_box options for selection tag name. hjkim
function importPatternListID(){
	appendTagEditID();
	appendAnnoTagID();	
	appendCanvasID();
	$('textarea').replaceWith("<select id='selectTagName'>" + $(this).text() + "</select>");
	
	var tagNames = ["red","blue","green","apple","pizza"];
	
	tagNames.forEach(tag => {
		var typeOption = document.createElement('option');
		var tagOption = document.createTextNode(tag);
		typeOption.appendChild(tagOption);
		document.getElementById("selectTagName").appendChild(typeOption);
	});
}

/*	 autocomplete example */
/* 
   var completedText;
   if (opt == 1){
   completedText = [
   "apple",
   "green",
   "red"
   ];
   };

   };

   $( "#annoTag" ).autocomplete({
source: completedText
});
};
 */

