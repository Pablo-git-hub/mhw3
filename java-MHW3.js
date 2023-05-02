const numResults=10;
function onJson_Ip(json)
{
console.log('IP json ricevuto:'+json);	
const results =json.ip;
if(results===null)
    {
    	const errore=document.querySelector('h1');
		const messaggio = document.createTextNode("Nessun risultato!"); 
	    errore.appendChild(messaggio); 
     	library.appendChild(errore);
    }
// Leggiamo info
const casella_ip=document.querySelector('h3');
casella_ip.innerHTML='';
casella_ip.textContent="Il mio IP è:"+results;
    
 } 
function onJson_img(json) {
  console.log('JSON Img ricevuto');

  console.log(json);
  // Svuotiamo la libreria
  const library = document.querySelector('#album-view');
  library.innerHTML = '';

  const results = json.hits
  for(result of results) {
	  console.log(result+' questo e un result');
	  }

  

  // Processa ciascun risultato
  for(result of results)
  {
    // Leggiamo info
	const immagine = result.largeImageURL;

	const album = document.createElement('div');
    album.classList.add('album');
    const img = document.createElement('img');
    img.src = immagine;

    album.appendChild(img);
   
    // Aggiungiamo il div alla libreria
    library.appendChild(album);
  }
  if(results.length == 0)
  {
	const errore = document.createElement("h1"); 
	const messaggio = document.createTextNode("Nessun risultato!"); 
	errore.appendChild(messaggio); 
	library.appendChild(errore);
  }
}


function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}
function search(event)
{
	
	event.preventDefault();
	const content = document.querySelector('#content').value;
	if(content) {
	    const text = encodeURIComponent(content);
		console.log('Eseguo ricerca elementi riguardanti: ' + text);
		
		const tipo = document.querySelector('#tipo').value;
		console.log('Ricerco elementi di tipo: ' +tipo);
		if(tipo === "immagine") {
	  		// Esegui fetch
			img_request = img_api_endpoint + '?key='  + key_img + '&q=' + text + '&per_page=' + numResults;
			fetch(img_request).then(onResponse).then(onJson_img);

	
		}
	}
}

const key_img = '16326848-36a4d0e195bb2375d6f41ea91';		

const img_api_endpoint = 'https://pixabay.com/api/'
fetch('https://api.ipify.org?format=json').then(onResponse).then(onJson_Ip);
const form = document.querySelector('#search_content');
form.addEventListener('submit', search);
const tasto_ip=document.querySelector('#ip_button');





 


