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
    //if (genderFound) break;

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

function recorrerGenres(array){
  let result = "";
  for (const gender of array){
    result += gender.name + ", ";
  }
  // le cortamos los ultimos 2 caracteres ", "
  result = result.slice(0, result.length -2);
  return result;
}

function mostrarResultados(datos){
 
  let indexhtml = '';
  datos.forEach(dato => {
  let offCanvas = "offcanvasTop";
  const { title, tagline, vote_average, overview, id } = dato;
  indexhtml += ` 
    <li>
      <div class="result row" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${id}" aria-controls="offcanvasTop">
        <div class="col-9">
          <h3>${title}</h3>
          <p>${tagline}</p>
        </div>
        <div class="col-3 stars">${cantidadEstrellas(vote_average)}</div>

        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${id}" data-bs-scroll="true" aria-labelledby="offcanvasTopLabel${id}">
          <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasTopLabel${id}">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          ${overview}
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  More...
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
        </div>
        <h6 class="offcanvas-body">${recorrerGenres(dato.genres)}</h6>
      </div>

    </li>`;
  });

lista.innerHTML = indexhtml;
}