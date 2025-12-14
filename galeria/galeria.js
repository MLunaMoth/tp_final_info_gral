const filterButtons = document.querySelectorAll('.filter-btn');
const characters = document.querySelectorAll('.character-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        characters.forEach(character => {
            if (filter === 'all' || character.classList.contains(filter)) {
                character.style.display = 'block';
            } else {
                character.style.display = 'none';
            }
        });
    });
});
