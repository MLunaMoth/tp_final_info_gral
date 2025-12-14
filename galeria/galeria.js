// Selecciona todos los botones que tienen la clase 'filter-btn'
const filterButtons = document.querySelectorAll('.filter-btn');

// Selecciona todos los elementos que representan a los personajes
const characters = document.querySelectorAll('.character-item');

// ""escuchaRecorre cada botón para agregarle un evento de click""
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        // Obtiene el valor del atributo data-filter del botón clickeado
        const filter = button.getAttribute('data-filter');

        // Recorre todos los personajes
        characters.forEach(character => {
            
            // Si el filtro es 'all' o el personaje tiene la clase que coincide con el filtro
            if (filter === 'all' || character.classList.contains(filter)) {
                character.style.display = 'block'; // Lo muestra
            } else {
                character.style.display = 'none'; // Lo oculta
            }
        });
    });
});
