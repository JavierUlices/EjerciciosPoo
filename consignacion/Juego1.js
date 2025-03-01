var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var readlineSync = require('readline-sync');
// Definir los tipos de personajes
var TipoPersonaje;
(function (TipoPersonaje) {
    TipoPersonaje["Guerrero"] = "Guerrero";
    TipoPersonaje["Mago"] = "Mago";
    TipoPersonaje["Sanador"] = "Sanador";
})(TipoPersonaje || (TipoPersonaje = {}));
// Clase base para los personajes
var Personaje = /** @class */ (function () {
    function Personaje(nombre, salud, ataque, defensaFisica, defensaMagica, poderMagico, tipo) {
        this.nombre = nombre;
        this.salud = salud;
        this.ataque = ataque;
        this.defensaFisica = defensaFisica;
        this.defensaMagica = defensaMagica;
        this.poderMagico = poderMagico;
        this.tipo = tipo;
    }
    Personaje.prototype.mostrarInfo = function () {
        return "".concat(this.nombre, " (").concat(this.tipo, ") - Salud: ").concat(this.salud, ", Ataque: ").concat(this.ataque, ", Defensa F\u00EDsica: ").concat(this.defensaFisica, ", Defensa M\u00E1gica: ").concat(this.defensaMagica, ", Poder M\u00E1gico: ").concat(this.poderMagico);
    };
    return Personaje;
}());
// Clases específicas para cada tipo de personaje
var Guerrero = /** @class */ (function (_super) {
    __extends(Guerrero, _super);
    function Guerrero(nombre, salud, ataque, defensaFisica) {
        return _super.call(this, nombre, salud, ataque, defensaFisica, 0, 0, TipoPersonaje.Guerrero) || this;
    }
    return Guerrero;
}(Personaje));
var Mago = /** @class */ (function (_super) {
    __extends(Mago, _super);
    function Mago(nombre, salud, ataque, poderMagico) {
        return _super.call(this, nombre, salud, ataque, 0, 0, poderMagico, TipoPersonaje.Mago) || this;
    }
    return Mago;
}(Personaje));
var Sanador = /** @class */ (function (_super) {
    __extends(Sanador, _super);
    function Sanador(nombre, salud, defensaFisica, defensaMagica) {
        return _super.call(this, nombre, salud, 0, defensaFisica, defensaMagica, 0, TipoPersonaje.Sanador) || this;
    }
    return Sanador;
}(Personaje));
// Clase para gestionar los personajes
var GestionPersonajes = /** @class */ (function () {
    function GestionPersonajes() {
        this.personajes = [];
    }
    // Agregar un nuevo personaje
    GestionPersonajes.prototype.agregarPersonaje = function (personaje) {
        this.personajes.push(personaje);
    };
    // Mostrar todos los personajes
    GestionPersonajes.prototype.mostrarPersonajes = function () {
        if (this.personajes.length === 0) {
            console.log("No hay personajes registrados.");
        }
        else {
            this.personajes.forEach(function (personaje) {
                console.log(personaje.mostrarInfo());
            });
        }
    };
    // Mostrar personajes por tipo
    GestionPersonajes.prototype.mostrarPorCategoria = function (tipo) {
        var personajesFiltrados = this.personajes.filter(function (personaje) { return personaje.tipo === tipo; });
        if (personajesFiltrados.length === 0) {
            console.log("No hay personajes de tipo ".concat(tipo, "."));
        }
        else {
            personajesFiltrados.forEach(function (personaje) {
                console.log(personaje.mostrarInfo());
            });
        }
    };
    // Editar un personaje
    GestionPersonajes.prototype.editarPersonaje = function (nombre, nuevosDatos) {
        var personaje = this.personajes.find(function (p) { return p.nombre === nombre; });
        if (personaje) {
            Object.assign(personaje, nuevosDatos);
            console.log("Personaje ".concat(nombre, " actualizado."));
        }
        else {
            console.log("No se encontr\u00F3 un personaje con el nombre ".concat(nombre, "."));
        }
    };
    // Eliminar un personaje
    GestionPersonajes.prototype.eliminarPersonaje = function (nombre) {
        var index = this.personajes.findIndex(function (p) { return p.nombre === nombre; });
        if (index !== -1) {
            this.personajes.splice(index, 1);
            console.log("Personaje ".concat(nombre, " eliminado."));
        }
        else {
            console.log("No se encontr\u00F3 un personaje con el nombre ".concat(nombre, "."));
        }
    };
    return GestionPersonajes;
}());
// Función para ingresar un número con validación
function ingresarNumero(mensaje) {
    var numero;
    while (true) {
        var input = readlineSync.question(mensaje);
        numero = Number(input);
        if (!isNaN(numero) && numero >= 0) {
            break;
        }
        else {
            console.log("Por favor, ingrese un número válido.");
        }
    }
    return numero;
}
// Función para ingresar el tipo de personaje
function ingresarTipo() {
    console.log("Seleccione el tipo de personaje:");
    console.log("1. Guerrero");
    console.log("2. Mago");
    console.log("3. Sanador");
    var opcion;
    while (true) {
        var input = readlineSync.question("Opción: ");
        opcion = Number(input);
        if (opcion === 1)
            return TipoPersonaje.Guerrero;
        if (opcion === 2)
            return TipoPersonaje.Mago;
        if (opcion === 3)
            return TipoPersonaje.Sanador;
        console.log("Opción incorrecta. Por favor, intente nuevamente.");
    }
}
// Función principal para interactuar con el programa
function main() {
    var gestionPersonajes = new GestionPersonajes();
    try {
        while (true) {
            console.log("1. Agregar personaje");
            console.log("2. Mostrar todos los personajes");
            console.log("3. Mostrar personajes por tipo");
            console.log("4. Editar personaje");
            console.log("5. Eliminar personaje");
            console.log("6. Salir");
            var opcion = readlineSync.question("Por favor, elija una opción: ");
            if (opcion === "1") {
                // Agregar un personaje
                var nombre = readlineSync.question("Ingrese el nombre del personaje: ");
                var salud = ingresarNumero("Ingrese la salud: ");
                var ataque = ingresarNumero("Ingrese el ataque: ");
                var defensaFisica = ingresarNumero("Ingrese la defensa física: ");
                var defensaMagica = ingresarNumero("Ingrese la defensa mágica: ");
                var poderMagico = ingresarNumero("Ingrese el poder mágico: ");
                var tipo = ingresarTipo();
                var nuevoPersonaje = void 0;
                if (tipo === TipoPersonaje.Guerrero) {
                    nuevoPersonaje = new Guerrero(nombre, salud, ataque, defensaFisica);
                }
                else if (tipo === TipoPersonaje.Mago) {
                    nuevoPersonaje = new Mago(nombre, salud, ataque, poderMagico);
                }
                else {
                    nuevoPersonaje = new Sanador(nombre, salud, defensaFisica, defensaMagica);
                }
                gestionPersonajes.agregarPersonaje(nuevoPersonaje);
            }
            else if (opcion === "2") {
                // Mostrar todos los personajes
                gestionPersonajes.mostrarPersonajes();
            }
            else if (opcion === "3") {
                // Mostrar personajes por tipo
                var tipo = ingresarTipo();
                gestionPersonajes.mostrarPorCategoria(tipo);
            }
            else if (opcion === "4") {
                // Editar un personaje
                var nombre = readlineSync.question("Ingrese el nombre del personaje a editar: ");
                var salud = readlineSync.question("¿Desea editar la salud? (s/n): ");
                var ataque = readlineSync.question("¿Desea editar el ataque? (s/n): ");
                if (salud === "s" || ataque === "s") {
                    var nuevosDatos = {};
                    if (salud === "s")
                        nuevosDatos.salud = ingresarNumero("Ingrese la nueva salud: ");
                    if (ataque === "s")
                        nuevosDatos.ataque = ingresarNumero("Ingrese el nuevo ataque: ");
                    gestionPersonajes.editarPersonaje(nombre, nuevosDatos);
                }
                else {
                    console.log("No se realizaron cambios.");
                }
            }
            else if (opcion === "5") {
                // Eliminar un personaje
                var nombre = readlineSync.question;
                console.log("Ingrese el nombre del personaje a eliminar: ");
                gestionPersonajes.eliminarPersonaje(nombre);
            }
            else if (opcion === "6") {
                console.log("Saliendo...");
                break;
            }
            else {
                console.log("Opción no válida.");
            }
        }
    }
    catch (error) {
        console.error("Ha ocurrido un error: ", error);
    }
}
main();
