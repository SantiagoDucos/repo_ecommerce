var carrito = [];

function eliminarArticulo(indice) {
    if (carrito.length > 0) {
        carrito.splice(indice, 1);
        mostrarProductosCarrito(carrito);
    }
}

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
        case 'premium':
            extraEnvio = 0.15 * costoTotal;
            precioFinal = costoTotal + extraEnvio;
            break;
        case 'express':
            extraEnvio = 0.07 * costoTotal;
            precioFinal = costoTotal + extraEnvio;
            break;
        case 'standard':
            extraEnvio = 0.05 * costoTotal;
            precioFinal = costoTotal + extraEnvio;
            break;
        default:
            alert("Ocurrió un error");
    }
    return '$ ' + precioFinal;
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
    if (prodArray.length != 0) {
        let contenidoHtml = '';
        prodArray.forEach(function (producto, indice) {
            let precio = calcularPrecioUnitarioSegunMondeda(producto.unitCost, producto.currency) * producto.count;
            contenidoHtml += `
                <tr>
                    <td>${producto.name}</td>
                    <td><img class="prod" src="${producto.src}" alt="${producto.name}"></td>
                    <td>${producto.unitCost} ${producto.currency}</td>
                    <td>
                        <input
                            id="cantidad-${indice}"
                            type="number"
                            value="${producto.count}" 
                            min="1" 
                            onchange="calcularPrecioProducto(${producto.unitCost}, '${producto.currency}', ${indice})"
                        >
                    </td>
                    <td><span class="precio" id="precio-${indice}">${precio}</span></td>
                    <td><button class="btn btn-danger" onclick="eliminarArticulo(${indice});">Eliminar</button></td>
                </tr>
            `;
        });
        document.getElementById('productos-carro').innerHTML = contenidoHtml;
        calcularPrecioTotal()
        document.getElementById('costoFinal').innerHTML = calcularEnvio();
    } else {
        console.log("entre");
        document.getElementById('contenedor').innerHTML = `
            <h2>No hay ningun articulo en el carrito</h2>
        `;
    }
}

function ok() {
    let pais = document.getElementById("pais").value;
    let calle = document.getElementById("calle").value;
    let numero = document.getElementById("numero").value;
    let esquina = document.getElementById("esquina").value;

    if (pais != '' && calle != '' && numero != '' && esquina != '') {
        location.href = "home.html";
    }
}

    document.addEventListener("DOMContentLoaded", function (e) {

        isLogged('cart.html', 'Para poder acceder a este sitio necesitas loguearte.');

        getJSONData(CART_INFO_URL2).then(function (resultObj) {
            if (resultObj.status === "ok") {
                carrito = resultObj.data.articles;
                mostrarProductosCarrito(carrito);
                calcularEnvio();
            }
        });

        let radios = document.getElementsByName('radio-envio');
        for (let i = 0; i < radios.length; i++) {
            radios[i].addEventListener('change', function () {
                document.getElementById('costoFinal').innerHTML = calcularEnvio();
            });
        }
    });

    document.getElementById('formaDePago').addEventListener('change', function () {

        let metodoPago = document.getElementById('formaDePago').value;
        let div = document.getElementById('div-formaDePago');

        if (metodoPago == 'transferencia') {
            div.innerHTML = `
                <div id="transferencia">
                    <div class="form-group">
                        <select class="form-control transferencia" required>
                            <option>BROU</option>
                            <option>Santander</option>
                            <option>Itau</option>
                            <option>BBVA</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control tarjeta" placeholder="Nombre del titular" required>
                        <div class="invalid-feedback">
                            Ingrese el nombre del titular por favor
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control tarjeta" placeholder="Número de cuenta" pattern="[0-9]+" required>
                        <div class="invalid-feedback">
                            Ingrese el número por favor
                        </div>
                    </div>
                </div>
            `;
        } else if (metodoPago == 'tarjeta') {
            div.innerHTML = `
            <div id="tarjeta">
                <div class="form-group">
                    <input type="text" class="form-control tarjeta"
                        placeholder="Numero de tarjeta (sin espacios)" pattern="[0-9]{16}" required>
                    <div class="invalid-feedback">
                        Ingrese su numero de tarjeta por favor
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control tarjeta" placeholder="Vencimiento (MM/YYYY)"
                        pattern="[0-9]{2}/[0-9]{4}" required>
                    <div class="invalid-feedback">
                        Ingrese el vencimiento de su tarjeta por favor
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control tarjeta" placeholder="Código de seguridad" required>
                    <div class="invalid-feedback">
                        Ingrese el codigo de seguridad de su tarjeta por favor
                    </div>
                </div>
            </div>
        `;
        }
    });