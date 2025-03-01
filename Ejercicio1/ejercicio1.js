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
var Habitacion = /** @class */ (function () {
    function Habitacion(tipoHabitacion, precioBase) {
        this.tipoHabitacion = tipoHabitacion;
        this.precioBase = precioBase;
        this.disponibilidad = true;
    }
    Habitacion.prototype.isDisponible = function () {
        return this.disponibilidad;
    };
    Habitacion.prototype.setDisponibilidad = function (disponibilidad) {
        this.disponibilidad = disponibilidad;
    };
    Habitacion.prototype.reservar = function () {
        if (this.disponibilidad) {
            this.disponibilidad = false;
            console.log("Habitación reservada.");
        }
        else {
            console.log("Habitación no disponible.");
        }
    };
    Habitacion.prototype.cancelarReserva = function () {
        this.disponibilidad = true;
        console.log("Reserva cancelada.");
    };
    return Habitacion;
}());
var HabitacionSimple = /** @class */ (function (_super) {
    __extends(HabitacionSimple, _super);
    function HabitacionSimple() {
        return _super.call(this, "Simple", 50.0) || this;
    }
    HabitacionSimple.prototype.calcularPrecio = function () {
        return this.precioBase;
    };
    return HabitacionSimple;
}(Habitacion));
var HabitacionDoble = /** @class */ (function (_super) {
    __extends(HabitacionDoble, _super);
    function HabitacionDoble() {
        return _super.call(this, "Doble", 80.0) || this;
    }
    HabitacionDoble.prototype.calcularPrecio = function () {
        return this.precioBase;
    };
    return HabitacionDoble;
}(Habitacion));
var SistemaReservas = /** @class */ (function () {
    function SistemaReservas() {
        this.habitaciones = [];
        this.habitaciones.push(new HabitacionSimple());
        this.habitaciones.push(new HabitacionDoble());
    }
    SistemaReservas.prototype.mostrarHabitaciones = function () {
        for (var _i = 0, _a = this.habitaciones; _i < _a.length; _i++) {
            var habitacion = _a[_i];
            var disponibilidad = habitacion.isDisponible() ? "Disponible" : "No disponible";
            console.log("".concat(habitacion["tipoHabitacion"], ": ").concat(disponibilidad, " - Precio: $").concat(habitacion.calcularPrecio()));
        }
    };
    SistemaReservas.prototype.reservarHabitacion = function (tipoHabitacion) {
        for (var _i = 0, _a = this.habitaciones; _i < _a.length; _i++) {
            var habitacion = _a[_i];
            if (habitacion.isDisponible() && habitacion["tipoHabitacion"] === tipoHabitacion) {
                habitacion.reservar();
                return;
            }
        }
        console.log("No hay habitaciones disponibles del tipo ".concat(tipoHabitacion));
    };
    SistemaReservas.prototype.cancelarReserva = function (tipoHabitacion) {
        for (var _i = 0, _a = this.habitaciones; _i < _a.length; _i++) {
            var habitacion = _a[_i];
            if (!habitacion.isDisponible() && habitacion["tipoHabitacion"] === tipoHabitacion) {
                habitacion.cancelarReserva();
                return;
            }
        }
        console.log("No hay reservas para habitaciones del tipo ".concat(tipoHabitacion));
    };
    return SistemaReservas;
}());
var sistemaReservas = new SistemaReservas();
console.log("Antes de reservar:");
sistemaReservas.mostrarHabitaciones();
console.log("\nReservando una habitación simple:");
sistemaReservas.reservarHabitacion("Simple");
console.log("\nDespués de reservar:");
sistemaReservas.mostrarHabitaciones();
console.log("\nCancelando la reserva de una habitación simple:");
sistemaReservas.cancelarReserva("Simple");
console.log("\nDespués de cancelar la reserva:");
sistemaReservas.mostrarHabitaciones();
