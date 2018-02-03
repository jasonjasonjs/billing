var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountCollection = db.collection('account');

$(document).ready(function() {
	accountCollection.load(dataLoad);
	$("[name=date]").change(function(){
		if(this.value == "thisMonth"){
			$("[name=date]").prop("readOnly", true);
		}else{
			$("[name=date]").prop("readOnly", false);
		}
	});

	$("#btnSearch").on("click", searchExpenses);
});

function dataLoad() {
	console.log("dataLoad");
}

function searchExpenses(){
	var gte = "";
	var lte = "";

	if($("[date=choice]:checked").val() == "thisMonth"){
		var date = new Date();
		var year = date.getUTCFullYear();
		var month = date.getUTCMonth() + 1;

		if (month < 10) {
			gte = year + "-0" + month + "-" + "01";
			lte = year + "-0" + month + "-" + "31";
		}else{
			gte = year + "-" + month + "-" + "01";
			lte = year + "-" + month+ "-" + "31";
		}
	}else{
		gte = $("#gte").val();
		lte = $("#lte").val();
	}

	if (gte != "" || lte != "") {
		updateDetailTable(accountCollection.find(
			{
				date:{
					$gte: gte,
					$lte: lte
					}
			},
			{
				$orderBy: {date: 1}
			}));
	}
}


function updateDetailTable(datas){
	console.log("updateDetailTable");
	console.log(datas.length);
	$("#table-tbody").find("tr").remove();

	for(var i = 0; i < datas.length; i++){
		$("#table-tbody").append(
			"<tr>" +
			"<td>" + datas[i].date + "</td>" +
			"<td>" + datas[i].item + "</td>" +
			"<td>" + datas[i].amount + "</td>" +
			"</tr>"
			);
	}
}