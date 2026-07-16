// =========================================================================
// SCRIPT DE CONSULTAS PARA EXPOSICIÓN - VERSIÓN EXTENDIDA (30 CONSULTAS)
// =========================================================================

// ==========================================
// 🧑‍💻 Estudiante 1 (Antonela / Administradora)
// ==========================================
db.apuestas.aggregate([
  { $match: { estado: "GANADA" } },
  { $group: { _id: "$idUsuario", dineroGanado: { $sum: "$ganancia" }, ticketsAcertados: { $sum: 1 } } },
  { $sort: { dineroGanado: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, usuarioId: "$_id", ticketsAcertados: 1, totalGanado: { $concat: ["S/ ", { $toString: { $round: ["$dineroGanado", 2] } }] } } }
]);

db.apuestas.aggregate([
  { $group: { _id: "$estado", totalTickets: { $sum: 1 }, volumenDinero: { $sum: "$monto" }, promedioTicket: { $avg: "$monto" } } },
  { $project: { estadoTicket: "$_id", _id: 0, totalTickets: 1, volumenDinero: { $round: ["$volumenDinero", 2] }, promedioTicket: { $round: ["$promedioTicket", 2] } } }
]);

db.apuestas.find({ monto: { $gte: 400 } }).sort({ monto: -1 }).limit(1).map(function(doc) {
    return { "Alerta": "TICKET VIP", "Monto": "S/ " + doc.monto, "Usuario": doc.idUsuario };
});

db.apuestas.find({ estado: "PERDIDA" }).sort({ monto: -1 }).limit(3).project({_id:0, idUsuario: 1, monto: 1, pronostico: 1});

db.apuestas.aggregate([
  { $group: { _id: null, liquidezTotalHistorica: { $sum: "$monto" } } },
  { $project: { _id: 0, "TOTAL DE DINERO QUE MOVIÓ GOLAZO": { $concat: ["S/ ", { $toString: "$liquidezTotalHistorica" }] } } }
]);

// ==========================================
// 🧑‍💻 Estudiante 2
// ==========================================
db.partidos.find({
  $and: [ { equipo1: { $in: ["México", "Canadá", "Estados Unidos"] } }, { cuotaEquipo1: { $gt: 2.50 } }, { estado: "PENDIENTE" } ]
}).project({_id: 0, partido: { $concat: ["$equipo1", " vs ", "$equipo2"] }, cuota: "$cuotaEquipo1"});

db.partidos.aggregate([
  { $addFields: { diferenciaCuotas: { $abs: { $subtract: ["$cuotaEquipo1", "$cuotaEquipo2"] } } } },
  { $match: { diferenciaCuotas: { $lte: 0.50 } } },
  { $project: { _id: 0, partido: { $concat: ["$equipo1", " vs ", "$equipo2"] }, brechaMarginal: { $round: ["$diferenciaCuotas", 2] } } }
]);

db.partidos.find({ $or: [ { equipo1: "Brasil" }, { equipo2: "Brasil" } ] }, { _id: 0, equipo1: 1, equipo2: 1, estadio: 1 });

db.partidos.aggregate([
  { $group: { _id: "$estadio", cantidadDeEncuentros: { $sum: 1 } } },
  { $sort: { cantidadDeEncuentros: -1 } }
]);

db.partidos.find({ equipo2: { $in: ["Brasil", "Argentina", "Uruguay", "Colombia"] } }, {_id: 0, equipo1: 1, equipo2: 1, fecha: 1});

// ==========================================
// 🧑‍💻 Estudiante 3
// ==========================================
db.usuarios.aggregate([
  { $group: { _id: "$rol", conteoUsuarios: { $sum: 1 }, saldoPromedio: { $avg: "$saldo" }, saldoMaximo: { $max: "$saldo" } } },
  { $project: { _id: 0, Rol: "$_id", conteoUsuarios: 1, saldoMaximo: 1 } }
]);

db.usuarios.find({ nombre: { $regex: "ez$", $options: "i" } }, { _id: 0, nombre: 1, codigo: 1 }).sort({ nombre: 1 }).limit(5);

var clienteId = db.usuarios.findOne({ nombre: "Antonela Jaimes" })._id.valueOf().toString();
db.apuestas.find({ idUsuario: clienteId }, { _id: 0, fecha: 1, pronostico: 1, monto: 1, estado: 1 }).limit(4);

db.apuestas.find({ monto: { $mod: [2, 1] } }).limit(5).project({_id: 0, monto: 1, pronostico: 1});

db.usuarios.find({ saldo: 5.00, rol: "USER" }).count();

