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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importando el modulo redline
var readline = require("readline");
// Configurar readline para leer desde la consola
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Función para hacer preguntas y obtener respuestas
var pregunta = function (consulta) {
    return new Promise(function (resolve) {
        rl.question(consulta, function (respuesta) {
            resolve(respuesta);
        });
    });
};
// 1. Definición de Enums y Tipos
var EstadoEntrega;
(function (EstadoEntrega) {
    EstadoEntrega["Pendiente"] = "Pendiente";
    EstadoEntrega["EnCamino"] = "EnCamino";
    EstadoEntrega["Entregado"] = "Entregado";
    EstadoEntrega["Cancelado"] = "Cancelado";
})(EstadoEntrega || (EstadoEntrega = {}));
var TipoVehiculo;
(function (TipoVehiculo) {
    TipoVehiculo["Bicicleta"] = "Bicicleta";
    TipoVehiculo["Coche"] = "Coche";
    TipoVehiculo["Cami\u00F3n"] = "Cami\u00F3n";
})(TipoVehiculo || (TipoVehiculo = {}));
var Entrega = /** @class */ (function () {
    function Entrega(origen, destino, peso, tipoVehiculo, estado) {
        if (estado === void 0) { estado = EstadoEntrega.Pendiente; }
        this.origen = origen;
        this.destino = destino;
        this.peso = peso;
        this.tipoVehiculo = tipoVehiculo;
        this.estado = estado;
    }
    Entrega.prototype.actualizarEstado = function (estado) {
        this.estado = estado;
        console.log("Estado de la entrega actualizado a: ".concat(estado));
    };
    return Entrega;
}());
// 3. Clases Concretas
var EntregaComida = /** @class */ (function (_super) {
    __extends(EntregaComida, _super);
    function EntregaComida(origen, destino, peso, tipoVehiculo, nombreRestaurante) {
        var _this = _super.call(this, origen, destino, peso, tipoVehiculo) || this;
        _this.nombreRestaurante = nombreRestaurante;
        return _this;
    }
    EntregaComida.prototype.calcularTiempoEntrega = function () {
        var tiempoBase = 30; // minutos
        switch (this.tipoVehiculo) {
            case TipoVehiculo.Bicicleta:
                return tiempoBase;
            case TipoVehiculo.Coche:
                return tiempoBase * 0.7;
            case TipoVehiculo.Camión:
                return tiempoBase * 1.2;
            default:
                return tiempoBase;
        }
    };
    EntregaComida.prototype.calcularCostoEnvio = function () {
        var costoBase = 10; // dólares
        return costoBase + (this.peso * 0.5);
    };
    EntregaComida.prototype.asignarRepartidor = function () {
        console.log("Asignando repartidor para ".concat(this.nombreRestaurante));
    };
    EntregaComida.prototype.generarRutaOptima = function () {
        return "Ruta \u00F3ptima desde ".concat(this.origen, " hasta ").concat(this.destino, " para ").concat(this.nombreRestaurante);
    };
    return EntregaComida;
}(Entrega));
var EntregaPaquete = /** @class */ (function (_super) {
    __extends(EntregaPaquete, _super);
    function EntregaPaquete(origen, destino, peso, tipoVehiculo, idPaquete) {
        var _this = _super.call(this, origen, destino, peso, tipoVehiculo) || this;
        _this.idPaquete = idPaquete;
        return _this;
    }
    EntregaPaquete.prototype.calcularTiempoEntrega = function () {
        var tiempoBase = 60; // minutos
        switch (this.tipoVehiculo) {
            case TipoVehiculo.Bicicleta:
                return tiempoBase * 1.5;
            case TipoVehiculo.Coche:
                return tiempoBase;
            case TipoVehiculo.Camión:
                return tiempoBase * 0.8;
            default:
                return tiempoBase;
        }
    };
    EntregaPaquete.prototype.calcularCostoEnvio = function () {
        var costoBase = 20; // dólares
        return costoBase + (this.peso * 1.2);
    };
    EntregaPaquete.prototype.asignarRepartidor = function () {
        console.log("Asignando repartidor para el paquete ".concat(this.idPaquete));
    };
    EntregaPaquete.prototype.generarRutaOptima = function () {
        return "Ruta \u00F3ptima desde ".concat(this.origen, " hasta ").concat(this.destino, " para el paquete ").concat(this.idPaquete);
    };
    return EntregaPaquete;
}(Entrega));
// 4. Gestión de Calificaciones y Repartidores
var Repartidor = /** @class */ (function () {
    function Repartidor(id, nombre, tipoVehiculo, calificacion) {
        if (calificacion === void 0) { calificacion = 5; }
        this.id = id;
        this.nombre = nombre;
        this.tipoVehiculo = tipoVehiculo;
        this.calificacion = calificacion;
    }
    Repartidor.prototype.actualizarCalificacion = function (nuevaCalificacion) {
        this.calificacion = nuevaCalificacion;
        console.log("Calificaci\u00F3n actualizada para ".concat(this.nombre, " a ").concat(nuevaCalificacion));
    };
    return Repartidor;
}());
var GestorEntregas = /** @class */ (function () {
    function GestorEntregas() {
        this.entregas = [];
        this.repartidores = [];
    }
    GestorEntregas.prototype.agregarEntrega = function (entrega) {
        this.entregas.push(entrega);
        console.log("Entrega agregada: ".concat(entrega.constructor.name));
    };
    GestorEntregas.prototype.asignarRepartidor = function (entrega) {
        var repartidorDisponible = this.repartidores.find(function (repartidor) { return repartidor.tipoVehiculo === entrega.tipoVehiculo; });
        if (repartidorDisponible) {
            entrega.asignarRepartidor();
            console.log("Asignado ".concat(repartidorDisponible.nombre, " a la entrega."));
        }
        else {
            throw new Error("No hay repartidores disponibles para este tipo de vehículo.");
        }
    };
    GestorEntregas.prototype.agregarRepartidor = function (repartidor) {
        this.repartidores.push(repartidor);
        console.log("Repartidor agregado: ".concat(repartidor.nombre));
    };
    GestorEntregas.prototype.calificarRepartidor = function (idRepartidor, calificacion) {
        var repartidor = this.repartidores.find(function (r) { return r.id === idRepartidor; });
        if (repartidor) {
            repartidor.actualizarCalificacion(calificacion);
        }
        else {
            throw new Error("Repartidor no encontrado.");
        }
    };
    return GestorEntregas;
}());
// 5. Generics
var ColaEntregas = /** @class */ (function () {
    function ColaEntregas() {
        this.cola = [];
    }
    ColaEntregas.prototype.encolar = function (entrega) {
        this.cola.push(entrega);
        console.log("Entrega encolada: ".concat(entrega.constructor.name));
    };
    ColaEntregas.prototype.desencolar = function () {
        return this.cola.shift();
    };
    ColaEntregas.prototype.procesarCola = function () {
        while (this.cola.length > 0) {
            var entrega = this.desencolar();
            if (entrega) {
                console.log("Procesando entrega a ".concat(entrega.destino));
            }
        }
    };
    return ColaEntregas;
}());
// 6. Validaciones y Manejo de Excepciones
function validarEntradaUsuario(entrada) {
    if (!entrada.origen || !entrada.destino) {
        throw new Error("El origen y el destino son obligatorios.");
    }
    if (entrada.peso <= 0) {
        throw new Error("El peso debe ser mayor que 0.");
    }
    if (!Object.values(TipoVehiculo).includes(entrada.tipoVehiculo)) {
        throw new Error("Tipo de vehículo no válido.");
    }
    if (entrada.tipoEntrega === "Comida" && !entrada.nombreRestaurante) {
        throw new Error("El nombre del restaurante es obligatorio para entregas de comida.");
    }
    if (entrada.tipoEntrega === "Paquete" && !entrada.idPaquete) {
        throw new Error("El ID del paquete es obligatorio para entregas de paquetes.");
    }
}
// 7. Ejemplo de Uso del Sistema
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var gestor, ingresarDatos, entradaUsuario, entrega, colaEntregas, idRepartidor, calificacion, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, 5, 6]);
                gestor = new GestorEntregas();
                // Agregando repartidores
                gestor.agregarRepartidor(new Repartidor("1", "Juan Pérez", TipoVehiculo.Bicicleta));
                gestor.agregarRepartidor(new Repartidor("2", "Ana Gómez", TipoVehiculo.Coche));
                ingresarDatos = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var origen, destino, peso, _a, tipoVehiculo, tipoEntrega, nombreRestaurante, _b, idPaquete, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, pregunta("Ingresa el origen: ")];
                            case 1:
                                origen = _d.sent();
                                return [4 /*yield*/, pregunta("Ingresa el destino: ")];
                            case 2:
                                destino = _d.sent();
                                _a = parseFloat;
                                return [4 /*yield*/, pregunta("Ingresa el peso (en kg): ")];
                            case 3:
                                peso = _a.apply(void 0, [_d.sent()]);
                                return [4 /*yield*/, pregunta("Ingresa el tipo de vehículo (Bicicleta, Coche, Camión): ")];
                            case 4:
                                tipoVehiculo = _d.sent();
                                return [4 /*yield*/, pregunta("Ingresa el tipo de entrega (Comida o Paquete): ")];
                            case 5:
                                tipoEntrega = _d.sent();
                                if (!(tipoEntrega === "Comida")) return [3 /*break*/, 7];
                                return [4 /*yield*/, pregunta("Ingresa el nombre del restaurante: ")];
                            case 6:
                                _b = _d.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                _b = undefined;
                                _d.label = 8;
                            case 8:
                                nombreRestaurante = _b;
                                if (!(tipoEntrega === "Paquete")) return [3 /*break*/, 10];
                                return [4 /*yield*/, pregunta("Ingresa el ID del paquete: ")];
                            case 9:
                                _c = _d.sent();
                                return [3 /*break*/, 11];
                            case 10:
                                _c = undefined;
                                _d.label = 11;
                            case 11:
                                idPaquete = _c;
                                return [2 /*return*/, {
                                        origen: origen,
                                        destino: destino,
                                        peso: peso,
                                        tipoVehiculo: tipoVehiculo,
                                        tipoEntrega: tipoEntrega,
                                        nombreRestaurante: nombreRestaurante,
                                        idPaquete: idPaquete,
                                    }];
                        }
                    });
                }); };
                return [4 /*yield*/, ingresarDatos()];
            case 1:
                entradaUsuario = _b.sent();
                // validando la entrada
                validarEntradaUsuario(entradaUsuario);
                entrega = void 0;
                if (entradaUsuario.tipoEntrega === "Comida") {
                    entrega = new EntregaComida(entradaUsuario.origen, entradaUsuario.destino, entradaUsuario.peso, entradaUsuario.tipoVehiculo, entradaUsuario.nombreRestaurante);
                }
                else {
                    entrega = new EntregaPaquete(entradaUsuario.origen, entradaUsuario.destino, entradaUsuario.peso, entradaUsuario.tipoVehiculo, entradaUsuario.idPaquete);
                }
                // Agregando y procesando entregas
                gestor.agregarEntrega(entrega);
                gestor.asignarRepartidor(entrega);
                console.log("Tiempo de entrega: ".concat(entrega.calcularTiempoEntrega(), " minutos"));
                console.log("Costo de env\u00EDo: $".concat(entrega.calcularCostoEnvio()));
                console.log("Ruta \u00F3ptima: ".concat(entrega.generarRutaOptima()));
                colaEntregas = new ColaEntregas();
                colaEntregas.encolar(entrega);
                colaEntregas.procesarCola();
                return [4 /*yield*/, pregunta("Ingresa el ID del repartidor para calificar: ")];
            case 2:
                idRepartidor = _b.sent();
                _a = parseInt;
                return [4 /*yield*/, pregunta("Ingresa la calificación (1-5): ")];
            case 3:
                calificacion = _a.apply(void 0, [_b.sent()]);
                gestor.calificarRepartidor(idRepartidor, calificacion);
                return [3 /*break*/, 6];
            case 4:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    console.error("Error: ".concat(error_1.message));
                }
                else {
                    console.error("Error desconocido: ".concat(error_1));
                }
                return [3 /*break*/, 6];
            case 5:
                rl.close();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); })();
