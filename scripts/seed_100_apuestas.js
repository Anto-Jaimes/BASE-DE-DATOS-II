// =========================================================================
// SCRIPT DE CARGA MASIVA Y ANALÍTICA - GOLAZO MUNDIAL 2026
// =========================================================================
// Ejecutar en Mongo Shell o MongoDB Compass (mongosh)

print("Iniciando carga masiva de datos (100 Usuarios, Fixture Hosts, Analítica)...");

// 1. Limpiar colecciones
db.usuarios.drop();
db.partidos.drop(); 
db.apuestas.drop();

// 2. CREAR 100 USUARIOS
var nombres = ["Juan", "Maria", "Carlos", "Luis", "Ana", "Jose", "Pedro", "Elena", "Sofia", "Diego", "Lucia", "Jorge", "Mateo", "Camila", "Valeria"];
var apellidos = ["Gomez", "Perez", "Rodriguez", "Fernandez", "Lopez", "Diaz", "Martinez", "Gonzalez", "Silva", "Flores", "Rojas", "Jaimes"];
var usuariosDemo = [];
for (var i = 1; i <= 100; i++) {
    var randomName = nombres[Math.floor(Math.random() * nombres.length)] + " " + apellidos[Math.floor(Math.random() * apellidos.length)];
    usuariosDemo.push({
        nombre: randomName,
        codigo: "USR" + (1000 + i),
        saldo: 5.00, 
        rol: "USER",
        _class: "pe.edu.utp.proyecto.modelo.Usuario"
    });
}
usuariosDemo[0].nombre = "Antonela Jaimes"; 
usuariosDemo[0].rol = "ADMIN";

var resultUsuarios = db.usuarios.insertMany(usuariosDemo);
var idsUsuarios = Object.values(resultUsuarios.insertedIds);
print("=> 100 usuarios creados con éxito (Saldo: S/ 5.00).");


// 3. CREAR PARTIDOS (equipo1 SIEMPRE es Estados Unidos, México o Canadá)
var anfitriones = ["Estados Unidos", "México", "Canadá"];
var visitantes = ["Brasil", "Alemania", "Inglaterra", "España", "Argentina", "Francia", "Uruguay", "Colombia", "Japón", "Corea del Sur", "Senegal", "Marruecos"];
var partidosDemo = [];

for(var i = 1; i <= 20; i++) {
    var host = anfitriones[Math.floor(Math.random() * anfitriones.length)];
    var visit = visitantes[Math.floor(Math.random() * visitantes.length)];
    var day = Math.floor(Math.random() * 20) + 10;
    var hora = (Math.floor(Math.random() * 8) + 12) + ":00"; 
    
    partidosDemo.push({
        equipo1: host,
        equipo2: visit,
        fecha: day + "-06-2026 " + hora,
        deporte: "Fútbol",
        estadio: "Estadio " + host,
        cuotaEquipo1: parseFloat((Math.random() * 2 + 1.2).toFixed(2)), 
        cuotaEquipo2: parseFloat((Math.random() * 2 + 2.0).toFixed(2)), 
        ganador: "",
        estado: "PENDIENTE",
        _class: "pe.edu.utp.proyecto.modelo.Partido"
    });
}
db.partidos.insertMany(partidosDemo);
var partidosGuardados = db.partidos.find().toArray();
print("=> " + partidosDemo.length + " partidos creados con sus fechas.");


// 4. CREAR 500 APUESTAS EXACTAS
var apuestas = [];
var estados = ["ACTIVO", "GANADA", "PERDIDA"];

