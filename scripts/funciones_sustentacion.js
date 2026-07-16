// =========================================================================
// SCRIPT DE CARGA DE FUNCIONES PARA EXPOSICIÓN - GOLAZODB (MUNDIAL 2026)
// =========================================================================

// INTEGRANTE 1: JOSÉ ROJAS LAPA
function verSaldoUsuario(id) {
    return db.usuarios.findOne({ _id: id }).saldo;
}

function dineroRecaudadoPorEstado(est) {
    // Ejemplo: Cuánto dinero hay en apuestas "ACTIVO" o "GANADA"
    return db.apuestas.aggregate([ { $match: { estado: est } }, { $group: { _id: null, total: { $sum: "$monto" } } } ]).toArray();
}

function contarPartidosPorEquipo(equipo) {
    // Busca en cuántos partidos del Mundial juega una selección específica (ej: "Argentina")
    return db.partidos.countDocuments({ $or: [{ equipo1: equipo }, { equipo2: equipo }] });
}

// INTEGRANTE 2: [NOMBRE DEL INTEGRANTE 2]
function verRolUsuario(id) {
    // Retorna si es ADMIN o USER
    return db.usuarios.findOne({ _id: id }).rol;
}

function verCuotasPartido(equipoLocal, equipoVisita) {
    var partido = db.partidos.findOne({ equipo1: equipoLocal, equipo2: equipoVisita });
    return { Local: partido.cuotaLocal, Empate: partido.cuotaEmpate, Visita: partido.cuotaVisita };
}

function contarApuestasAltas() {
    // Cuenta cuántos tickets de apuesta en el Mundial superan los 500 soles/dólares
    return db.apuestas.countDocuments({ monto: { $gt: 500 } });
}

// INTEGRANTE 3: [NOMBRE DEL INTEGRANTE 3]
function recargarBilleteraMundial(id, monto) {
    db.usuarios.updateOne({ _id: id }, { $inc: { saldo: monto } });
    return db.usuarios.findOne({ _id: id }).saldo;
}

function buscarRivalDe(equipo) {
    // Encuentra el próximo partido pendiente de una selección
    var p = db.partidos.findOne({ $or: [{ equipo1: equipo }, { equipo2: equipo }], estado: "PENDIENTE" });
    return p.equipo1 === equipo ? p.equipo2 : p.equipo1;
}

function calcularPremioPotencial(monto, cuotaLocal) {
    return monto * cuotaLocal;
}

// INTEGRANTE 4: [NOMBRE DEL INTEGRANTE 4]
function liquidarPartido(id, equipoGanador) {
    // El Administrador define qué país ganó el partido
    db.partidos.updateOne({ _id: id }, { $set: { estado: "JUGADO", ganador: equipoGanador } });
    return "Partido liquidado. Ganador: " + equipoGanador;
}

function contarPartidosJugados() {
    return db.partidos.countDocuments({ estado: "JUGADO" });
}

function laApuestaMasGrande() {
    // Retorna el monto más alto apostado en la historia del sistema
    return db.apuestas.find().sort({ monto: -1 }).limit(1).toArray()[0].monto;
}

// INTEGRANTE 5: [NOMBRE DEL INTEGRANTE 5]
function promoverAAdministrador(id) {
    db.usuarios.updateOne({ _id: id }, { $set: { rol: "ADMIN" } });
    return db.usuarios.findOne({ _id: id }).rol;
}

function calcularRetornoTicket(idTicket) {
    var ap = db.apuestas.findOne({ _id: idTicket });
    return ap.monto * ap.cuotaPagada;
}

function contarUsuariosVip() {
    // Cuenta cuántos usuarios tienen más de 10,000 en saldo
    return db.usuarios.countDocuments({ saldo: { $gte: 10000 } });
}

// INTEGRANTE 6: [NOMBRE DEL INTEGRANTE 6]
function obtenerPronostico(idTicket) {
    // Muestra qué equipo seleccionó el usuario para ganar en su ticket
    var ap = db.apuestas.findOne({ _id: idTicket });
    return ap.pronostico;
}

function partidosConCuotaAlta(limite) {
    // Cuenta cuántos partidos están pagando una cuota local mayor a X (ej: sorpresas del Mundial)
    return db.partidos.countDocuments({ cuotaLocal: { $gt: limite } });
}

function promedioApuestasMundial() {
    // Calcula la media de dinero que la gente está apostando por ticket
    return db.apuestas.aggregate([ { $group: { _id: null, prom: { $avg: "$monto" } } } ]).toArray();
}

print("¡Todas las funciones del Mundial 2026 han sido cargadas con éxito en golazodb!");
