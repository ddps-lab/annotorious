//create by hjkim
//CAID model package.

var imageLocation;
var nameList;

function readTables(){
    configure_aws();
    var dynamodb = new AWS.DynamoDB();
	var docClient =  new AWS.DynamoDB.DocumentClient();

    console.log("start read Tables");
    var params = {
        TableName : "simpleImgInfoTable_kookmin",
        Key : { 
        	"testNum":1
    	}

    };
    var test;
    var doc = docClient.get(params,function(err,data){
    	var isSuccess = false;

    	if(err){
    		console.log("readTables error",err)
    	} else {
    		var obj = objToJson(data)
    		isSuccess = receiveQuery(obj)
    	}

    	if(isSuccess == true){

    		
    	}

    });
    
}

function objToJson(data){
	const dumpJson = JSON.stringify(data, undefined, 2);
	const obj = JSON.parse(dumpJson);
	
	console.log("jsondump",obj);
	return obj;
}

function receiveQuery(object){
	//console.log("received query",data);
	nameList = object.Item.image.nameList;
	imageLocation = object.Item.image.location;
	//console.log("nameList", nameList[0].Done);

	return true;
}

function getImageList(){
    retObj = { path : imageLocation,
               imglist : nameList };
    return retObj;
}