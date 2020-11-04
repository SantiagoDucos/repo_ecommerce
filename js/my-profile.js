(function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

document.addEventListener("DOMContentLoaded", function (e) {
    isLogged('cart.html', 'Para poder acceder a este sitio necesitas loguearte.');

    let userLogged = localStorage.getItem('user-logged');
    usuario = JSON.parse(userLogged);
    let usuarioGuardado = localStorage.getItem(usuario.email);
    if (usuarioGuardado) {
        let usuarioGuardadoJSON = JSON.parse(usuarioGuardado);
        let urlImagen = document.getElementById('url-imagen').value = usuarioGuardadoJSON.urlImagen;
        document.getElementById('imagen').src = urlImagen;
        document.getElementById('nombres').value = usuarioGuardadoJSON.nombres;
        document.getElementById('apellidos').value = usuarioGuardadoJSON.apellidos;
        document.getElementById('edad').value = usuarioGuardadoJSON.edad;
        document.getElementById('email').value = usuarioGuardadoJSON.email;
        document.getElementById('telefono').value = usuarioGuardadoJSON.telefono;
    }

});

document.getElementById('datos-usuario').addEventListener('submit', function (e) {
    e.preventDefault();
    let urlImagen = document.getElementById('url-imagen').value;
    let nombres = document.getElementById('nombres').value;
    let apellidos = document.getElementById('apellidos').value;
    let edad = document.getElementById('edad').value;
    let email = document.getElementById('email').value;
    let telefono = document.getElementById('telefono').value;
    
    localStorage.setItem(usuario.email, JSON.stringify({
        urlImagen: urlImagen,
        nombres: nombres,
        apellidos: apellidos,
        edad: edad,
        email: email,
        telefono: telefono
    }));
});

document.getElementById('url-imagen').addEventListener('change', function () {
    let urlImagen = document.getElementById('url-imagen').value;
    document.getElementById('imagen').src = urlImagen;
});