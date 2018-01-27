var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountingCollection = db.collection('account');

$(document).ready(function(){
	accountingCollection.load();

});


function submit(){
	var newAccount = {
		date: $("#date").val(),
		kind: $("#kind").val(),
		item: $("#item").val(),
		cost: $("#cost").val()
	}
	accountingCollection.insert(newAccount);
	accountingCollection.save();
	$("#date").val("");
	$("#kind").val("");
	$("#item").val("");
	$("#cost").val("");
	alert("儲存成功");
}