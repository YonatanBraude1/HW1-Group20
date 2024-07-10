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
    const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-06-10&sortBy=publishedAt&apiKey=${apiKey}`;

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

            if (data.articles.length === 0) {
                newsDataDiv.textContent = 'No articles found.';
                return;
            }

            data.articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.className = 'article-item p-4 border rounded mb-4 bg-white shadow';

                const articleContent = `
                    <h2 class="text-xl font-bold">${article.title}</h2>
                    ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="w-32 h-32 object-cover mb-4">` : ''}
                    <p class="text-gray-700">${article.description || 'No description available.'}</p>
                    <p class="text-green-700 font-bold">${new Date(article.publishedAt).toLocaleString()}</p>
                    <a href="${article.url}" target="_blank" class="text-blue-500">Read more</a>
                `;

                articleDiv.innerHTML = articleContent;
                newsDataDiv.appendChild(articleDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching API data:', error);
            const newsDataDiv = document.getElementById('news-data');
            newsDataDiv.textContent = 'Failed to load news data.';
        });
});
