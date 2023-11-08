const API_KEY="fe0c0dd660cf4483a8c952b6f104cfb0";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews (query){
    // using string template and backtick(``)
   const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data=await res.json();
//    console.log(data);
   bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
   
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML = article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    newsSource.innerHTML=`${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',() =>{
        // new tab is open while clicking over it
        window.open(article.url,"_blank");

    });
}

let curSelectedNav= null;
function onNavItemClick(id){
    //by calling this function the data will be fetch and databinding is also done
    fetchNews(id);
    const navItem = document.getElementById(id);
    // whenever clicks on a new nav item the active class from the old nav item should be removed 
    curSelectedNav?.classList.remove("active");
    // current item will be the current nav item
    curSelectedNav= navItem;
    // in css we give the color of the active class
    curSelectedNav.classList.add("active");
}

const searchButton= document.getElementById("search-button");
const searchText= document.getElementById("search-text");
searchButton.addEventListener("click", () => {
    const query = searchText.value;
    // if user only click the search button without giving any search input return nothing to do
    if(!query) return;
    fetchNews(query);
    // by doing so when we seach in search box after selected any nav item(ipl,politics)nav items will not pointed by(--accent color)
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
});