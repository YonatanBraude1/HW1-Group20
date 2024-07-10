document.getElementById('year').textContent = new Date().getFullYear();

function toggleMode() {
    const body = document.body;
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'b623dac485264e42ad814537d4536c30';
    const apiUrl = `https://newsapi.org/v2/everything?q=bitcoin&from=2024-06-09&sortBy=publishedAt&apiKey=${apiKey}`;

    // Fetch top headlines for the home page
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('API response:', data); // Log the entire response to inspect it
            const newsDataDiv = document.getElementById('news-data');
            newsDataDiv.innerHTML = ''; // Clear existing content

            data.articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.className = 'article-item p-4 border rounded mb-4 bg-white shadow';

                const articleContent = `
                    <h2 class="text-xl font-bold">${article.title}</h2>
                    <img src="${article.urlToImage}" alt="${article.title}" class="w-32 h-32 object-cover mb-4">
                    <p class="text-gray-700">${article.description}</p>
                    <p class="text-green-700 font-bold">${article.publishedAt}</p>
                    <a href="${article.url}" target="_blank" class="text-blue-500">Read more</a>
                `;

                articleDiv.innerHTML = articleContent;

                // Add favorite button
                const favoriteButton = document.createElement('button');
                favoriteButton.textContent = '★'
                favoriteButton.className = 'favorite-button ml-2 text-yellow-500';
                favoriteButton.addEventListener('click', () => {
                    toggleFavorite(article);
                    favoriteButton.classList.toggle('text-yellow-500'); // Toggle color on click
                    favoriteButton.classList.toggle('text-gray-400');
                });
                articleDiv.appendChild(favoriteButton);

                newsDataDiv.appendChild(articleDiv);
            });
        })
        .catch(error => {
            console.log('Error fetching API data:', error);
            const newsDataDiv = document.getElementById('news-data');
            newsDataDiv.textContent = 'Failed to load news data.';
        });

    // Load favorites on page load
    loadFavorites();
});

function toggleFavorite(article) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(fav => fav.title === article.title);

    if (index !== -1) {
        favorites.splice(index, 1); // Remove from favorites
    } else {
        favorites.push(article); // Add to favorites
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites(); // Refresh favorites list
}

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesDiv = document.getElementById('favorites');

    if (favorites.length > 0) {
        favoritesDiv.innerHTML = ''; // Clear existing content

        favorites.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article-item p-4 border rounded mb-4 bg-white shadow';

            const articleContent = `
                <h2 class="text-xl font-bold">${article.title}</h2>
                <img src="${article.urlToImage}" alt="${article.title}" class="w-32 h-32 object-cover mb-4">
                <p class="text-gray-700">${article.description}</p>
                <p class="text-green-700 font-bold">${article.publishedAt}</p>
                <a href="${article.url}" target="_blank" class="text-blue-500">Read more</a>
            `;

            articleDiv.innerHTML = articleContent;

            // Add favorite button
            const favoriteButton = document.createElement('button');
            favoriteButton.textContent = '★'
            favoriteButton.className = 'favorite-button ml-2 text-yellow-500';
            favoriteButton.addEventListener('click', () => {
                toggleFavorite(article);
                favoriteButton.classList.toggle('text-yellow-500');
                favoriteButton.classList.toggle('text-gray-400');
            });
            articleDiv.appendChild(favoriteButton);

            favoritesDiv.appendChild(articleDiv);
        });
    } else {
        favoritesDiv.innerHTML = 'No favorites yet.';
    }
}