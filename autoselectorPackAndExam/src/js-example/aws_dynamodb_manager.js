var imageLocation;
var nameList;

function getInfoItems(){
	var url = window.location.href + "/php/dynamoDB.php";
	const query = "dynamoConfigure"

	$.get(url, function (data) {
		let jsonDump = JSON.parse(data);
		//console.log("ajax get query \n", jsonDump.Item.image.M.location.S);
		const imageLocation = jsonDump.Item.image.M.location.S;
		let imageList = jsonDump.Item.image.M.nameList.L;
		//console.log("get Image Data path : ", imageLocation);
		//console.log("get Image List : ", imageList);
		setData(imageLocation, imageList);
	})
}

function setData(location, list){
	imageLocation = location;
	nameList = list;
	console.log(imageLocation, nameList);
}
