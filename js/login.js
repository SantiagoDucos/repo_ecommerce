// CUANDO TERMINE DE CARGARSE EL DOM
document.addEventListener("DOMContentLoaded", function(e){

    // SE CREAR UN EVENTO, QUE ESCUCHA AL BOTÓN DE INGRESAR 
    document.getElementById("buttonIngresoLogin").addEventListener("click", function (e) {

    // EXTRAEMOS LOS DATOS
    let inputEmail = document.getElementById("inputEmailLogin");
    let inputPassword = document.getElementById("inputPasswordLogin");
        
    // VERIFICAMO QUE LOS CAMPOS ESTÉN COMPLETOS
    let camposCompletos = true;
    if (inputEmail.value === '' || inputPassword.value === ''){
        camposCompletos = false;
        alert("Debes ingresar tus datos para continuar.");
    }

        if (camposCompletos) { // SI LOS DATOS ESTÁN COMPLETOS
        // GUARDAMOS EN EL STORAGE LA INFORMACION INGRESADA
        localStorage.setItem('user-logged', JSON.stringify({ email: inputEmail.value }));
        window.location = 'home.html';
    }

  });

});


