//--------------Constantes------------------------------
const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';


//--------------Elementos-HTML------------------------------
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');

//--------------Funciones Auxiliares------------------------

//  Hace GET, obtiene un JSON y devuelve un objeto
async function getData(url) {
    return fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
}

