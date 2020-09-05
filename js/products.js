const ORDER_ASC_BY_NAME = "A-Z";
const ORDER_ASC_BY_COST = "LESS TO MAJOR";
const ORDER_DESC_BY_COST = "MAJOR TO LESS";
const ORDER_BY_COUNT_SOLD = "CountSold";
// ARRAY GLOBAL DE PRODUCTOS
var currentProductsArray = [];
// VARIABLE GLOBAL DE CRITERIO DE ORDENAMIENTO
var currentSortCriteria = undefined;
// VARIABLES GLOBALES DE RANGO DEL PRECIO DE LOS ARTICULOS
var minCost = undefined;
var maxCost = undefined;
// VARIABLE GLOBAL DE PALABRA RELACINADA
var searchedWord = undefined; 


// ESTA FUNCION ORDENA (SEGUN UN CRITERIO INGRESADO) Y RETORNA UN ARRAY DE PRODUCTOS INGRESADO
function sortProducts(criteria, array) {

    // EN ESTE ARRAY SE VAN A GUARDAR LOS PREDUCTOS ORDENADOS SEGUN UN CRITERIO
    let result = [];

    if (criteria === ORDER_ASC_BY_COST) { // ORDEN ACENDENTE SEGUN EL PRECIO DEL PRODUCTO

        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) { // ORDEN DECENDENTE SEGUN EL PRECIO DEL PRODUCTO
        
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_COUNT_SOLD) { // ORDEN DECENDENTE SEGUN LA CANTIDAD VENDIDA DEL PRODUCTO
        
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_ASC_BY_NAME) {

        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }

    return result;
}




// ESTA FUNCION FILTRA Y MUESTRA PRODUCTOS SEGUN EL RANGO DE PRECIO ESTABLECIDO
function showProducts() {

    // EN ESTA VARIABLE SE VAN A IR ALMACENANDO LA INFORMACION DE CADA UNO DE LOS PRODUCTOS QUE SE VAN A MOSTRAR
    let htmlContentToAppend = "";

    // ITERAMOS EL ARRAY QUE CONTIENE LOS PRODUCTOS
    let cantidadDeProductos = currentProductsArray.length; 
    for (let i = 0; i < cantidadDeProductos; i++) {
        
        let product = currentProductsArray[i];
        // ESTRAEMOS EL NOMBRE Y LA DESCRIPCION DEL PRUDUCTO
        let nameAndDescription = product.name + product.description;

        // SE FILTRA SEGÚN LA INFORMACION QUE INGRESA EL USUARIO
        if (((minCost == undefined) || (minCost != undefined && product.cost >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && product.cost <= maxCost))) {
            
            // BUSCAMOS SI HAY COINCIDENCIA CON LA PALABRA INGRESADA
            if (searchedWord == undefined || (nameAndDescription.toLowerCase().indexOf(searchedWord) != -1)) {
                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="${ product.imgSrc}" alt="${ product.description }" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${ product.name }</h4>
                                <small class="text-muted">${ product.soldCount } vendidos</small>
                            </div>
                            <p class="mb-1">${ product.description }</p>
                            <p class="mb-1">${ product.cost } ${product.currency}</p>
                        </div>
                    </div>
                </a>
                `;
            }
        }

        // SE MUESTRA EL PRODUCTO EN LA PAGINA HTML
        document.getElementById("show-products").innerHTML = htmlContentToAppend;
    }
}





// ESTA FUNCION ESTABLECE UN CRITERIO ACTUAL DE ORDENAMIENTO DE PRODUCTOS
function sortAndShowProducts(sortCriteria, productsArray) {
    // GUARDAMOS EL CRITERIO INGRESADO COMO EL CRITERIO ACTUAL
    currentSortCriteria = sortCriteria;

    // GUARDAMOS ESE ARRAY DE PRODUCTOS INGRESADO COMO EL ARRAY DE PRODUCTOS ACTUAL
    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    // ORDENAMOS EL ARRAY SEGUN EL CRITERIO INGRESADO
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    // MOSTRAMOS LOS PRODUCTOS
    showProducts();
}




document.addEventListener("DOMContentLoaded", function (e) {

    // EXTRAEMOS LOS PRODUCTOS DE LA URL Y LOS MOSTRAMOS SEGUN EL NOMBRE DE MANERA ACENDETE
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    // EVENTO PARA ORDENAR Y MOSTRAR LOS PRODUCTOS SEGUN EL NOMBRE DE FORMA ACENDENTE
    document.getElementById("sortAscName").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    // EVENTO PARA ORDENAR Y MOSTRAR LOS PRODUCTOS SEGUN EL PRECIO DE FORMA ACENDENTE
    document.getElementById("sortAscCost").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });


    // EVENTO PARA ORDENAR Y MOSTRAR LOS PRODUCTOS SEGUN EL PRECIO DE FORMA DECENDENTE 
    document.getElementById("sortDescCost").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });


    // EVENTO PARA ORDENAR Y MOSTRAR LOS PRODUCTOS SEGUN SUS VENTAS DE FORMA DECENDETE
    document.getElementById("sortByCountSold").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_COUNT_SOLD);
    });


    // EVENTO PARA QUITAR EL FILTRO DE RANGO DE PRECIOS
    document.getElementById("clearRangeFilter").addEventListener("click", function () {

        // DEJAMOS VACIOS LOS INPUTS 
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        // BORRAMOS EL ULTIMO FILTRO INGRESADO
        minCost = undefined;
        maxCost = undefined;

        // MOSTRAOS LOS PRODUCTOS SIN FILTRO DE RANGO DE PRECIOS
        showProducts();
    });


    // EVENTO QUE APLICA EL FILTRO DE RANGO DE PRECIOS
    document.getElementById("applyRangeFilter").addEventListener("click", function() {
        
        // EXTRAEMOS LOS VALORES INGRESADOS POR EL CLIENTE
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        // VERIFICAMOS LOS DATOS INGRESADOS
        if ((minCost != undefined) && (minCost >= 0) && (minCost != "")) {

            minCost = minCost;
        }
        else {

            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost >= 0) && (maxCost != "")) {

            maxCost = maxCost;
        }
        else {

            maxCost = undefined;
        }

        // MOSTRAMOS LAS CATEGORIAS SEGUN LOS VALORES INGRESADOS
        showProducts();
    });

    // EVENTO PARA BUSCAR UNA PALABRA RELACIONADA CON EL NOMBRE O LA DESCRIPCION
    document.getElementById("input-search-word").addEventListener("input", function() {

        searchedWord = document.getElementById("input-search-word").value.toLowerCase();

        showProducts(currentProductsArray);
    });

    // EVENTO PARA LIMPIAR LA PALABRA BUSCADA
    document.getElementById("btn-clean-search-word").addEventListener("click", function () {
        
        document.getElementById("input-search-word").value = "";

        searchedWord = undefined;

        showProducts(currentProductsArray);
    })
});