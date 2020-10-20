
/**
 * /--------------\
 * |    JVE.js    |
 * |   by JulMan  |
 * \--------------/
 * 
 * Require : *NOTHING*
 * Not nessesary: jQuery (not used)
 * 
 * Use <jve></jve> with your code inside this element for use JVE.js and enable JavaScript executor !
 * 
 */

function load_jsjs() {
    document.querySelectorAll("jve").forEach((jve) => {
        const os = jve.textContent;
        var script = jve.textContent;
        while (script.includes("//\\n")) {
            script = script.replace("//\\n", "\\n");
        }
        while (script.includes("//\\t")) {
            script = script.replace("//\\t", "&nbsp;&nbsp;&nbsp;&nbsp;")
        }

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

        const str = script.replace("//\\n", "\\n").split("\\n");
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
            return new Function(os).call(this);
        }
        start_btn.classList.add("jve_button");

        script_elm.style.width = "95%";
        script_elm.style.display = "block"

        td1.appendChild(script_elm);
        td2.appendChild(start_btn);
        table.appendChild(tr);
        jve.appendChild(table);
    })
}