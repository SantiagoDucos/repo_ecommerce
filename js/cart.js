var carrito = [];

function calcularPrecioUnitarioSegunMondeda(precioUnitario, moneda) {
    let precioEnPesos = 0;
    if (moneda == 'USD') {
        precioEnPesos = precioUnitario * 40;
    } else {
        precioEnPesos = precioUnitario;
    }
    return precioEnPesos;
}

function calcularEnvio() {

    let costoTotal = parseInt(document.getElementById('costo-total').innerHTML);
    let tipoDeEnvio = '';
    let precioFinal = 0;
    let extraEnvio = 0;

    let radios = document.getElementsByName('radio-envio');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            tipoDeEnvio = radios[i].value;
        }
    }

    switch (tipoDeEnvio) {
        case 'retiro':
            precioFinal = costoTotal;
            break;
        case 'rapido':
            extraEnvio = 0.08 * costoTotal;
            precioFinal = costoTotal + extraEnvio;
            break;
        case 'normal':
            extraEnvio = 0.04 * costoTotal;
            precioFinal = costoTotal + extraEnvio;
            break;
        default:
            alert("Ocurrió un error");
    }
    return precioFinal;
}

function calcularPrecioTotal() {
    let precios = document.getElementsByClassName('precio');
    let precioTotal = 0;
    for (let i = 0; i < precios.length; i++) {
        precioTotal += parseInt(precios[i].innerHTML);
    }
    document.getElementById('costo-total').innerHTML = precioTotal;
    document.getElementById('costoFinal').innerHTML = calcularEnvio();
}

function calcularPrecioProducto(precioUnitario, moneda, i) {
    let cantidad = document.getElementById('cantidad-' + i).value;
    let precio = 0;
    precio = calcularPrecioUnitarioSegunMondeda(precioUnitario, moneda) * parseInt(cantidad);
    $('#precio-' + i).html(precio);
    calcularPrecioTotal();
}

function mostrarProductosCarrito(prodArray) {
    let contenidoHtml = '';
    for (let i = 0; i < prodArray.length; i++) {
        let producto = prodArray[i];
        let precio = calcularPrecioUnitarioSegunMondeda(producto.unitCost, producto.currency) * producto.count;
        contenidoHtml += `
            <tr>
                <td>${producto.name}</td>
                <td><img class="prod" src="${producto.src}" alt="${producto.name}"></td>
                <td>${producto.unitCost} ${producto.currency}</td>
                <td>
                    <input
                        id="cantidad-${i}"
                        type="number"
                        value="${producto.count}" 
                        min="1" 
                        onchange="calcularPrecioProducto(${producto.unitCost}, '${producto.currency}', ${i})"
                    >
                </td>
                <td><span class="precio" id="precio-${i}">${precio}</span></td>
            </tr>
        `;
    }
    document.getElementById('productos-carro').innerHTML = contenidoHtml;
    calcularPrecioTotal()
    document.getElementById('costoFinal').innerHTML = calcularEnvio();
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data;
            mostrarProductosCarrito(carrito.articles);
            calcularEnvio();
        }
    });

    let radios = document.getElementsByName('radio-envio');
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function() {
            document.getElementById('costoFinal').innerHTML = calcularEnvio();
        });
    }
});