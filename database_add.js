var db;
document.addEventListener("DOMContentLoaded", function() { 
	var openRequest = indexedDB.open("lista",1);

	openRequest.onupgradeneeded = function(e) {
		var thisDB = e.target.result;

		if(!thisDB.objectStoreNames.contains("jogadores")) {
			thisDB.createObjectStore("jogadores", {autoIncrement:true});
			console.log("object created");
		}
	}

	openRequest.onsuccess = function(e) {
		console.log("running onsuccess");
		db = e.target.result;

		document.getElementById("addButton").addEventListener("click", addPerson, false);
	}

	openRequest.onerror = function(e) {
		console.log("OMG ERROR");
	}
}, false);


function addPerson(e) {
	var name = document.getElementsByName("name")[0].value;
	var idade = document.getElementsByName("idade")[0].value;
	var categoria = document.getElementsByName("categoria")[0].value;
	var telefone = document.getElementsByName("telefone")[0].value;

	console.log(name + " " + idade + " " + categoria + " " + telefone);

	var transaction = db.transaction(["jogadores"], "readwrite");
	var store = transaction.objectStore("jogadores");

	var player = {
		nome: name,
		idade: idade,
		categoria: categoria,
		telefone: telefone,
	}

	var request = store.add(player);

	request.onsuccess = function(e) {
		console.log("player added succesfuly");
	}
	request.onerror = function(e) {
		console.log("Error", e.target.error.name);
	}
}