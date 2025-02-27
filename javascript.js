const APILINK = "https://openlibrary.org/search.json?q=";
const IMG_PATH = "https://covers.openlibrary.org/b/id/";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

function returnBooks(url) {
    fetch(url)
        .then(res => res.json())
        .then(function (data) {
            main.innerHTML = '';

            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            data.docs.slice(0, 12).forEach(book => {
                const title = book.title || "Unknown Title";
                const author = book.author_name ? book.author_name.join(", ") : "Unknown Author";
                const publishYear = book.first_publish_year || "N/A";
                const coverID = book.cover_i;

                const coverURL = coverID
                    ? `${IMG_PATH}${coverID}-M.jpg`
                    : "https://via.placeholder.com/150x200?text=No+Cover";

                const div_card = document.createElement('div');
                div_card.classList.add('card');

                const div_column = document.createElement('div');
                div_column.classList.add('column');

                const image = document.createElement('img');
                image.classList.add('thumbnail');
                image.src = coverURL;

                const titleElement = document.createElement('h3');
                titleElement.textContent = title;

                const authorElement = document.createElement('p');
                authorElement.textContent = `Author: ${author}`;

                const yearElement = document.createElement('p');
                yearElement.textContent = `First Published: ${publishYear}`;

                const favoriteBtn = document.createElement('button');
                favoriteBtn.classList.add('favorite-btn');
                favoriteBtn.innerHTML = '⭐';

                // Proveri da li je ova knjiga već u favoritima
                if (favorites.some(fav => fav.title === title)) {
                    favoriteBtn.classList.add("active");
                }

                favoriteBtn.addEventListener("click", function () {
                    toggleFavorite({ title, author, publishYear, coverURL }, favoriteBtn);
                });

                div_card.appendChild(image);
                div_card.appendChild(titleElement);
                div_card.appendChild(authorElement);
                div_card.appendChild(yearElement);
                div_card.appendChild(favoriteBtn);
                div_column.appendChild(div_card);
                main.appendChild(div_column);
            });
        })
        .catch(error => console.error("Error fetching books:", error));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value.trim();
    if (searchItem) {
        returnBooks(APILINK + encodeURIComponent(searchItem));
        search.value = "";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    returnBooks(APILINK + "bestsellers");
});

// Funkcija za dodavanje i uklanjanje iz favorita
function toggleFavorite(book, button) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const index = favorites.findIndex(fav => fav.title === book.title);

    if (index === -1) {
        favorites.push(book);
        button.classList.add("active");
    } else {
        favorites.splice(index, 1);
        button.classList.remove("active");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}
