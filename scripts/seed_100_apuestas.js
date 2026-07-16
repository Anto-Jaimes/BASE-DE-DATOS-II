// =========================================================================
// SCRIPT DE CARGA MASIVA Y ANALÍTICA - GOLAZO MUNDIAL 2026
// =========================================================================
// Ejecutar en Mongo Shell o MongoDB Compass (mongosh)

print("Iniciando carga masiva de datos (100 Usuarios, Fixture Hosts, Analítica)...");

// 1. Limpiar colecciones
db.usuarios.drop();
db.partidos.drop(); // Borramos partidos para forzar a que sean sedes oficiales
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
        saldo: 5.00, // Todos los usuarios inician con 5 soles
        rol: "USER",
        _class: "pe.edu.utp.proyecto.modelo.Usuario"
    });
}
// Hacer a Antonela la Administradora
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
    // Fecha y hora del partido aleatoria (Mes de Junio)
    var day = Math.floor(Math.random() * 20) + 10;
    var hora = (Math.floor(Math.random() * 8) + 12) + ":00"; 
    
    partidosDemo.push({
        equipo1: host,
        equipo2: visit,
        fecha: day + "-06-2026 " + hora, // ej: 14-06-2026 15:00
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
print("=> " + partidosDemo.length + " partidos creados con sus fechas (Los locales estrictamente son Sedes).");


// 4. CREAR 300 APUESTAS (Para que se vea bien la estadística de 100 usuarios)
var apuestas = [];
var pronosticos = ["equipo1", "equipo2"];
var estados = ["ACTIVO", "GANADA", "PERDIDA"];

for (var i = 1; i <= 300; i++) {
    var randomUser = idsUsuarios[Math.floor(Math.random() * idsUsuarios.length)];
    var randomPartido = partidosGuardados[Math.floor(Math.random() * partidosGuardados.length)];
    var pronostico = pronosticos[Math.floor(Math.random() * pronosticos.length)];
    var cuotaPagada = pronostico === "equipo1" ? randomPartido.cuotaEquipo1 : randomPartido.cuotaEquipo2;
    var randomMonto = Math.floor(Math.random() * 490) + 10; // Monto entre 10 y 500
    
    apuestas.push({
        idUsuario: randomUser.valueOf().toString(),
        idPartido: randomPartido._id.valueOf().toString(),
        monto: randomMonto,
        pronostico: pronostico,
        cuotaPagada: cuotaPagada,
        estado: estados[Math.floor(Math.random() * estados.length)],
        _class: "pe.edu.utp.proyecto.modelo.Apuesta"
    });
}
db.apuestas.insertMany(apuestas);
print("=> 300 Apuestas masivas generadas de manera aleatoria cruzando los 100 usuarios y los partidos.");

print("\n==================================================");
print("       ANALÍTICA Y CONSULTAS SOLICITADAS          ");
print("==================================================");

// Consulta 1: ¿Cuál fue el partido más apostado (por cantidad de tickets)?
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
    print("   -> Recibió " + partidoMasApostado[0].totalTickets + " apuestas que sumaron S/ " + partidoMasApostado[0].totalDinero);
}

// Consulta 2: ¿Qué usuario apostó más dinero en total? (El más ludópata)
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
    print("   -> Apostó un total de S/ " + usuarioMasApostador[0].totalApostado + " repartidos en " + usuarioMasApostador[0].cantidadTickets + " tickets distintos.");
}

// Consulta 3: ¿Quién hizo la apuesta individual más grande? (La apuesta más cara)
var apuestaMasCara = db.apuestas.find().sort({monto: -1}).limit(1).toArray();
if (apuestaMasCara.length > 0) {
    var uId2 = ObjectId(apuestaMasCara[0].idUsuario);
    var uData2 = db.usuarios.findOne({_id: uId2});
    print("\n3. LA APUESTA INDIVIDUAL MÁS CARA DEL SISTEMA:");
    print("   -> " + uData2.nombre + " invirtió S/ " + apuestaMasCara[0].monto + " en un solo ticket, pronosticando que ganará el " + apuestaMasCara[0].pronostico + ".");
}

print("==================================================");