for (var i = 1; i <= 500; i++) {
    var randomUser = idsUsuarios[Math.floor(Math.random() * idsUsuarios.length)];
    var randomPartido = partidosGuardados[Math.floor(Math.random() * partidosGuardados.length)];
    
    // Seleccionar si apuesta al equipo1 o al equipo2
    var seleccion = Math.random() < 0.5 ? "equipo1" : "equipo2";
    
    // Asignar cuota y el NOMBRE REAL del equipo para el pronóstico
    var cuotaPagada = 1.0;
    var nombreEquipoPronosticado = "";
    
    if (seleccion === "equipo1") {
        cuotaPagada = randomPartido.cuotaEquipo1;
        nombreEquipoPronosticado = randomPartido.equipo1; // Ejemplo: "México"
    } else {
        cuotaPagada = randomPartido.cuotaEquipo2;
        nombreEquipoPronosticado = randomPartido.equipo2; // Ejemplo: "Alemania"
    }
    
    var randomMonto = Math.floor(Math.random() * 490) + 10;
    var estado = estados[Math.floor(Math.random() * estados.length)];
    var ganancia = 0;
    if (estado === "GANADA") {
        ganancia = parseFloat((randomMonto * cuotaPagada).toFixed(2));
    }

    apuestas.push({
        idUsuario: randomUser.valueOf().toString(),
        idPartido: randomPartido._id.valueOf().toString(),
        monto: randomMonto,
        pronostico: nombreEquipoPronosticado, // Guarda el país real (Ej: "Brasil")
        cuotaPagada: cuotaPagada,
        ganancia: ganancia,
        estado: estado,
        _class: "pe.edu.utp.proyecto.modelo.Apuesta"
    });
}
db.apuestas.insertMany(apuestas);
print("=> 500 Apuestas masivas generadas (con pronóstico de País real).");

print("\n==================================================");
print("       ANALÍTICA Y CONSULTAS SOLICITADAS          ");
print("==================================================");

var partidoMasApostado = db.apuestas.aggregate([
    { $group: { _id: "$idPartido", totalTickets: { $sum: 1 }, totalDinero: { $sum: "$monto" } } },
    { $sort: { totalTickets: -1 } },
    { $limit: 1 }
]).toArray();

if (partidoMasApostado.length > 0) {
    var pId = ObjectId(partidoMasApostado[0]._id);
    var pData = db.partidos.findOne({_id: pId});
    print("1. PARTIDO MÁS APOSTADO (POR TICKETS):");
    print("   -> " + pData.equipo1 + " vs " + pData.equipo2 + " (Juega el: " + pData.fecha + ")");
    print("   -> Recibió " + partidoMasApostado[0].totalTickets + " apuestas sumando S/ " + partidoMasApostado[0].totalDinero);
}

var usuarioMasApostador = db.apuestas.aggregate([
    { $group: { _id: "$idUsuario", totalApostado: { $sum: "$monto" }, cantidadTickets: { $sum: 1 } } },
    { $sort: { totalApostado: -1 } },
    { $limit: 1 }
]).toArray();

if (usuarioMasApostador.length > 0) {
    var uId = ObjectId(usuarioMasApostador[0]._id);
    var uData = db.usuarios.findOne({_id: uId});
    print("\n2. EL USUARIO QUE APOSTÓ MÁS DINERO EN SUMA TOTAL:");
    print("   -> Nombre: " + uData.nombre + " (Código: " + uData.codigo + ")");
    print("   -> Apostó S/ " + usuarioMasApostador[0].totalApostado + " en " + usuarioMasApostador[0].cantidadTickets + " tickets.");
}

var usuarioMasGanador = db.apuestas.aggregate([
    { $match: { estado: "GANADA" } },
    { $group: { _id: "$idUsuario", totalGanado: { $sum: "$ganancia" }, ticketsGanados: { $sum: 1 } } },
    { $sort: { totalGanado: -1 } },
    { $limit: 1 }
]).toArray();

if (usuarioMasGanador.length > 0) {
    var uId3 = ObjectId(usuarioMasGanador[0]._id);
    var uData3 = db.usuarios.findOne({_id: uId3});
    print("\n3. EL USUARIO QUE MÁS DINERO HA GANADO (APUESTAS ACERTADAS):");
    print("   -> Nombre: " + uData3.nombre);
    print("   -> Ganó S/ " + usuarioMasGanador[0].totalGanado.toFixed(2) + " tras acertar " + usuarioMasGanador[0].ticketsGanados + " tickets.");
}
print("==================================================");
