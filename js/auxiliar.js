//--------------Constantes------------------------------
const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';



//--------------Funciones Auxiliares------------------------

//  Hace GET, obtiene un JSON y devuelve un objeto
async function getData(url) {
    return fetch(url)
  .then(response => response.json())
  

}

function filtrar(datos,titulo){
  return datos.filter(function(dato){
     return dato.title.toLowerCase().indexOf(titulo.toLowerCase()) > -1;
  })
}

function mostrarResultados(datos){
 
  let indexhtml = '';
 datos.forEach(dato => {
  console.log(dato);
  const{title, tagline, vote_average} = dato;
indexhtml += ` 
<li>
    <div> 
   <h3>${title}</h3>
    </div>
</li>


`
 });
console.log(indexhtml);
console.log(lista);
lista.innerHTML = indexhtml;


}