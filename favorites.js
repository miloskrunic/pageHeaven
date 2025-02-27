document.addEventListener("DOMContentLoaded", () => {
    loadFavorites();
});

function loadFavorites() {
    const favoritesSection = document.getElementById("favorites-section");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesSection.innerHTML = ''; 

    if (favorites.length === 0) {
        favoritesSection.innerHTML = '<p>No favorite books yet.</p>';
        return;
    }

    favorites.forEach(book => {
        const div_card = document.createElement('div');
        div_card.classList.add('card');

        const div_column = document.createElement('div');
        div_column.classList.add('column');

        const image = document.createElement('img');
        image.classList.add('thumbnail');
        image.src = book.coverURL;

        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;

        const yearElement = document.createElement('p');
        yearElement.textContent = `First Published: ${book.publishYear}`;

        // Dugme za uklanjanje iz favorita
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('favorite-btn');
        removeBtn.innerHTML = '❌';
        removeBtn.addEventListener("click", () => {
            removeFromFavorites(book.title);
            loadFavorites(); // Ponovo učitaj listu
        });

        div_card.appendChild(image);
        div_card.appendChild(titleElement);
        div_card.appendChild(authorElement);
        div_card.appendChild(yearElement);
        div_card.appendChild(removeBtn);
        div_column.appendChild(div_card);
        favoritesSection.appendChild(div_column);
    });
}

// Uklanja knjigu iz Local Storage-a
function removeFromFavorites(title) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(book => book.title !== title);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
