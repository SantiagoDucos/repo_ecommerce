//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// CUANDO TERMINE DE CARGARSE EL DOM
document.addEventListener("DOMContentLoaded", function(e){

  // SE CREAR UN EVENTO, QUE ESCUCHA AL BOTÓN DE INGRESAR 
  document.getElementById("buttonIngresoLogin").addEventListener("click", function (e) {

    // EXTRAEMOS LOS DATOS
    let email = document.getElementById("inputEmailLogin");
    let password = document.getElementById("inputPasswordLogin");
    // CREAMOS UNA VARIBLE QUE VERIFICA QUE LOS CAMPOS ENTÉN COMPLETOS
    let camposCompletos = true;

    if (password.value === '' || email.value === ''){
      camposCompletos = false;
      alert("Debes ingresar tus datos para continuar.");
    }

    if (camposCompletos){
      window.location = 'home.html';
    }

  });

});


