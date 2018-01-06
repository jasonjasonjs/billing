var fdb = new ForerunnerDB();
var db = fdb.db("school");
var studentCollection = db.collection('students');


$(document).ready(function(){
	console.log("ready");
	studentCollection.load(dataLoad); 
	$("#table-tbody").on("click", ".dataID", colIDClick);
	$("#table-tbody").on("click", ".btn-danger", btnDeleteClick);
	$("#btnInsertData").on("click", insertData);
	$("#table-tbody").on("click", ".btn-warning", btnEditClick);
	$("#btnSave").on("click", saveUpdateData);
	$("#btnLimitSearch").on("click", LimitSearch);
	$("#btnCertainSearch").on("click", CertainSearch);
});


function dataLoad() {
	console.log("data loaded");
	console.log(studentCollection.find());
	// createData();
	updateTable(studentCollection.find());
}


function dataSave(){
	console.log("data saved");
	updateTable(studentCollection.find());
}


function dataRemove(){
	console.log("data removed");
}


function createData(){
	console.log("create data");
	for(var i = 0; i < 20; i++){
		studentCollection.insert({
	    name: String.fromCharCode(Math.floor((Math.random() * 26) + 65),
	     	Math.floor((Math.random() * 26) + 97),
	     	Math.floor((Math.random() * 26) + 97)),
	    age: Math.floor((Math.random() * 7) + 7)
		});
	}
	console.log(studentCollection.find());
	studentCollection.save(dataSave);
}


function updateTable(datas){
	console.log("updateTable");
	console.log(datas.length);
	$("#table-tbody").find("tr").remove();

	for(var i = 0; i < datas.length; i++){
		$("#table-tbody").append(
			"<tr class='col'>" +
			"<td>" + (i+1) + "</td>" +
			"<td class='dataID'>" + datas[i]._id + "</td>" +
			"<td>" + datas[i].name + "</td>" +
			"<td><button class='btn btn-warning'>修改</button>" +
	 		" <button class='btn btn-danger'>刪除</button></td>" +
			"</tr>"
			);
	}
}


function colIDClick(){ 
	console.log("colIDClick");
	var ID = $(this).text();

	var query = {
	    _id: ID
	};

	$("#modal-body").find("p").remove();
	var studentData = studentCollection.find(query);
	$("#modal-body").append(
		"<p>ID: " + studentData[0]._id + "</p>" +
		"<p>姓名: " + studentData[0].name + "</p>" +
		"<p>年齡: " + studentData[0].age + "</p>"
		);
	$("#myModal").modal("show"); 
}


function btnDeleteClick(){
	console.log("btnDeleteClick");
	if (!confirm("確定要刪除嗎?")) {return;}
	var ID = $(this).closest("tr").find(".dataID").text();
	studentCollection.remove({
		_id: ID
	});
	studentCollection.save(dataSave);
}


function insertData(){
	console.log("insertData");
	var name = $("#edtName").val();
	var age = $("#edtAge").val();
	
	studentCollection.insert({
		name:name,
		age:age
	});
	studentCollection.save(dataSave);
	$("#edtName").val("");
	$("#edtAge").val("");
}


function btnEditClick(){
	var ID = $(this).closest("tr").find(".dataID").text();
	var query = {
		_id: ID
	}
	var student = studentCollection.find(query);
	$("#modalName").val(student[0].name);
	$("#modalAge").val(student[0].age);
	$("#EditModal").attr("studentID", ID);
	$("#EditModal").modal("show");
}


function saveUpdateData(){
	console.log("saveUpdateData");
	var ID = $("#EditModal").attr("studentID");
	var newData = {
		name: $("#modalName").val(),
		age:$("#maodalAge").val()
	};
	studentCollection.updateById(ID,newData);
	$("#EditModal").modal("hide");
	studentCollection.save(dataSave);
}


function LimitSearch(){
	console.log("LimitSearch");
	var LimitSearch = studentCollection.find({
    	age: {
        	"$gt": $("#edtGT").val(),
        	"$lt": $("#edtLT").val() 
    	}
    });
	updateTable(LimitSearch);
}


function CertainSearch(){
	console.log("CertainSearch");
	var checkbox = $(".cbAge");
	var checked = [];

	for (var i = 0; i < checkbox.length; i++) {
		if (checkbox[i].checked) {
			checked.push(checkbox[i].value *1);
		}
	}

	var certainSearch = studentCollection.find({
    	age: {
        	$in: checked
    	}
	});
	updateTable(certainSearch);
}