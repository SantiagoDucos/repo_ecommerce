// THIS FUCION SHOWS THE ARTICLES IN THE HTML
function showCars(articles) {
  let htmlContentToAppend = "";
  let numberOfArticles = articles.length;
  let i;
  let article;

  for (i = 0; i < numberOfArticles; i++) {
    article = articles[i];

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
          <p class="mb-1">` + article.description + `</p>
          <p class="mb-1">` + article.cost + " " + article.currency + `</p>
        </div>
      </div>
    </div>`;

    document.getElementById("show-articles").innerHTML = htmlContentToAppend;
  }
}

// THIS FUNCTION IS EXECUTED WHEN THE PAGE IS LOADED
document.addEventListener("DOMContentLoaded", function (e) {
  let articlesArray = [];
  // WE EXTRACT THE INFORMATION FROM THE URL OF PRODUCTOS_URL
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") { // IF THE STATUS IS ok
      articlesArray = resultObj.data;
      showCars(articlesArray);
    } else { // IF THE STATUS IS NO ok
      alert("Ha ocurrido un error, intente mas tarde");
    }
  });
});