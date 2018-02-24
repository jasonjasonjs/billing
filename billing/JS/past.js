var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountCollection = db.collection('account');



$(document).ready(function() {
	accountCollection.load(dataLoad);
	$("[name=choice]").change(function(){
		if(this.value == "thisMonth"){
			$(".date").prop("readOnly", true);
		}else{
			$(".date").prop("readOnly", false);
		}
	});

	$("#btnSearch").on("click", searchExpenses);
});

function dataLoad() {
	console.log("dataLoad");
}

function searchExpenses(){
	console.log("searchExpenses");
	var gte = "";
	var lte = "";

	if($("[name=choice]:checked").val() == "thisMonth"){
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
		console.log("else");
		gte = $("#gte").val();
		lte = $("#lte").val();
	}
console.log(gte + lte);
	if (gte != "" || lte != "") {
		console.log(gte);
		var account = accountCollection.find(
			{
				date:{
					$gte: gte,
					$lte: lte
					}
			},
			{
				$orderBy: {date: 1}
			});
		updateDetailTable(account);
		updateCategoryTable(account);
	}
}


function updateDetailTable(datas){
	console.log("updateDetailTable");
	console.log(datas.length);
	$("#detail-tbody").find("tr").remove();

	for(var i = 0; i < datas.length; i++){
		$("#detail-tbody").append(
			"<tr>" +
			"<td>" + datas[i].date + "</td>" +
			"<td>" + datas[i].item + "</td>" +
			"<td>" + datas[i].cost + "</td>" +
			"</tr>"
			);
	}
}




function updateCategoryTable(datas) {
	var sum = 0;
	var sumCategory = [0, 0, 0, 0, 0, 0];
	var category = ["食", "衣", "住", "行", "育", "樂"];


	for(var i = 0; i < datas.length; i++){
		switch(datas[i].kind){
			case category[0]:
				sumCategory[0] += datas[i].cost*1;
				break;
			case category[1]:
				sumCategory[1] += datas[i].cost*1;
				break;
			case category[2]:
				sumCategory[2] += datas[i].cost*1;
				break;
			case category[3]:
				sumCategory[3] += datas[i].cost*1;
				break;
			case category[4]:
				sumCategory[4] += datas[i].cost*1;
				break;
			case category[5]:
				sumCategory[5] += datas[i].cost*1;
				break;
			default:
				console.log("Error!!!");
		}
		sum += datas[i].cost*1;
	}


	$("#category-tbody").find("tr").remove();
	for (var i = 0; i < sumCategory.length; i++) {
		$("#category-tbody").append(
		"<tr>" +
		"<td>" + category[i] + "</td>" +
		"<td>" + sumCategory[i] + "</td>" +
		"<td>" + Math.round((sumCategory[i] /sum)*100) + " %</td>" +
		"</tr>"
		);
	}
	

	$("#txtSum").text("總額: $" + sum);
}