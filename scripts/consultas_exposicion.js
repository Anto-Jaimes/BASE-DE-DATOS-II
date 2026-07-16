// =========================================================================
// SCRIPT DE CONSULTAS PARA EXPOSICIÓN (COPIAR Y PEGAR EN MONGOSH)
// =========================================================================

// ==========================================
// 🧑‍💻 Estudiante 1 (Antonela / Administradora)
// ==========================================
// 1. Top 5 de usuarios que más dinero han ganado (Apuestas GANADAS):
db.apuestas.aggregate([
  { $match: { estado: "GANADA" } },
  { $group: { _id: "$idUsuario", totalGanado: { $sum: "$ganancia" } } },
  { $sort: { totalGanado: -1 } },
  { $limit: 5 }
]);

// 2. Calcular el pozo acumulado (dinero total) de los tickets "ACTIVOS":
db.apuestas.aggregate([
  { $match: { estado: "ACTIVO" } },
  { $group: { _id: null, pozoAcumulado: { $sum: "$monto" } } }
]);

// 3. Buscar el ticket individual más caro del Mundial:
db.apuestas.find().sort({ monto: -1 }).limit(1);

// ==========================================
// 🧑‍💻 Estudiante 2
// ==========================================
// 1. Partidos que tienen como Sede (equipo1) a México o Canadá:
db.partidos.find({ equipo1: { $in: ["México", "Canadá"] } });

// 2. Listar partidos cuya cuota por el equipo local sea atractiva (mayor a 2.50):
db.partidos.find({ cuotaEquipo1: { $gt: 2.50 } });

// 3. Obtener el partido donde juega "Brasil" como visitante:
db.partidos.find({ equipo2: "Brasil" });

// ==========================================
// 🧑‍💻 Estudiante 3
// ==========================================
// 1. Mostrar las 3 apuestas perdidas donde el usuario perdió más dinero:
db.apuestas.find({ estado: "PERDIDA" }).sort({ monto: -1 }).limit(3);

// 2. Contar a todos los usuarios del sistema:
db.usuarios.countDocuments({ saldo: 5.00 });

// 3. Extraer los tickets de apuesta del usuario Admin (Antonela):
var adminId = db.usuarios.findOne({nombre: "Antonela Jaimes"})._id.valueOf().toString();
db.apuestas.find({ idUsuario: adminId }).limit(3);

// ==========================================
// 🧑‍💻 Estudiante 4
// ==========================================
// 1. Ranking de los 3 países favoritos por los apostadores:
db.apuestas.aggregate([
  { $group: { _id: "$pronostico", cantidadTickets: { $sum: 1 } } },
  { $sort: { cantidadTickets: -1 } },
  { $limit: 3 }
]);

// 2. Contar exactamente cuántos tickets pronosticaron que gana "Estados Unidos":
db.apuestas.countDocuments({ pronostico: "Estados Unidos" });

// 3. Calcular el promedio de dinero apostado por ticket en todo el sistema:
db.apuestas.aggregate([
  { $group: { _id: null, promedioApostado: { $avg: "$monto" } } }
]);

// ==========================================
// 🧑‍💻 Estudiante 5
// ==========================================
// 1. Listar a todos los usuarios cuyos nombres comiencen con la letra "M":
db.usuarios.find({ nombre: { $regex: "^M" } });

// 2. Encontrar todas las apuestas fuertes que invirtieron S/ 450 o más:
db.apuestas.find({ monto: { $gte: 450 } });

// 3. Comparar la cantidad de tickets "ACTIVOS" vs "PERDIDOS":
db.apuestas.aggregate([
  { $match: { estado: { $in: ["ACTIVO", "PERDIDA"] } } },
  { $group: { _id: "$estado", total: { $sum: 1 } } }
]);

// ==========================================
// 🧑‍💻 Estudiante 6
// ==========================================
// 1. Calcular la ganancia de la casa GOLAZO (Dinero de apuestas PERDIDAS):
db.apuestas.aggregate([
  { $match: { estado: "PERDIDA" } },
  { $group: { _id: null, gananciaCasa: { $sum: "$monto" } } }
]);

// 2. Mostrar el ticket de apuesta más bajo (la más conservadora):
db.apuestas.find().sort({ monto: 1 }).limit(1);

// 3. Contar el volumen masivo de tickets cruzados:
db.apuestas.countDocuments();
