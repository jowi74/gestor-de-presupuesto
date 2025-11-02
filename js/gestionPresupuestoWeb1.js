import {
    CrearGasto,
    anyadirGasto,
    listarGastos,
    borrarGasto,
    calcularTotalGastos
} from "./gestionPresupuesto.js";

const form = document.getElementById("formGasto");
const listaGastosDiv = document.getElementById("listaGastos");
const totalGastosSpan = document.getElementById("totalGastos");

mostrarGastos(); //esto muestra los gastos cuando cargas la pagina

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const descripcion = document.getElementById("descripcion").value.trim();
    const valor = parseFloat(document.getElementById("valor").value);
    const fecha = document.getElementById("fecha").value;
    const etiquetasTexto = document.getElementById("etiquetas").value.trim();

    const etiquetas = etiquetasTexto ? etiquetasTexto.split(",").map(e => e.trim()) : [];

    const nuevoGasto = new CrearGasto(descripcion, valor, fecha, ...etiquetas);
    anyadirGasto(nuevoGasto);

    form.reset();
    mostrarGastos();
});

function mostrarGastos() { //funcion para actualizar la lista de gastos
    const gastos = listarGastos();
    listaGastosDiv.innerHTML = ""; //borra toda la lista antrerior

    gastos.forEach(gasto => {
        const gastoDiv = document.createElement("div");
        gastoDiv.classList.add("gasto");

        const fechaFormateada = new Date(gasto.fecha).toLocaleDateString();

        gastoDiv.innerHTML = `
            <p><strong>${gasto.descripcion}</strong> - ${gasto.valor} €</p>
            <p>Fecha: ${fechaFormateada}</p>
            <p>Etiquetas: ${gasto.etiquetas.join(", ") || "Sin etiquetas"}</p>
            <button class="borrar" data-id="${gasto.id}">Borrar</button>
        `;

        listaGastosDiv.appendChild(gastoDiv);
    });

    actualizarTotal();
    activarBotonesBorrar();
}

function activarBotonesBorrar() {
    const botones = document.querySelectorAll(".borrar");
    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            borrarGasto(id);
            mostrarGastos();
        });
    });
}

function actualizarTotal() {
    totalGastosSpan.textContent = calcularTotalGastos().toFixed(2);
}