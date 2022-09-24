//--------------Constantes------------------------------
const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';



//--------------Funciones Auxiliares------------------------

//  Hace GET, obtiene un JSON y devuelve un objeto
async function getData(url) {
    return fetch(url)
  .then(response => response.json())
  

}

function filterGender(gender, input){
  //gender === array of objects [{}]
  let genderFound = false;
  for (let i = 0; i < gender.length; i++){
    genderFound = gender[i].name.toLowerCase().indexOf(input.toLowerCase()) > -1;
    // if encuentra al menos un genero que contiene el input, devolvemos genderFound y paramos el for
    if (genderFound) break;
  }
  return genderFound;
}

function filtrar(datos, input){
  return datos.filter(function(dato){
    const { title, genres, tagline, overview } = dato;
    return title.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
    filterGender(genres, input) ||
    tagline.toLowerCase().indexOf(input.toLowerCase()) > -1 || 
    overview.toLowerCase().indexOf(input.toLowerCase()) > -1;
  });
}

function stars(cantidad){
  // return html <span class="fa fa-star checked"></span>
}

function cantidadEstrellas(amount) {
  let stars = '';
  let starsValue = Math.round(amount / 2);
  
  for (let i = 0; i < 5; i++) {
      if (i < starsValue){
        stars += '<span class="fa fa-star checked"></span>';
      };

      if (i >= starsValue){
        stars += '<span class="fa fa-star color"></span>';
      }
  } 
  return stars;
}

function mostrarResultados(datos){
 
  let indexhtml = '';
  datos.forEach(dato => {
  let offCanvas = "offcanvasTop";
  const { title, tagline, vote_average, overview, id } = dato;
  indexhtml += ` 
    <li>
      <div class="result row" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${id}" aria-controls="offcanvasTop">
        <div class="col-9">
          <h3>${title}</h3>
          <p>${tagline}</p>
        </div>
        <div class="col-3 stars">${cantidadEstrellas(vote_average)}
      </div>

      <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${id}" data-bs-scroll="true" aria-labelledby="offcanvasTopLabelScrolling${id}">
        <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasTopLabel${id}">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        ${overview}
      </div>
      </div>

    </li>`;
  });

lista.innerHTML = indexhtml;

}