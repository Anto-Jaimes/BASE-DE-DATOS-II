// =========================================================================
// SCRIPT DE CARGA DE FUNCIONES PARA EXPOSICIÓN - GOLAZODB
// =========================================================================

// INTEGRANTE 1: JOSÉ ROJAS LAPA
function verSaldo(id) {
    return db.usuarios.findOne({ _id: id }).saldo;
}

function totalPorEstado(est) {
    return db.apuestas.aggregate([ { $match: { estado: est } }, { $group: { _id: null, total: { $sum: "$monto" } } } ]).toArray();
}

function contarPartidos(dep) {
    return db.partidos.countDocuments({ deporte: dep });
}

// INTEGRANTE 2
function verEstado(id) {
    return db.usuarios.findOne({ _id: id }).estado;
}

function verCuotas(id) {
    return db.partidos.findOne({ _id: id }).cuotas;
}

function contarEnVivo() {
    return db.apuestas.countDocuments({ tipo: "S_LIVE" });
}

// INTEGRANTE 3
function recargar(id, monto) {
    db.usuarios.updateOne({ _id: id }, { $inc: { saldo: monto } });
    return db.usuarios.findOne({ _id: id }).saldo;
}

function fechaPartido(id) {
    return db.partidos.findOne({ _id: id }).fecha;
}

function calcularPremio(monto, cuota) {
    return monto * cuota;
}

// INTEGRANTE 4
function verRollover(nom) {
    return db.reglabonos.findOne({ nombre: nom }).rollover;
}

function contarEmpates() {
    return db.partidos.countDocuments({ estado: "finalizado", resultado: "empate" });
}

function apuestaMax() {
    return db.apuestas.find().sort({ monto: -1 }).limit(1).toArray()[0].monto;
}

// INTEGRANTE 5
function suspender(id) {
    db.usuarios.updateOne({ _id: id }, { $set: { estado: "suspendido" } });
    return db.usuarios.findOne({ _id: id }).estado;
}

function gananciaNeta(id) {
    var ap = db.apuestas.findOne({ _id: id });
    return ap.retorno_potencial - ap.monto;
}

function contarGmail() {
    return db.usuarios.countDocuments({ email: { $regex: "@gmail.com$" } });
}

// INTEGRANTE 6
function partidoDeApuesta(idAp) {
    var idEv = db.apuestas.findOne({ _id: idAp }).evento_id;
    return db.partidos.findOne({ _id: idEv }).partido;
}

function bonosAltos(lim) {
    return db.reglabonos.countDocuments({ rollover: { $gt: lim } });
}

function promedioSaldos() {
    return db.usuarios.aggregate([ { $match: { estado: "activo" } }, { $group: { _id: null, prom: { $avg: "$saldo" } } } ]).toArray();
}

print("¡Todas las funciones de exposición han sido cargadas con éxito en golazodb!");
