// show news upon window load
window.onload = showNews();

// get news from API
async function getNews() {
  const mainNewsResponse = await fetch(
    "https://www.ntv.ru/exp/news/hbbtv/?top=4"
  );
  const allNewsResponse = await fetch("https://www.ntv.ru/exp/news/hbbtv/");

  const mainNews = await mainNewsResponse.json();
  const allNews = await allNewsResponse.json();

  return {
    mainNews,
    allNews
  };
}

// function to show news after they have been fetched from AIP
function showNews() {
  getNews().then(data => {
    showMainNews(data.mainNews);
    showAllNews(data.allNews);
  });
}

// function to show main news
function showMainNews(news) {
  let output = "";
  news.forEach(i => {
    output += `<p class="main-news__item">${i.title}</p>`;
  });
  document.querySelector(".main-news").innerHTML = output;
}

// function to show all news
function showAllNews(news) {
  let output = "";
  news.forEach(i => {
    output += `
      <article class="news-article">
      <div class="news-article__time">${i.date.slice(11, 16)}</div>
      <div class="news-article__image">
        <img src="${i.image === undefined ? "no image" : i.image.link}" alt="${
      i.image === undefined ? "фото отсутствует" : i.title
    }"  />
      </div>
      <div class="news-article__text">
        <h3 class="news-article__header">${i.title}</h3>
        <p class="news-article__text">${i.description}</p>
      </div>
    </article>
    `;
  });
  document.querySelector(".all-news").innerHTML = output;
}



function showArticle(){

}