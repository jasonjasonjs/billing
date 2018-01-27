var fdb = new ForerunnerDB();
var db = fdb.db("account");
var expenseCollection = db.collection('account');


$(document).ready(function(){
	expenseCollection.load(dataLoad);
});


function dataLoad(){
	console.log("dataLoad");
}


function searchExpenses(){
	var gte = "";
	var lte = ""; 

	if($("[name=date]:checked").val() == "thisMonth"){
		var date = new Date();
		var year = date.getUTCFullYear();
		var month = date.getUTCMonth() + 1;

		if(month < 10){
			gte = year + "-0" + month + "-" + "01";
			lte = year + "-0" + month + "-" + "31";
		}else{
			gte = year + "-" + month + "-" + "01";
			lte = year + "-" + month + "-" + "31";
		}
	}else{

	}

	var Search = expenseCollection.find({
    	age: {
        	"$gte": gte,
        	"$lte": lte 
    	}
    });
	updateTable(Search);
}


function updateTable(expenses){
	console.log("updateTable");
	$("#detail-tbody").find("tr").remove();
	for(var i = 0; i < expenses.length; i++){
		console.log(i);
		$("#detail-tbody").append(
			"<tr>" +
			"<td>" + expenses[i].date + "</td>" +
			"<td>" + expenses[i].item + "</td>" +
			"<td>" + expenses[i].cost + "</td>" +
			"</tr>"
			);
	}
}