import { borrarGasto } from "../js/gestionPresupuesto.js";
import { mostrarGastos } from "../js/gestionPresupuestoWeb2.js";

class MiGasto extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); //creamos un shadow dom para encerrar el contenido del componente
    }

    set gasto(valor) { //setter que se ejecuta cuando se le asigna una propiedad
        this._gasto = valor; //se guardan los datos del gasto
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .gasto { border: 1px solid #ccc; padding: 5px; margin: 5px 0; }
                button { margin-left: 5px; }
            </style>
            <div class="gasto">
                <p>${this._gasto.descripcion} - ${this._gasto.valor} €</p>
                <button id="borrar">Borrar</button>
            </div>
        `;
        this.shadowRoot.querySelector("#borrar").addEventListener("click", () => { //se añade un evento al boton de borrar
            borrarGasto(this._gasto.id); //borra el gasto actual
            mostrarGastos(); //se actualiza la lista de gastos
        });
    }
}

customElements.define("mi-gasto", MiGasto); //se registra el nuevo elemento con el nombre mi-gasto