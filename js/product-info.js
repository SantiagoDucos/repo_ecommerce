var product = {};
var comments = [];
var products = [];



// ESTA FUNCION MUESTRA LOS PRODUCTOS RELACIONADOS EN PANTALLA
function showRelatedProducts(allProducts, relatedProducts) {
    let htmlContentToAppend = "";
    relatedProducts.forEach(function (indice) {
        htmlContentToAppend += `
        <div class="col-md-4">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top"  src="${allProducts[indice].imgSrc}">
                <h3 class="m-3">${allProducts[indice].name}</h3>
                <div class="card-body">
                    <p class="card-text">${allProducts[indice].cost} ${allProducts[indice].currency}</p>
                </div>
            </a>
        </div>
        `;
    });
    document.getElementById("div-productos-relacionados").innerHTML = htmlContentToAppend;
}

// ESTA FUNCION MUESTRA LAS IMAGENES EN PANTALLA
function showImagesGallery(imagenesArray) {
    for (let i = 0; i < imagenesArray.length; i++) {
        let imageSrc = imagenesArray[i];
        document.getElementById('img' + i).src = imageSrc;
    }
}

// ESTA FUNCION ORDENA LOS COMENTARIOS POR FECHA, DE FORMA DECENDETE
function ordenarDesendenteComentariosPorFecha(comentariosArray) {
    let result = [];
    result = comentariosArray.sort(function (a, b) {
        let fecha1 = new Date(a.dateTime);
        let fecha2 = new Date(b.dateTime);
        if (fecha1 > fecha2) {
            return -1;
        }
        if (fecha1 < fecha2) {
            return 1;
        }
        return 0;
    });
    return result;
}

// ESTA FUNCION MUESTRA EN PANTALLA LOS COMENTARIOS
function showComments(comentariosArray) {
    let htmlContentToAppend = "";
    let meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    let diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];
    for (let i = 0; i < comentariosArray.length; i++) {
        let comentario = comentariosArray[i];

        let fecha = new Date(comentario.dateTime);
        let fechaString = `
        ${diasSemana[fecha.getDay()]}, ${fecha.getDate()} de  ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}
        `;

        htmlContentToAppend += `
        <br>
        <p><strong>${comentario.user}</strong> &nbsp`;
        for (let i = 1; i <= comentario.score; i++) {
            htmlContentToAppend += '<span class="fa fa-star checked"></span>';
        }
        for (let i = comentario.score + 1; i <= 5; i++) {
            htmlContentToAppend += '<span class="fa fa-star"></span>';
        }
        htmlContentToAppend += `
        </p><div style="display: flex;">    
            <p>${comentario.description}. &nbsp <p style="color: gray; font-size: 0.9rem;">${fechaString}</p></p> 
        </div>
        <hr />
        `;

        document.getElementById("comentariosCalificaciones").innerHTML = htmlContentToAppend;
    }
}

// ESTA FUNCION MUESTRA EN PANTALLA EL PRODUCTO
function showProduct(producto) {
    try {
        document.getElementById("nombreDelProducto").innerHTML = producto.name;
        document.getElementById("descripcionDelProducto").innerHTML = producto.description;
        document.getElementById("precioDelProducto").innerHTML = `${producto.cost} ${producto.currency}`;
        document.getElementById("cantidadDeVentas").innerHTML = producto.soldCount;

        showImagesGallery(product.images);

        comments = ordenarDesendenteComentariosPorFecha(comments);
            showComments(comments);
    } catch (e) {
        alert("Ocurrió un error, se recargará la pagina");
        location.reload();
    }
        
}

// ESTA FUNCION CUENTA LA CANTIDAD DE ENTRELLAS QUE SELECCIONÓ EL CLIENTE
function getRating(radioBtn) {
    let score = 0;
    radioBtn.forEach(function (radio) {
        if (radio.checked) {
            score = parseInt(radio.value);
        }
    });
    return score;
}

document.addEventListener("DOMContentLoaded", function () {
    
    
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            showProduct(product);
            showRelatedProducts(products, product.relatedProducts);
        }
    });
    

    // usuario logueado -> escribir comentario
    let userLogged = localStorage.getItem("user-logged");
    if (userLogged) {
        document.getElementById("calificacion").style = "display: inline-block";
    }
});

// CUANDO UN USUARIO AGREGE UN COMENTARIO
document.getElementById("btn-enviar-calificacion").addEventListener("click", function () {
    let elementoTextArea = document.getElementById("ta-comentario");
    let comentrario = elementoTextArea.value;

    if (comentrario != "") {
        comentarioParaAgregar = {};

        let userLogged = localStorage.getItem("user-logged");
        userLogged = JSON.parse(userLogged);
        let email = userLogged.email;

        let dateTime = new Date();
        let fechaHora = `
        ${dateTime.getFullYear()}-
        ${dateTime.getMonth() + 1}-
        ${dateTime.getDate()} ${dateTime.getHours()}:
        ${dateTime.getMinutes()}:
        ${dateTime.getSeconds()}
        `;

        let elements = document.getElementsByName("rating");

        comentarioParaAgregar = {
            score: getRating(elements),
            description: comentrario,
            user: email,
            dateTime: fechaHora,
        };

        comments.unshift(comentarioParaAgregar);

        showComments(comments);

        elementoTextArea.value = "";
        elements.forEach(function (radio) {
            if (radio.value == 5) {
                radio.checked = true;
            }
        });

        document.getElementById("prueba").scrollIntoView({ behavior: "smooth" });
    } else {
        alert("Debe completar el comentario y la calificación");
    }
});
