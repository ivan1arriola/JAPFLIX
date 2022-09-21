document.addEventListener('DOMContentLoaded', main);

async function main() {
    //--------------Elementos-HTML------------------------------
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('btnBuscar');
    const lista = document.getElementById('lista');
    //-----------------------------------------------------------
    const data = await getData(URL);

    mostrarResultados(filtrar(data, "king"));
}



