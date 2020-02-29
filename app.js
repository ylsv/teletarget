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
  }).catch(err => console.log(err));
}

// function to show main news
function showMainNews(news) {
  let output = "";
  news.forEach(i => {
    output += `<p class="main-news__item" id="${i.id}">${i.title}</p>`;
  });
  document.querySelector(".main-news").innerHTML = output;
}

// function to show all news
function showAllNews(news) {
  let output = "";
  news.forEach(i => {
    output += `
    <article class="news-article" id="${i.id}">
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



// show single news after click
document.querySelector('.news-container').addEventListener('click', showSingleArticle);

function showSingleArticle(e){
  getNews().then(data => {
    showArticle(data.allNews);
  }).catch(err => console.log(err));
  
  function showArticle(news) {
    news.forEach(i => {
      if(i.id === e.target.id || i.id === e.target.parentElement.parentElement.id) {
        document.querySelector('.news-container').innerHTML = `
        <div class="article">
          <div class="article__backBtn">
            <div class="backBtn">
              <img src="source/back.png" alt="back">
              <div class="backBtn__text">назад</div>
            </div>
          </div>

          <article class="article__content">
            <div class="article__header">
              <div class="article__time">${i.date.slice(0, 10).split('-').reverse().join('.')}, ${i.date.slice(11, 16)}</div>
              <div class="article__header-wrapper">
                <h3 class="article__header-text">${i.title}</h3>
                <div class="article__header-short">${i.description}</div>
              </div>
            </div>
            <div class="article__image">
              <img src="${i.image === undefined ? "no image" : i.image.link}" alt="${
                i.image === undefined ? "фото отсутствует" : i.title
              }" />
            </div>
            <p class="article__text">${i.fulltext}</p>
          </article>
        </div>
        `
      }
    })
  };  
}


// handling back button on single news page
document.querySelector('.news-container').addEventListener('click', goBack);

function goBack(e){
  if(e.target.classList.contains('article__backBtn')
  || e.target.classList.contains('backBtn')
  || e.target.classList.contains('backBtn__text')
  || e.target.alt === 'back'
  ) {
    location.reload();
  }
}