/**
 * References, do not REMOVE
 */
/// <reference path="crypto-js.js" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />

/**
 * /------------------------\
 * |      FastLogin.js      |
 * |        By JulMan       |
 * \------------------------/
 * 
 * Require : jQuery, popup.api style
 * Not nessesary : popup.api (implemeted)
 * 
 * Only used in "profsdemo.github.io" ! Do not use without my authorization !
 * 
 */

function load_loginjs() {
    document.cookie = "SameSite=Strict; Secure"
    const cookies = document.cookie.split("; ");
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
                    $("div.hover_bkgr_fricc").fadeIn("fast");
                }

                login.appendChild(lg);
            })

            document.querySelectorAll("input").forEach((input) => {
                input.onchange = () => {
                    document.querySelector("div[loginErrorView=\"\"]").style.display = "none";
                }
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
                        if (user.id == id.value && user.pass == password.value) {
                            bool = true;
                            document.cookie = "logged=true; Secure";
                            document.cookie = `user=${user.id}; Secure`;
                            window.location.reload();
                        }
                    })
                    if (!bool) {
                        password.value = "";
                        document.querySelector("div[loginErrorView=\"\"]").style.display = "block";
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

            document.querySelector("button[loginViewPass=\"\"]").onclick = () => {
                const password = document.querySelectorAll("input")[1];
                if (password.type == "password") {
                    password.type = "text";
                    password.style.backgroundColor = "red";
                    document.querySelector("button[loginViewPass=\"\"]").style.border = "1px solid red";
                } else {
                    password.type = "password";
                    password.style.backgroundColor = "";
                    document.querySelector("button[loginViewPass=\"\"]").style.border = "1px solid black";
                }
            }
        } else {
            document.cookie = "logged=true; Secure";
            const id = cookies.find((r) => r.trim().startsWith("user=")).split("=")[1];
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
                    document.cookie = "logged=false";
                    document.cookie = "user=";
                    const popup = document.querySelector("div.hover_bkgr_fricc");
                    $("div.hover_bkgr_fricc").fadeIn("fast");
                    const popup_content = popup.querySelector("div");
                    for (const key in popup_content.children) {
                        if (popup_content.children.hasOwnProperty(key)) {
                            const element = popup_content.children[key];
                            element.style.display = "none";
                        }
                    }
                    const p = popup_content.appendChild(document.createElement("p"))
                    p.textContent = "Vous êtes déconnecté.";
                    const br = popup_content.appendChild(document.createElement("br"));
                    const refrech_btn = popup_content.appendChild(document.createElement("button"));
                    refrech_btn.textContent = "Se connecter";
                    refrech_btn.style.padding = "20px";
                    refrech_btn.style.border = "1px solid black";
                    refrech_btn.style.borderRadius = "10px";
                    refrech_btn.style.cursor = "pointer";
                    refrech_btn.onclick = () => {
                        p.remove();
                        br.remove();
                        refrech_btn.remove();

                        for (const key in popup_content.children) {
                            if (popup_content.children.hasOwnProperty(key)) {
                                const element = popup_content.children[key];
                                element.style.display = "";
                            }
                        }

                        document.querySelectorAll("input").forEach((input) => {
                            input.textContent = "";
                            input.onchange = () => {
                                document.querySelector("div[loginErrorView=\"\"]").style.display = "none";
                            }
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
                                    if (user.id == id.value && user.pass == password.value) {
                                        bool = true;
                                        document.cookie = "logged=true";
                                        document.cookie = `user=${user.id}`;
                                        window.location.reload();
                                    }
                                })
                                if (!bool) {
                                    password.value = "";
                                    document.querySelector("div[loginErrorView=\"\"]").style.display = "block";
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

                        document.querySelector("button[loginViewPass=\"\"]").onclick = () => {
                            const password = document.querySelectorAll("input")[1];
                            if (password.type == "password") {
                                password.type = "text";
                                password.style.backgroundColor = "red";
                                document.querySelector("button[loginViewPass=\"\"]").style.border = "1px solid red";
                            } else {
                                password.type = "password";
                                password.style.backgroundColor = "";
                                document.querySelector("button[loginViewPass=\"\"]").style.border = "1px solid black";
                            }
                        }

                        document.querySelectorAll("a[login=\"\"]").forEach((e) => {
                            while (e.firstChild) {
                                e.firstChild.remove();
                            }
                            const lg = document.createElement("a");
                            /**
                             * @type {HTMLAnchorElement}
                             */
                            const login = e;
                            lg.textContent = "Se connecter";
                            lg.style.cursor = "pointer";
                            lg.onclick = () => {
                                $("div.hover_bkgr_fricc").fadeIn("fast");
                            }

                            login.appendChild(lg);
                        })
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
        document.cookie = "logged=false; Secure";
        document.querySelectorAll("a[login=\"\"]").forEach((e) => {
            const lg = document.createElement("a");
            /**
             * @type {HTMLAnchorElement}
             */
            const login = e;
            lg.textContent = "Se connecter";
            lg.style.cursor = "pointer";
            lg.onclick = () => {
                $("div.hover_bkgr_fricc").fadeIn("fast");
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
                        document.cookie = `user=${user.id}`;
                        window.location.reload();
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

    
    document.querySelector("button[loginViewPass=\"\"]").onclick = () => {
        const password = document.querySelectorAll("input")[1];
        if (password.type == "password") {
            password.type = "text";
            password.style.backgroundColor = "red";
            document.querySelector("button[loginViewPass=\"\"]").style.border = "1px solid red";
        } else {
            password.type = "password";
            password.style.backgroundColor = "";
            document.querySelector("button[loginViewPass=\"\"]").style.border = "1px solid black";
        }
    }

    document.querySelector('.popupCloseButton').onclick = function () {
        $('.hover_bkgr_fricc').fadeOut("fast")
    };
}