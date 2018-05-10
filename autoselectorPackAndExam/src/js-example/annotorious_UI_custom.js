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
	$('.annotorious-editor-text.goog-textarea').replaceWith("<select id='selectTagName'>" + $(this).text() + "</select>");
	
	var tagNames = ["red","blue","green","apple","pizza"];
	
	tagNames.forEach(tag => {
		var typeOption = document.createElement('option');
		var tagOption = document.createTextNode(tag);
		typeOption.appendChild(tagOption);
		document.getElementById("selectTagName").appendChild(typeOption);
	});
}

