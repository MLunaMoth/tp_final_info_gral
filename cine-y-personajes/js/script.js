// Espera a que todo el HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {

    // Selector del <select> para ordenar
    const selectOrden = document.getElementById("ordenPeliculas");

    // Contenedor que tiene todas las películas
    const contenedor = document.querySelector(".row.g-4");

    // Escucha cuando el usuario cambia la opción del select
    selectOrden.addEventListener("change", () => {

        // Obtiene todas las películas y las convierte en array
        const peliculas = Array.from(document.querySelectorAll(".pelicula"));

        // Array donde se guardará el nuevo orden
        let ordenadas = [];

        // Decide el tipo de orden según la opción elegida
        switch (selectOrden.value) {

            // Orden alfabético A–Z
            case "az":
                ordenadas = peliculas.sort((a, b) =>
                    a.dataset.titulo.localeCompare(b.dataset.titulo)
                );
                break;

            // Orden alfabético Z–A
            case "za":
                ordenadas = peliculas.sort((a, b) =>
                    b.dataset.titulo.localeCompare(a.dataset.titulo)
                );
                break;

            // Orden por año (más antiguo primero)
            case "anioAsc":
                ordenadas = peliculas.sort((a, b) =>
                    a.dataset.anio - b.dataset.anio
                );
                break;

            // Orden por año (más reciente primero)
            case "anioDesc":
                ordenadas = peliculas.sort((a, b) =>
                    b.dataset.anio - a.dataset.anio
                );
                break;

            // Si no se eligió nada, no hace nada
            default:
                return;
        }

        // Limpia el contenedor
        contenedor.innerHTML = "";

        // Vuelve a insertar las películas ya ordenadas
        ordenadas.forEach(pelicula => contenedor.appendChild(pelicula));
    });

});
