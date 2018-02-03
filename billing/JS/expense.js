var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountCollection = db.collection('account');


$(document).ready(function(){
	accountCollection.load(dataLoad);
});


function dataLoad(){
	var expenses = accountCollection.find(
			{},
			{
				$orderBy: {date:-1},
				$limit: 10
			}
		);
	updateTable(expenses);
}


function updateTable(datas){
	console.log("updateTable");
	console.log(datas.length);
	$("#table-tbody").find("tr").remove();

	for(var i = 0; i < datas.length; i++){
		$("#table-tbody").append(
			"<tr>" +
			"<td>" + datas[i].date + "</td>" +
			"<td>" + datas[i].item + "</td>" +
			"<td>" + datas[i].amount + "</td>" +
			"</tr>")
	}
}