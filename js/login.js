document.addEventListener("DOMContentLoaded", function (e) {

    let loginNeed = localStorage.getItem('login-need');
    if (loginNeed) {
        loginNeed = JSON.parse(loginNeed);
        document.getElementById('alert').innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" id="mensaje" role="alert">
                <span id="msg">${loginNeed.msg}</span>
                <a href="#" class="close" data-dismiss="alert">&times;</a>
            </div>
        `;
    }

    document.getElementById("buttonIngresoLogin").addEventListener("click", function (e) {

        let inputEmail = document.getElementById("inputEmailLogin");
        let inputPassword = document.getElementById("inputPasswordLogin");

        let camposCompletos = true;
        if (inputEmail.value === '' || inputPassword.value === '') {
            camposCompletos = false;
            alert("Debes ingresar tus datos para continuar.");
        }

        if (camposCompletos) {
            localStorage.setItem('user-logged', JSON.stringify({
                email: inputEmail.value
            }));
            if (loginNeed) {
                localStorage.removeItem('login-need');
                window.location = loginNeed.from;
            } else {
                window.location = 'home.html';
            }
            
        }
    });
});