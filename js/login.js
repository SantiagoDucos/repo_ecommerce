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

    (function () {
        'use strict';
        window.addEventListener('load', function () {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        event.preventDefault();
                        event.stopPropagation();
                        
                        let inputEmail = document.getElementById("inputEmailLogin");
                        let inputPassword = document.getElementById("inputPasswordLogin"); // sin funcion
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
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();

});