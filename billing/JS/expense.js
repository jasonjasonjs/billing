var fdb = new ForerunnerDB();
var db = fdb.db("account");
var expenseCollection = db.collection('accounts');


$(document).ready(function(){
	expenseCollection.load(dataLoad);

});


function dataLoad(){
	console.log("dataLoad");
	var expenses = expenseCollection.find(
	    {},
		{$orderBy: {date: -1},
		$limit: 10}
		);
	updatetable(expenses);
}



function updatetable(expenses){
	console.log("updatetable");
	console.log(expenses);
	$("#table-tbody").find("tr").remove();
	for(var i = 0; i < expenses.length; i++){
		console.log(i);
		$("#table-tbody").append(
			"<tr>" +
			"<td>" + expenses[i].date + "</td>" +
			"<td>" + expenses[i].item + "</td>" +
			"<td>" + expenses[i].cost + "</td>" +
			"</tr>"
			);
	}
}