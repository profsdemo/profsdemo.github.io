/// <reference path="crypto-js.js" />

function load_loginjs() {
    const cookies = document.cookie.split(";");
    if (cookies.some((r) => r.trim().startsWith("logged="))) {
        const logged = cookies.find((r) => r.trim().startsWith("logged=")).split("=")[1];
        if (logged == "false") {
            document.querySelectorAll("a[login=\"\"]").forEach((e) => {
                const lg = document.createElement("a");
                /**
                 * @type {HTMLAnchorElement}
                 */
                const login = e;
                lg.textContent = "Se connecter";
                lg.style.cursor = "pointer";
                lg.onclick = () => {
                    document.querySelector("div.hover_bkgr_fricc")
                        .style.display = "block";
                }

                login.appendChild(lg);
            })

            document.querySelector("button[login=\"\"]").onclick = () => {
                const inputs = document.querySelectorAll("input");
                const id = inputs[0], password = inputs[1];

                /**
                 * @type {HTMLButtonElement}
                 */
                const btn = document.querySelector("button[login=\"\"]");
                btn.disabled = true;
                btn.textContent = "Connection...";
                const request = new XMLHttpRequest();
                request.open('GET', "https://profsdemo.github.io/users/pass.json");
                request.responseType = "json";
                request.send();
                request.addEventListener("loadend", () => {
                    if (request.status == 404) {
                        password.value = "";
                        id.value = "";
                        alert("Ce service est en maintenance !");
                        btn.disabled = false;
                        btn.textContent = "Se connecter";
                    }

                    var bool = false;
                    request.response.forEach((user) => {
                        console.log(user);
                        if (user.id == id.value && user.pass == password.value) {
                            bool = true;
                            document.cookie = "logged=true";
                            window.location.reload();
                            document.cookie = `user=${user.id}`;
                        }
                    })
                    if (!bool) {
                        password.value = "";
                        alert("Le nom d'utilisateur ou/et le mot de passe est/sont incorrecte !");
                        btn.disabled = false;
                        btn.textContent = "Se connecter";
                    }
                });
                request.addEventListener("error", () => {
                    password.value = "";
                    id.value = "";
                    alert("Ce service est en maintenance !");
                    btn.disabled = false;
                    btn.textContent = "Se connecter";
                })
            }
        } else {
            const id = cookies.find((r) => r.trim().startsWith("id=")).split("=")[1];
            document.querySelectorAll("a[login=\"\"]").forEach((e) => {
                /**
                 * @type {HTMLAnchorElement}
                 */
                const login = e;
                const lg = document.createElement("a");

                lg.textContent = `Se déconnecter (${id})`;
                lg.style.cursor = "pointer";
                const color = lg.style.color;
                lg.onclick = (e) => {
                    if (window.confirm("Voulez vous vraiment vous déconnecter ?\n\n(OK = Oui, Annuler = Non)")) {
                        document.cookie = "logged=false";
                        window.location.reload();
                    }
                }
                lg.onmouseenter = () => {
                    lg.style.color = "red";
                    lg.style.textDecoration = "underline red";
                }
                lg.onmouseleave = () => {
                    lg.style.color = color;
                    lg.style.textDecoration = "";
                }
                login.appendChild(lg);

                if (id.startsWith("ADMIN_")) {
                    const manage = document.createElement("a");

                    manage.textContent = "Gérer"
                    manage.style.marginLeft = "10px"
                    manage.style.cursor = "pointer"
                    manage.onmouseenter = () => {
                        manage.style.textDecoration = `underline ${color}`;
                    }
                    manage.onmouseleave = () => {
                        manage.style.textDecoration = ``;
                    }
                    manage.onclick = () => {
                        window.alert("Ce service n'est pas encore disponible !")
                    }

                    login.appendChild(manage);
                }
            })
        }
    } else {
        document.querySelectorAll("a[login=\"\"]").forEach((e) => {
            const lg = document.createElement("a");
            /**
             * @type {HTMLAnchorElement}
             */
            const login = e;
            lg.textContent = "Se connecter";
            lg.style.cursor = "pointer";
            lg.onclick = () => {
                document.querySelector("div.hover_bkgr_fricc")
                    .style.display = "block";
            }

            login.appendChild(lg);
        })

        document.querySelector("button[login=\"\"]").onclick = () => {
            const inputs = document.querySelectorAll("input");
            const id = inputs[0], password = inputs[1];

            /**
             * @type {HTMLButtonElement}
             */
            const btn = document.querySelector("button[login=\"\"]");
            btn.disabled = true;
            btn.textContent = "Connection...";
            const request = new XMLHttpRequest();
            request.open('GET', "https://profsdemo.github.io/users/pass.json");
            request.responseType = "json";
            request.send();
            request.addEventListener("loadend", () => {
                if (request.status == 404) {
                    password.value = "";
                    id.value = "";
                    alert("Ce service est en maintenance !");
                    btn.disabled = false;
                    btn.textContent = "Se connecter";
                }

                var bool = false;
                request.response.forEach((user) => {
                    console.log(user);
                    if (user.id == id.value && user.pass == password.value) {
                        bool = true;
                        document.cookie = "logged=true";
                        window.location.reload();
                        document.cookie = `user=${user.id}`;
                    }
                })
                if (!bool) {
                    password.value = "";
                    alert("Le nom d'utilisateur ou/et le mot de passe est/sont incorrecte !");
                    btn.disabled = false;
                    btn.textContent = "Se connecter";
                }
            });
            request.addEventListener("error", () => {
                password.value = "";
                id.value = "";
                alert("Ce service est en maintenance !");
                btn.disabled = false;
                btn.textContent = "Se connecter";
            })
        }
    }

    document.querySelector('.popupCloseButton').onclick = function () {
        document.querySelector('.hover_bkgr_fricc').style.display = "none";
    };
}