import { fetchNews } from "./weatherNews.js"; // Импортируем правильную функцию

document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "<p>Загрузка новостей...</p>"; // Показать сообщение загрузки.

  const newsArticles = await fetchNews(); // Вызов исправленной функции

  // Очистка контейнера после загрузки.
  newsContainer.innerHTML = "";

  if (newsArticles.length === 0) {
    newsContainer.innerHTML =
      "<p>Не удалось загрузить новости. Попробуйте позже.</p>";
    return;
  }

  newsArticles.forEach((news) => {
    const newsItem = document.createElement("div");
    newsItem.className = "news-item";
    newsItem.innerHTML = `
            <h2><a href="${news.url}" target="_blank">${news.title}</a></h2>
            <p>${news.description}</p>
        `;
    newsContainer.appendChild(newsItem);
  });
});
