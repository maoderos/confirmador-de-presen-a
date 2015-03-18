var db;
function openData() {
	var openRequest = indexedDB.open("datas");

	openRequest.onsuccess = function(e) {
		console.log("success bitch");
		db = e.target.result;
		loadData();
	}
	openRequest.onerror = function(e) {
		console.log("omg error");
	}
}

function loadData() {
	var day = document.getElementById("dia").value;
	var month = document.getElementById("mes").value;
	var table = document.getElementById('body');
	var rowLength = table.rows.length;
	if(rowLength + 1 > 0) {
		for (rowLength; rowLength > 0; rowLength--) {
			table.deleteRow(rowLength - 1);
		}
	}
	console.log(day+month);
	console.log("chegueii");
	var objectStore = db.transaction(day + month).objectStore(day + month);
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
			cell6 = newRow.insertCell(6),
			text0 = document.createTextNode(table.rows.length),
			text1 = document.createTextNode(cursor.value.nome),
			text2 = document.createTextNode(cursor.value.idade),
			text3 = document.createTextNode(cursor.value.categoria),
			text4 = document.createTextNode(cursor.value.telefone),
			text6 = document.createTextNode(cursor.key),
			butnText = document.createTextNode("Delete"),
			text5 = document.createElement("BUTTON");
			text5.appendChild(butnText);
			cell0.appendChild(text0);
			cell1.appendChild(text1);
			cell2.appendChild(text2);
			cell3.appendChild(text3);
			cell4.appendChild(text4);
			cell5.appendChild(text5);
			cell6.appendChild(text6);
			cell5.id = "deleteButton";
			cell6.id = 'key';
			cell6.style.display = 'none';
			var t = newRow.rowIndex - 1;
			console.log(t);
			cell5.onclick = function deleteRow() {
					var table = document.getElementById('body');
					console.log(t);
					var confirmation = confirm("Voce tem certeza que deseja deletar esta linha?");
					if (confirmation) {
						row = table.rows[t],
						console.log(row);
						cell = row.cells[6],
						key = cell.lastChild.nodeValue;
						console.log(key);
						var tx = db.transaction([day + month], "readwrite");
						var store = tx.objectStore(day + month);
						var request = store.get(Number(key));
						request.onsuccess = function() {
							console.log("succedeed");
							store.delete(Number(key));
							var rowCount = table.rows.length;
							for (rowCount; rowCount > 0; rowCount--) {
								table.deleteRow(rowCount - 1);
							}
							loadData();
						}
					}
				}

			console.log('acho que terminou');
			cursor.continue();

		}
		
	}
	objectStore.openCursor().onerror = function() {
		alert("Esta lista nao existe");
	}

}








