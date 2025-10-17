let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (typeof valor !== "number" || valor < 0) {
        return -1;
    }
    presupuesto = valor;
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha = new Date(), ...etiquetas) {
    if (typeof valor !== "number" || valor < 0) {
        valor = 0;
    }

    this.descripcion = descripcion;
    this.valor = valor;

    let fechaConvertida = new Date(fecha);
    if (fechaConvertida.toString() === "Invalid Date") {
        fechaConvertida = new Date();
    }

    this.fecha = fechaConvertida.getTime();
    this.timestamp = this.fecha;

    this.etiquetas = etiquetas.length > 0 ? etiquetas : [];

    this.mostrarGasto = function() {
        return `Gasto de ${this.descripcion} ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function() {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;
        this.etiquetas.forEach(et => {
            texto += `- ${et}\n`;
        });
        return texto;
    };

    this.actualizarFecha = function(nuevaFecha) {
        const nueva = new Date(nuevaFecha);
        if (nueva.toString() !== "Invalid Date") {
            this.fecha = nueva.getTime();
            this.timestamp = this.fecha;
        }
    };

    this.actualizarDescripcion = function(newDescripcion) {
        this.descripcion = newDescripcion;
    };

    this.actualizarValor = function(newValor) {
        if (typeof newValor === "number" && newValor >= 0) {
            this.valor = newValor;
        }
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(et => {
            if (!this.etiquetas.includes(et)) {
                this.etiquetas.push(et);
            }
        });
    };

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(et => !etiquetasABorrar.includes(et));
    };
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    if (!(gasto instanceof CrearGasto)) return -1;
    gasto.id = idGasto;
    gastos.push(gasto);
    idGasto++;
    return gasto.id;
}

function borrarGasto(id) {
    const index = gastos.findIndex(g => g.id === id);
    if (index === -1) return -1;
    gastos.splice(index, 1);
    return 1;
}

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
};