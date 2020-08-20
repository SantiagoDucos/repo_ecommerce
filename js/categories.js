const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
// ARRAY GLOBAL DE CATEGORIAS
var currentCategoriesArray = [];
// VARIABLE GLOBAL DE CRITERIO DE ORDENAMIENTO
var currentSortCriteria = undefined;
// VARIABLES GLOBALES DE RANGO DE CANTIDAD DE ARTICULOS POR CATEGORIA
var minCount = undefined;
var maxCount = undefined;

// ESTA FUNCION ORDENA (SEGUN UN CRITERIO INGRESADO) Y RETORNA UN ARRAY DE CATEGORIAS INGRESADO
function sortCategories(criteria, array) {

    // EN ESTE ARRAY SE VAN A GUARDAR LAS CATEGORIAS ORDENADAS SEGUN UN CRITERIO
    let result = [];

    if (criteria === ORDER_ASC_BY_NAME) { // ORDEN ACENDENTE SEGUN EL NOMBRE DE LAS CATEGORIAS

        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }x
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) { // ORDEN DECENDENTE SEGUN EL NOMBRE DE LAS CATEGORIAS
        
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) { // ORDEN DECENDENTE SEGUN LA CANTIDAD DE ARTICULOS DE CADA CATEGORIA
        
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

// ESTA FUNCION FILTRA Y MUESTRA CATEGORIAS, SEGUN LA CANTIDAD DE ARTICULOS QUE SE ENCUENTREN EN ELLA
function showCategoriesList() {

    // EN ESTA VARIABLE SE VAN A IR ALMACENANDO LA INFORMACION DE CADA UNA DE LAS CATEGORIAS QUE SE VAN A MOSTRAR
    let htmlContentToAppend = "";

    // ITERAMOS EL ARRAY QUE CONTIENE LAS CATEGORIAS
    let cantidadDeCategorias = currentCategoriesArray.length; 
    for (let i = 0; i < cantidadDeCategorias; i++) {
        
        let category = currentCategoriesArray[i];

        // SE FILTRA SEGÚN LA INFORMACION QUE INGRESA EL USUARIO
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) {

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + `</h4>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `;
        }

        // SE MUESTRA LA CATEGORIA EN LA PAGINA HTML
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

// ESTA FUNCION ESTABLECE UN CRITERIO ACTUAL DE ORDENAMIENTO DE CATEGORIAS
function sortAndShowCategories(sortCriteria, categoriesArray) {
    // GUARDAMOS EL CRITERIO INGRESADO COMO EL CRITERIO ACTUAL
    currentSortCriteria = sortCriteria;

    // GUARDAMOS ESE ARRAY DE CATEGORIAS INGRESADO COMO EL ARRAY DE CATEGORIAS ACTUAL
    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    // ORDENAMOS EL ARRAY SEGUN EL CRITERIO INGRESADO
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    // MOSTRAMOS LAS CATEGORIAS
    showCategoriesList();
}


document.addEventListener("DOMContentLoaded", function (e) {

    // EXTRAEMOS LAS CATEGORIAS DE LA URL Y LAS MOSTRAMOS SEGUN EL NOMBRE DE MANERA ACENDETE
    getJSONData(CATEGORIES_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });


    // EVENTO PARA ORDENAR Y MOSTRAR LAS CATEGORIAS DE FORMA ACENDENTE SEGUN EL NOMBRE
    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });


    // EVENTO PARA ORDENAR Y MOSTRAR LAS CATEGORIAS DE FORMA DECENDENTE SEGUN EL NOMBRE
    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });


    // EVENTO PARA ORDENAR Y MOSTRAR LAS CATEGORIAS DE FORMA DECENDETE SEGUN LA CANTIDAD DE ARTICULOS
    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });


    // EVENTO PARA QUITAR EL FILTRO DE CANTIDAD DE ARTICULOS POR CATEGORIA
    document.getElementById("clearRangeFilter").addEventListener("click", function () {

        // DEJAMOS VACIOS LOS INPUTS 
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        // BORRAMOS EL ULTIMO FILTRO INGRESADO
        minCount = undefined;
        maxCount = undefined;

        // MOSTRAOS LAS CATEGORIAS SIN FILTRO DE POR RANGO
        showCategoriesList();
    });


    // EVENTO QUE APLICA EL FILTRO A LA CANTIDAD DE ARTICULOS POR CATEGORIA
    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        
        // EXTRAEMOS LOS VALORES INGRESADOS POR EL CLIENTE
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        // VERIFICAMOS LOS DATOS INGRESADOS
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        // MOSTRAMOS LAS CATEGORIAS SEGUN LOS VALORES INGRESADOS
        showCategoriesList();
    });
});