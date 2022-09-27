const URL = "https://japceibal.github.io/japflix_api/movies-data.json";

async function main() {

  //--------------Elementos-HTML------------------------------
  const inputBuscar = document.getElementById("inputBuscar");
  const btnBuscar = document.getElementById("btnBuscar");
  const listaHTML = document.getElementById("lista");
  //-----------------------------------------------------------

  const data = await getData(URL);
  btnBuscar.addEventListener("click", () => {
    const listaFiltrada = filtrar(data, inputBuscar.value);
    mostrarResultados(listaHTML, listaFiltrada);
  });
}

document.addEventListener("DOMContentLoaded", main);