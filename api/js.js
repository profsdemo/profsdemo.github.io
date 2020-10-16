/// <reference path="../node_modules/@types/jquery/index.d.ts" />

function load_jsjs() {
    document.querySelectorAll("jve").forEach((jve) => {
        const script = jve.textContent;

        for (const key in jve.children) {
            if (jve.children.hasOwnProperty(key)) {
                const element = jve.children[key];
                element.remove();
            }
        }
        jve.textContent = "";

        const table = document.createElement("table");
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        tr.appendChild(td1);
        tr.appendChild(td2);
        const script_elm = document.createElement("scriptview");
        const start_btn = document.createElement("button");

        table.style.border = "1px black solid";
        table.style.padding = "10px";
        table.style.borderRadius = "10px";
        table.style.background = "lightgrey";

        const str = script.split("\\n");
        for (const e in str) {
            if (str.hasOwnProperty(e)) {
                const element = str[e];
                script_elm.appendChild(document.createElement("text")).textContent = element;
                script_elm.appendChild(document.createElement("br"));
            }
        }
        script_elm.children[script_elm.children.length - 1].remove();
        script_elm.classList.add("jve_script_view");

        start_btn.textContent = "Tester";
        start_btn.onclick = () => {
            return new Function(script).call(this);
        }
        start_btn.classList.add("jve_button");

        td1.appendChild(script_elm);
        td2.appendChild(start_btn);
        table.appendChild(tr);
        jve.appendChild(table);
    })
}