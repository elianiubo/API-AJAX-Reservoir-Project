function canviaPercentatge(percent){
	let r = document.querySelector(":root");
	r.style.setProperty('--percentatge',`${-(percent)}%`)
}


let resposta;

window.onload = function(){
	//Fem la petició a l'URL corresponent
	let peticio = new XMLHttpRequest();
	let select = document.getElementById("embassaments");
	peticio.open('GET','https://analisi.transparenciacatalunya.cat/resource/gn9e-3qhr.xml');
	peticio.send();

	//Processem la resposta
	peticio.onload = function(){
		resposta = peticio.responseXML.getElementsByTagName("row");
		//Agafem les nou primeres fileres de la resposta
		for(let i=0; i<9; i++){
			//Omplim la llista desplegable
			let option = document.createElement('option');
			option.setAttribute("value",i);
			option.textContent = resposta[i].getElementsByTagName("estaci")[0].textContent;
			select.appendChild(option);
		}
	}

	//Assignem l'esdeveniment al seleccionar un embassament de la llista desplegable
	select.addEventListener('change',function(){
		let id = this.value;
		seleccionaDadesEmbassament(id);
	});
}

//Funció que mostra les dades de l'embassament seleccionat
function seleccionaDadesEmbassament(id){
	document.getElementById("nom").textContent = resposta[id].getElementsByTagName("estaci")[0].textContent;
	document.getElementById("dada_cap_tot").textContent = resposta[id].getElementsByTagName("volum_embassat")[0].textContent;
	document.getElementById("dada_percent").textContent = resposta[id].getElementsByTagName("percentatge_volum_embassat")[0].textContent;
	canviaPercentatge(resposta[id].getElementsByTagName("percentatge_volum_embassat")[0].textContent);
}


