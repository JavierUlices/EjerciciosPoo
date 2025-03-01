"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// Clase abstracta Vehiculo
var Vehiculo = /** @class */ (function () {
    function Vehiculo(marca, modelo, año) {
        if (año < 1886) {
            throw new Error("Año no puede ser anterior a 1886.");
        }
        else {
            if (año > new Date().getFullYear()) {
                throw new Error("El año no puede ser mayor al año actual.");
            }
        }
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
    }
    return Vehiculo;
}());
// Clase Coche que hereda de Vehiculo
var Coche = /** @class */ (function (_super) {
    __extends(Coche, _super);
    function Coche(marca, modelo, año, numeroDePuertas) {
        var _this = _super.call(this, marca, modelo, año) || this;
        if (numeroDePuertas < 2 || numeroDePuertas > 5) {
            throw new Error("El número de puertas del auto debe ser entre 2 y 5.");
        }
        _this.numeroDePuertas = numeroDePuertas;
        return _this;
    }
    Coche.prototype.obtenerDescripcion = function () {
        return "".concat(this.marca, " ").concat(this.modelo, ", A\u00F1o: ").concat(this.año, ", Puertas: ").concat(this.numeroDePuertas);
    };
    return Coche;
}(Vehiculo));
// Clase Motocicleta que hereda de Vehiculo
var Motocicleta = /** @class */ (function (_super) {
    __extends(Motocicleta, _super);
    function Motocicleta(marca, modelo, año, tipoDeMotor) {
        var _this = _super.call(this, marca, modelo, año) || this;
        _this.tipoDeMotor = tipoDeMotor;
        return _this;
    }
    Motocicleta.prototype.obtenerDescripcion = function () {
        return "".concat(this.marca, " ").concat(this.modelo, ", A\u00F1o: ").concat(this.año, ", Motor: ").concat(this.tipoDeMotor);
    };
    return Motocicleta;
}(Vehiculo));
// Crear la interfaz de readline para interactuar con el usuario
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Función para pedir al usuario los datos y crear un vehículo
function crearVehiculo() {
    rl.question("¿Qué tipo de vehiculos te gustaría tener? (coche o motocicleta): ", function (tipo) {
        if (!tipo) {
            console.log("Por favor ingrese el tipo de vehículo.");
            rl.close();
            return;
        }
        var tipoLower = tipo.toLowerCase();
        rl.question("Marca del vehículo: ", function (marca) {
            rl.question("Modelo del vehículo: ", function (modelo) {
                rl.question("Año del vehículo: ", function (añoStr) {
                    var año = parseInt(añoStr);
                    if (!marca || !modelo) {
                        console.log("Modelos y marcas son campos necesarios.");
                        rl.close();
                        return;
                    }
                    if (isNaN(año) || año < 1886 || año > new Date().getFullYear()) {
                        console.log("El año debe ser un número válido.");
                        rl.close();
                        return;
                    }
                    if (tipoLower === "coche") {
                        rl.question("Número de puertas del coche (2 a 5): ", function (numeroDePuertasStr) {
                            var numeroDePuertas = parseInt(numeroDePuertasStr);
                            if (isNaN(numeroDePuertas) || numeroDePuertas < 2 || numeroDePuertas > 5) {
                                console.log("El número de puertas debe ser entre 2 y 5.");
                                rl.close();
                                return;
                            }
                            var coche = new Coche(marca, modelo, año, numeroDePuertas);
                            console.log(coche.obtenerDescripcion());
                            rl.close();
                        });
                    }
                    else if (tipoLower === "motocicleta") {
                        rl.question("Tipo de motor de la motocicleta: ", function (tipoDeMotor) {
                            if (!tipoDeMotor) {
                                console.log("El tipo de motor es obligatorio.");
                                rl.close();
                                return;
                            }
                            var moto = new Motocicleta(marca, modelo, año, tipoDeMotor);
                            console.log(moto.obtenerDescripcion());
                            rl.close();
                        });
                    }
                    else {
                        console.log("Tipo de vehículo no válido.");
                        rl.close();
                    }
                });
            });
        });
    });
}
// Llamar a la función para crear un vehículo
crearVehiculo();
