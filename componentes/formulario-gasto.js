import { CrearGasto, anyadirGasto } from "../js/gestionPresupuesto.js";
import { mostrarGastos } from "../js/gestionPresupuestoWeb2.js";

class FormularioGasto extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); //creamos un shadow dom
        this.render();
    }

    render() { //se construye todo el contenido html del componente
        this.shadowRoot.innerHTML = `
            <style>
                form { display: flex; gap: 10px; margin: 10px 0; }
            </style>
            <form>
                <input type="text" id="descripcion" placeholder="Descripción" required>
                <input type="number" id="valor" placeholder="Valor (€)" required>
                <button type="submit">Añadir</button>
            </form>
        `;

        this.shadowRoot.querySelector("form").addEventListener("submit", e => { //se añade un evento para cuando se envia el formulario
            e.preventDefault(); //evita que la pagina se recargue al enviar
            const desc = this.shadowRoot.querySelector("#descripcion").value; //se obtienen los valores introducidos en los campos
            const val = parseFloat(this.shadowRoot.querySelector("#valor").value);
            const nuevo = new CrearGasto(desc, val); //se crea un nuevo gasto usando el constructor CrearGasto
            anyadirGasto(nuevo); //se añade a la lista de gastos
            mostrarGastos(); //actualizamos la lista que se muestra en pantalla 
            e.target.reset(); //se borra el formulario despues de añadirlo
        });
    }
}

customElements.define("formulario-gasto", FormularioGasto); //registramos el nuevo elemento con el nombre formulario-gasto