var db
var latestVersion;
function openDatabase() { 
	var openRequest = indexedDB.open("datas");
	var month = document.getElementById("mes").value;
	var day = document.getElementById("dia").value;
	console.log(day + month);

	openRequest.onupgradeneeded = function(e) {
		console.log("nothing is gonna happen");
	}

	openRequest.onsuccess = function(e) {
		console.log("running onsuccess");
		db = e.target.result;
		latestVersion = db.version;
		console.log(latestVersion);
		db.close();
		addPerson();		
		
	}

	openRequest.onerror = function(e) {
		console.log("OMG ERROR");
	}
	
		
};


function addPerson(e) {
	console.log("heyy")
	var openRequest = indexedDB.open("datas", latestVersion + 1);
	var month = document.getElementById("mes").value;
	var day = document.getElementById("dia").value;
	var name = document.getElementsByName("name")[0].value;
	var idade = document.getElementsByName("idade")[0].value;
	var categoria = document.getElementsByName("categoria")[0].value;
	var telefone = document.getElementsByName("telefone")[0].value;
	openRequest.onsuccess = function (e) { 
		db = e.target.result;
		if(name == ""|| idade == "" || categoria == "" || telefone == "") {
			alert("preecha todos os campos de texto!");
			db.close();
			return;
		}

		console.log(name + " " + idade + " " + categoria + " " + telefone);
	
		

		var transaction = db.transaction([day + month], "readwrite");
		var store = transaction.objectStore(day + month);

		var player = {
			nome: name,
			idade: idade,
			categoria: categoria,
			telefone: telefone,
		}

		var request = store.add(player);

		request.onsuccess = function(e) {
			console.log("player added succesfuly");
			location.reload();
		}
		request.onerror = function(e) {
			console.log("Errorr", e.target.error.name);
		}
	}
	openRequest.onupgradeneeded = function(e) {
		var thisDB = e.target.result;
		 if(!thisDB.objectStoreNames.contains(day + month)) {
			thisDB.createObjectStore(day + month, {autoIncrement: true});
			console.log("object created");
		}
	}
	openRequest.onerror = function(e) {
		console.log("Error", e.target.error.name);
	}
};
