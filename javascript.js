const APILINK = "https://openlibrary.org/search.json?q=";
const IMG_PATH = "https://covers.openlibrary.org/b/id/";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

function returnBooks(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            main.innerHTML = '';

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

                div_card.appendChild(image);
                div_card.appendChild(titleElement);
                div_card.appendChild(authorElement);
                div_card.appendChild(yearElement);
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

