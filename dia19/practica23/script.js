
const API_KEY = "COLOCA_AQUI_TU_API_KEY";

const URL_BASE = "https://api.themoviedb.org/3";
const URL_IMAGENES = "https://image.tmdb.org/t/p/w500";

$(document).ready(function(){
    
    $("#btnBuscar").on("click", function(){
        buscar();
    });

    $("#txtBusqueda").on("Keypress", function(evento){
        if(evento.which === 13){
            buscar();
        }
    });
});

function buscar(){
    const texto = $("#txtBusqueda").val().trim();

    if(texto === ""){
        $("#mensaje").text("Por favor, escribe el nombre de una película o serie.");
        $("#resultados").empty();
        return;
    }

    $("#resultados").empty();
    $("#mensaje").text("Buscando...");

    $.ajax({
        url: URL_BASE + "/search/multi",
        method: "GET",
        data:{
            api_key: API_KEY,
            query: texto,
            language: "es-ES"
        },
        success: function(respuesta){
            mostrarResultados(respuesta.results);
        },
        error: function(){
            $("#mensaje").text("Ocurrió un error al conectar con la API.");
        }
    });

}

function mostrarResultados(peliculas){
    if(!peliculas || peliculas.length === 0){
        $("#mensaje").text("No se encontraron resultados.");
        return;
    }

    $("#mensaje").text("");

    peliculas.forEach(function (item){

        const titulo = item.title || item.name || "Sin título";
        
        const fecha = item.release_date || item.first_air_date || "Fecha desconocida";

        const descripcion = item.overview
            ? item.overview
            : "Sin descripción disponible.";

        const puntuacion = item.vote_average
            ? item.vote_average.tiFixed(1)
            : "N/D";

        const poster = item.poster_path
            ? URL_IMAGENES + item.poster_path
            : "https://via.placeholder.com/500x750?text=Sin+imagen";

        const card = `
            <div class="coll-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <img src="${poster}" class="card-img-top" alt="${titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text text-muted small mb-1">Estreno: ${fecha}</p>
                        <p class="card-text descripcion">${descripcion}</p>
                        <span class="badge bg-warning text-dark mt-auto align-self-start" Puntuación: ${puntuacion}>
                        
                        </span>
                    </div> 
                </div>
            </div>
        `;
        $("#resultados").append(card);
    }); 

}

