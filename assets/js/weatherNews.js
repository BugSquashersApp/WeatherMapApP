// weatherNews.js
const API_URL = "https://newsapi.org/v2/top-headlines?country=us";

const API_KEY = "63fbea316ff947dcb427d644c8bd6d79"; // Вставьте ваш правильный API-ключ

export async function fetchNews() {
  try {
    const response = await fetch(`${API_URL}&apiKey=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data); // Логируем ответ от API
    return data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
    }));
  } catch (error) {
    console.error("Ошибка при загрузке новостей:", error);
    return [];
  }
}
