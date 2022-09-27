
//Funciones Auxiliares

/**
 * Hace GET a url, obtiene un JSON y devuelve un objeto
 * @param {String} url
 * @return {Object}
 */  
async function getData(url) {
  return fetch(url).then(async (response) => await response.json());
}

/**
 * @param {Array} genres  arreglo de generos de peliculas - Objetos [{}]
 * @param {String} input valor digitado en buscador
 * @returns {Boolean} booleano que indica si input esta contenido en genres[i].name
 */
function filterGender(genres, input) {
  let genderFound = false;
  for (let i = 0; i < genres.length; i++) {
    genderFound = genres[i].name.toLowerCase().includes(input.toLowerCase());
    if (genderFound) break; // si encuentra al menos un genero que contiene el input, entra en el if y paramos el for
  }
  return genderFound;
}

/**
 * @param {Array} films arreglo films de peliculas
 * @param {String} input valor digitado en buscador
 * @returns {Array} arreglo de las peliculas que cumplen
 * con la condicion de que input esté dentro de sus atributos : title, genres, tagline, overview.
 */
function filtrar(films, input) {
  return films.filter(function (dato) {
    const { title, genres, tagline, overview } = dato;
    return (
      title.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
      filterGender(genres, input) ||
      tagline.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
      overview.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
  });
}

/**
* Se le pasa un numero real  n y devuelve un string de 5 estrellas 
* @param {Number} n
* @returns {String}
*/
function cantidadEstrellas(n) {
  let stars = "";
  let starsValue = Math.round(n) / 2;
  let half = starsValue - Math.floor(starsValue); // vale 0 ó 0.5

  for (let i = 0; i < 5; i++) {
    stars += `<span class="fa fa-star ${
      i < starsValue
        ? i + half == starsValue
          ? `fa-star-half-o`
          : `checked`
        : `fa-star-o`
    }"></span>`;
  }
  return stars;
}

/**
* Se le pasa arreglo con generos de peliculas genresArray y lo transforma en texto HTML
* @param {Array} genresArray
* @returns {String} HTML
*/
function recorrerGenres(genresArray) {
  let result = "";
  for (const gender of genresArray) {
    result += gender.name + ", ";
  }
  // le cortamos los ultimos 2 caracteres ", "
  result = result.slice(0, result.length - 2);
  return result;
}


/**
* Se le pasa un elemento HTML @param {object} lista , y un arreglo de objetos @param {Array} datos
* y los despliega en el html
*/
function mostrarResultados(lista, datos) {
  let indexhtml = "";
  datos.forEach((dato) => {
    const {
      title,
      tagline,
      vote_average,
      overview,
      id,
      release_date,
      revenue,
      runtime,
      genres,
    } = dato;
    indexhtml += ` 
    <li>
    <div class="box">
      <div class="result row" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${id}" aria-controls="offcanvasTop">
        <div class="col-9 text">
          <h3>${title}</h3>
          <p>${tagline}</p>
        </div>
        <div class="col-3 stars">${cantidadEstrellas(vote_average)}
        </div>
      </div>

      <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${id}" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h4 class="offcanvas-title colort" id="offcanvasExampleLabel">${title}</h4>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
          ${overview}
          </div>
          <br>
          <h6 class="color">${recorrerGenres(genres)}</h6>
        </div>
        <div class="dropdown mt-3" id="boton">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          MORE
        </button>
        <ul class="dropdown-menu">
              <li><a class="dropdown-item">${release_date}</a></li>
              <li><a class="dropdown-item">${runtime}</a></li>
              <li><a class="dropdown-item">${revenue}</a></li>
        </ul>
      </div>
      </div>
      </div>
    </li>`;
  });

  lista.innerHTML = indexhtml;
}
