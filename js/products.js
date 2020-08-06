// SHOW THE ARTICLES
function showCars(articles) {
  let htmlContentToAppend = "";
  let numberOfArticles = articles.length;
  let i;

  for (i = 0; i < numberOfArticles; i++) {
    let article = articles[i];

    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">
      <div class="row">
        <div class="col-3">
          <img src="` + article.imgSrc + `" alt="` + article.name + `" class="img-thumbnail">
        </div>
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">`+ article.name + `</h4>
            <small class="text-muted">` + article.soldCount + ` vendidos</small>
          </div>
          <p>` + article.description + `</p>
          <p>` + article.cost + " " + article.currency + `</p>
        </div>
      </div>
    </div>`;

    document.getElementById("show-articles").innerHTML = htmlContentToAppend;
  }
}

// THIS FUNCTION IS EXECUTED WHEN THE PAGE IS LOADED
document.addEventListener("DOMContentLoaded", function (e) {
  let articlesArray = [];
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      articlesArray = resultObj.data;
      showCars(articlesArray);
    }
  });
});