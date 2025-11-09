import { CrearGasto, listarGastos, anyadirGasto, borrarGasto, calcularTotalGastos } from "./gestionPresupuesto.js"; //importamos las funciones de gestionPresupuesto
import "../componentes/mi-gasto.js";
import "../componentes/formulario-gasto.js";

const contenedor = document.querySelector("#contenedor-gastos"); //selecciona el contenedor donde se van a mostrar los gastos
const totalGastosSpan = document.querySelector("#totalGastos");

export function mostrarGastos() { //funcion que muestra los gastos en pantalla
    contenedor.innerHTML = ""; //deja en blanco el contenedor
    const gastos = listarGastos(); //obtenemos la lista de gastos
    gastos.forEach(gasto => { //se recorren todos los gastos y se crea el elementos mi-gasto por cada gasto
        const elemento = document.createElement("mi-gasto"); //se crea el componente
        elemento.gasto = gasto; //se asignan los datos del gasto
        contenedor.appendChild(elemento); //se añaden al contenedor del html
    });
    totalGastosSpan.textContent = calcularTotalGastos().toFixed(2); //se calcula el total de los gastos y se actualiza el texto de la pantalla  
}