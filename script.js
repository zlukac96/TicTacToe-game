var brojacPoteza=0;
var spisak = [];
var krajIgre = false;
var krajIgreRezultat = document.getElementById("krajIgreRezultat");
const brojPolja=9;
const duzinaStranice = Math.sqrt(brojPolja);

function popuniPolje(){
	for(let i=0; i<brojPolja; i++){
		var pokTabla = document.getElementsByClassName("tabla")[0];
		var pokPolja = document.createElement("div");
		pokPolja.classList.add("polje");
		pokPolja.onclick = dugme;
		pokPolja.setAttribute("id","polje" + i.toString());
		pokTabla.appendChild(pokPolja);
		spisak.push("");
	}
}

popuniPolje();

function dugme(event){
	if(event.target.childNodes.length === 0){
		let node = document.createElement("div");
		if(brojacPoteza%2 === 0) {
			node.classList.add("iks");
			spisak[parseInt(event.target.id.slice(5))] = "iks";
		}
		else {
			node.classList.add("oks");
			spisak[parseInt(event.target.id.slice(5))] = "oks";
		}
		event.target.appendChild(node);
		brojacPoteza++;
	}
	
	let pobednik="";
	let kontejner = document.getElementsByClassName("kontejner")[0];
	let node = document.createElement("div");
	node.classList.add("mrezaLinija");
	
	
	for(let j=0; j<duzinaStranice; j++){
		let brojIksH=0;
		let brojOksH=0;
		let brojIksV=0;
		let brojOksV=0;
		let brojIksK=0;
		let brojOksK=0;
		let brojIksKm=0;
		let brojOksKm=0;
		

		
		for (let i=0; i<duzinaStranice; i++) {
			if (spisak[i+j*duzinaStranice] === "iks") brojIksH++;
			if (spisak[i+j*duzinaStranice] === "oks") brojOksH++;
			if (spisak[j+i*duzinaStranice] === "iks") brojIksV++;
			if (spisak[j+i*duzinaStranice] === "oks") brojOksV++;
			if (j===0){
				if (spisak[i*(duzinaStranice+1)] === "iks") brojIksK++;
				if (spisak[i*(duzinaStranice+1)] === "oks") brojOksK++;
				if (spisak[(duzinaStranice-1)+i*(duzinaStranice-1)] === "iks") brojIksKm++;
				if (spisak[(duzinaStranice-1)+i*(duzinaStranice-1)] === "oks") brojOksKm++;
			}
		}
		if (brojIksH >= duzinaStranice || 
			brojIksV >= duzinaStranice ||
			brojIksK >= duzinaStranice ||
			brojIksKm >= duzinaStranice) { 
			pobednik = "iks";
			krajIgreRezultat.innerText = "Winner is X";
			krajIgre = true;
		}
		if (brojOksH >= duzinaStranice ||
			brojOksV >= duzinaStranice ||
			brojOksK >= duzinaStranice ||
			brojOksKm >= duzinaStranice) {
			pobednik = "oks";
			krajIgreRezultat.innerText = "Winner is O";
			krajIgre = true;
		}
			
			
			if (brojIksH >= duzinaStranice|| brojOksH >= duzinaStranice) {
				let DivLinijaH = document.createElement("div");
				DivLinijaH.classList.add("linijaH");			
				DivLinijaH.style.gridRow=(j+1).toString()+"/"+(j+2).toString();
				node.appendChild(DivLinijaH);
			}
			
			if (brojIksV >= duzinaStranice|| brojOksV >= duzinaStranice) {
				let DivLinijaV = document.createElement("div");
				DivLinijaV.classList.add("linijaV");			
				DivLinijaV.style.gridColumn=(j+1).toString()+"/"+(j+2).toString();
				node.appendChild(DivLinijaV);
			}
			
			if (brojIksK >= duzinaStranice|| brojOksK >= duzinaStranice) {
				let DivLinijaK = document.createElement("div");
				DivLinijaK.classList.add("linijaK");
				node.appendChild(DivLinijaK);
			}
			
			if (brojIksKm >= duzinaStranice|| brojOksKm >= duzinaStranice) {
				let DivLinijaKm = document.createElement("div");
				DivLinijaKm.classList.add("linijaK");			
				DivLinijaKm.style.transform="rotate(-45deg) scale(1.4, 0.5)"
				node.appendChild(DivLinijaKm);
			}
			
		
	}
	
	if (krajIgre === true) { kontejner.appendChild(node); }
	
	if(brojacPoteza>=brojPolja && krajIgre == false)
	{
		let kontejner = document.getElementsByClassName("kontejner")[0];
		let node = document.createElement("div");
		node.classList.add("mrezaLinija");
		kontejner.appendChild(node);
		krajIgreRezultat.innerText = "Draw";
		krajIgre = true;
	}
	
}

function ocisti(){
	brojacPoteza=0;
	krajIgre = false;
	krajIgreRezultat.innerText = "";
	for(let i=0; i<spisak.length; i++){
		spisak[i] = "";
	}
	for(let j=0; j<document.getElementsByClassName("polje").length; j++)
	{
		document.getElementsByClassName("polje")[j].innerHTML = '';
	}
	var kontejner = document.getElementsByClassName("mrezaLinija")[0];
	if(kontejner !== undefined) kontejner.remove();
}