// ==========================================
// 🧑‍💻 Estudiante 4
// ==========================================
db.apuestas.aggregate([
  { $group: { _id: "$pronostico", volumenTickets: { $sum: 1 }, inversionTotal: { $sum: "$monto" } } },
  { $sort: { volumenTickets: -1 } }, { $limit: 4 }
]);

db.apuestas.aggregate([
  { $match: { estado: "ACTIVO" } },
  { $addFields: { retornoProyectado: { $multiply: ["$monto", "$cuotaPagada"] } } },
  { $sort: { retornoProyectado: -1 } }, { $limit: 3 },
  { $project: { _id: 0, inversionInicial: "$monto", pais: "$pronostico", riesgoCasa: { $round: ["$retornoProyectado", 2] } } }
]);

db.apuestas.aggregate([
  { $project: { categoria: { $cond: [ { $lte: ["$cuotaPagada", 2.0] }, "Segura (<= 2.0)", "Arriesgada (> 2.0)" ] }, monto: 1 } },
  { $group: { _id: "$categoria", cantidadTickets: { $sum: 1 }, promedioInvertido: { $avg: "$monto" } } }
]);

db.apuestas.aggregate([
  { $group: { _id: "$pronostico", promedioDinerario: { $avg: "$monto" } } },
  { $sort: { promedioDinerario: -1 } }, { $limit: 3 }
]);

db.apuestas.aggregate([
  { $bucket: { groupBy: "$monto", boundaries: [0, 100, 300, 500], default: "Más de 500", output: { totalTickets: { $sum: 1 } } } }
]);

// ==========================================
// 🧑‍💻 Estudiante 5
// ==========================================
db.apuestas.find({ $and: [ { cuotaPagada: { $eq: 2.50 } }, { estado: "ACTIVO" } ] }, { _id: 0, pronostico: 1, monto: 1 });

db.usuarios.aggregate([
  { $group: { _id: null, totalAdmins: { $sum: { $cond: [{ $eq: ["$rol", "ADMIN"] }, 1, 0] } }, totalUsers: { $sum: { $cond: [{ $eq: ["$rol", "USER"] }, 1, 0] } } } },
  { $project: { _id: 0 } }
]);

db.apuestas.countDocuments({ pronostico: { $in: ["Estados Unidos", "Canadá", "México"] } });

db.usuarios.find({ nombre: { $regex: "^Ju" } }, { _id: 0, nombre: 1, codigo: 1 });

db.apuestas.aggregate([
  { $limit: 4 },
  { $addFields: { evaluacion: { $cond: [ { $gt: ["$cuotaPagada", 1.5] }, "Atractiva", "Muy Baja" ] } } },
  { $project: { _id: 0, pronostico: 1, evaluacion: 1, cuotaPagada: 1 } }
]);

// ==========================================
// 🧑‍💻 Estudiante 6
// ==========================================
db.apuestas.aggregate([
  { $match: { estado: { $in: ["GANADA", "PERDIDA"] } } },
  { $group: { _id: "$estado", sumaCapital: { $sum: "$monto" }, gananciasAcumuladasAPagar: { $sum: "$ganancia" } } },
  { $project: { estatusFinanciero: "$_id", _id: 0, capitalRecaudado: { $round: ["$sumaCapital", 2] }, deudaUsuarios: { $round: ["$gananciasAcumuladasAPagar", 2] } } }
]);

db.apuestas.find().sort({ monto: 1 }).limit(1).project({_id:0, monto: 1, idUsuario: 1});

printjson({ "Base_de_Datos": db.getName(), "Total_Usuarios": db.usuarios.estimatedDocumentCount(), "Total_Partidos": db.partidos.estimatedDocumentCount(), "Total_Apuestas": db.apuestas.estimatedDocumentCount() });

db.apuestas.find({ estado: "GANADA" }).sort({ cuotaPagada: -1 }).limit(1).project({_id: 0, cuotaGanadoraMaxima: "$cuotaPagada", pronostico: 1});

var ignorados = db.apuestas.aggregate([
  { $group: { _id: "$idPartido", cantidadTickets: { $sum: 1 } } },
  { $sort: { cantidadTickets: 1 } }, { $limit: 3 }
]).toArray();
print("\n--- TOP 3 PARTIDOS CON MENOS APUESTAS ---");
ignorados.forEach(function(item) {
   var p = db.partidos.findOne({ _id: ObjectId(item._id) });
   print("> " + p.equipo1 + " vs " + p.equipo2 + " | Solo vendió: " + item.cantidadTickets + " tickets.");
});
