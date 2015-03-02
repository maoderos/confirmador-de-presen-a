var db;
document.addEventListener("DOMContentLoaded", function() {
	var openRequest = indexedDB.open("lista", 1);

	openRequest.onsuccess = function(e) {
		console.log("success bitch");
		db = e.target.result;
		loadData();
	}
	openRequest.onerror = function(e) {
		console.log("omg error");
	}
}, false);

function loadData() {
	console.log("chegueii");
	var objectStore = db.transaction("jogadores").objectStore("jogadores");
	objectStore.openCursor().onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor) {
			var table = document.getElementById('body');
			var newRow = table.insertRow(-1);
			var cell0 = newRow.insertCell(0),
			cell1 = newRow.insertCell(1),
			cell2 = newRow.insertCell(2),
			cell3 = newRow.insertCell(3),
			text0 = document.createTextNode(cursor.value.nome),
			text1 = document.createTextNode(cursor.value.idade),
			text2 = document.createTextNode(cursor.value.categoria),
			text3 = document.createTextNode(cursor.value.telefone);
			cell0.appendChild(text0);
			cell1.appendChild(text1);
			cell2.appendChild(text2);
			cell3.appendChild(text3);
			cursor.continue();
			console.log("acho que terminou");
		}
	}
}