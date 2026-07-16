// =========================================================================
// SCRIPT DE CARGA MASIVA - 100 APUESTAS (GOLAZO MUNDIAL 2026)
// =========================================================================
// Ejecutar en Mongo Shell o MongoDB Compass (mongosh)

print("Iniciando carga masiva de datos...");

// 1. Limpiar usuarios y apuestas antiguas (Para empezar en limpio)
db.usuarios.drop();
db.apuestas.drop();
// Nota: "los partidos déjalos ahí" -> No aplicamos db.partidos.drop() 

// 2. Crear 5 Usuarios (Con 5 soles de saldo inicial, como se solicitó)
var usuariosDemo = [
    { nombre: "Antonela Jaimes", codigo: "ANTO123", saldo: 5.00, rol: "ADMIN", _class: "pe.edu.utp.proyecto.modelo.Usuario" },
    { nombre: "José Rojas", codigo: "JOSE123", saldo: 5.00, rol: "USER", _class: "pe.edu.utp.proyecto.modelo.Usuario" },
    { nombre: "Lionel Messi", codigo: "LIO10", saldo: 5.00, rol: "USER", _class: "pe.edu.utp.proyecto.modelo.Usuario" },
    { nombre: "Cristiano Ronaldo", codigo: "CR7", saldo: 5.00, rol: "USER", _class: "pe.edu.utp.proyecto.modelo.Usuario" },
    { nombre: "Gianluca Lapadula", codigo: "LAPA9", saldo: 5.00, rol: "USER", _class: "pe.edu.utp.proyecto.modelo.Usuario" }
];
var resultUsuarios = db.usuarios.insertMany(usuariosDemo);
var idsUsuarios = Object.values(resultUsuarios.insertedIds);
print("=> 5 usuarios creados con éxito (Saldo: S/ 5.00).");

// 3. Obtener Partidos existentes (o crear unos de emergencia si la BD está vacía)
var partidos = db.partidos.find().toArray();
if (partidos.length === 0) {
    print("=> No se encontraron partidos. Creando 4 partidos base del Mundial...");
    var partidosDemo = [
        { equipo1: "Argentina", equipo2: "Francia", cuotaLocal: 2.1, cuotaEmpate: 3.0, cuotaVisita: 2.8, ganador: "", estado: "PENDIENTE", _class: "pe.edu.utp.proyecto.modelo.Partido" },
        { equipo1: "Brasil", equipo2: "Alemania", cuotaLocal: 1.8, cuotaEmpate: 3.5, cuotaVisita: 4.0, ganador: "", estado: "PENDIENTE", _class: "pe.edu.utp.proyecto.modelo.Partido" },
        { equipo1: "Inglaterra", equipo2: "España", cuotaLocal: 2.5, cuotaEmpate: 3.1, cuotaVisita: 2.5, ganador: "", estado: "PENDIENTE", _class: "pe.edu.utp.proyecto.modelo.Partido" },
        { equipo1: "Perú", equipo2: "Uruguay", cuotaLocal: 3.2, cuotaEmpate: 3.0, cuotaVisita: 2.2, ganador: "", estado: "PENDIENTE", _class: "pe.edu.utp.proyecto.modelo.Partido" }
    ];
    db.partidos.insertMany(partidosDemo);
    partidos = db.partidos.find().toArray();
} else {
    print("=> Se usarán los " + partidos.length + " partidos ya existentes en la BD.");
}

// 4. Generar 100 Apuestas Aleatorias
var apuestas = [];
var pronosticos = ["Local", "Empate", "Visita"];
var estados = ["ACTIVO", "GANADA", "PERDIDA"];

for (var i = 1; i <= 100; i++) {
    // Seleccionar usuario y partido de forma aleatoria
    var randomUser = idsUsuarios[Math.floor(Math.random() * idsUsuarios.length)];
    var randomPartido = partidos[Math.floor(Math.random() * partidos.length)];
    
    // Seleccionar pronóstico aleatorio
    var randomPronostico = pronosticos[Math.floor(Math.random() * pronosticos.length)];
    
    // Asignar cuota pagada real, leyendo los datos del partido seleccionado
    var cuotaPagada = 1.0;
    if (randomPronostico === "Local") cuotaPagada = randomPartido.cuotaLocal;
    else if (randomPronostico === "Empate") cuotaPagada = randomPartido.cuotaEmpate;
    else if (randomPronostico === "Visita") cuotaPagada = randomPartido.cuotaVisita;
    
    // Seleccionar estado aleatorio y monto (entre S/ 10 y S/ 500)
    var randomEstado = estados[Math.floor(Math.random() * estados.length)];
    var randomMonto = Math.floor(Math.random() * 490) + 10;
    
    apuestas.push({
        idUsuario: randomUser.valueOf().toString(), // Guardado como String para coincidir con la entidad Java
        idPartido: randomPartido._id.valueOf().toString(), 
        monto: randomMonto,
        pronostico: randomPronostico,
        cuotaPagada: cuotaPagada,
        estado: randomEstado,
        _class: "pe.edu.utp.proyecto.modelo.Apuesta"
    });
}

db.apuestas.insertMany(apuestas);
print("=> ¡100 Apuestas masivas generadas e insertadas con éxito!");

// 5. Resumen Final
print("==================================================");
print("RESUMEN DE LA BASE DE DATOS MUNDIALISTA 'GOLAZO':");
print("- Usuarios registrados : " + db.usuarios.countDocuments());
print("- Partidos disponibles : " + db.partidos.countDocuments());
print("- Tickets de apuestas  : " + db.apuestas.countDocuments());
print("==================================================");
