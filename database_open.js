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
			cell4 = newRow.insertCell(4),
			cell5 = newRow.insertCell(5),
			text0 = document.createTextNode(cursor.key),
			text1 = document.createTextNode(cursor.value.nome),
			text2 = document.createTextNode(cursor.value.idade),
			text3 = document.createTextNode(cursor.value.categoria),
			text4 = document.createTextNode(cursor.value.telefone),
			butnText = document.createTextNode("Delete"),
			text5 = document.createElement("BUTTON");
			text5.appendChild(butnText);
			cell0.appendChild(text0);
			cell1.appendChild(text1);
			cell2.appendChild(text2);
			cell3.appendChild(text3);
			cell4.appendChild(text4);
			cell5.appendChild(text5);
			cell5.id = "deleteButton";
			var t = newRow.rowIndex - 1;
			console.log(t);
			cell5.onclick = function deleteRow() {
					var table = document.getElementById('body');
					console.log(t);
					var confirmation = confirm("Voce tem certeza que deseja deletar esta linha?");
					if (confirmation) {
						row = table.rows[t],
						console.log(row);
						cell = row.cells[0],
						key = cell.firstChild.nodeValue;
						var tx = db.transaction(["jogadores"], "readwrite");
						var store = tx.objectStore("jogadores");
						var request = store.get(Number(key));
						request.onsuccess = function() {
							console.log("succedeed");
							store.delete(Number(key));
							table.deleteRow(t);
							location.reload();
						}
					}
				}

			console.log('acho que terminou');
			cursor.continue();

		}
		
	}

}








