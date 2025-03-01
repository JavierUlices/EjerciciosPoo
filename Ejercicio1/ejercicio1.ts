interface Reservable {
    reservar(): void;
    cancelarReserva(): void;
    calcularPrecio(): number;
}

abstract class Habitacion implements Reservable {
    protected tipoHabitacion: string;
    protected precioBase: number;
    protected disponibilidad: boolean;

    constructor(tipoHabitacion: string, precioBase: number) {
        this.tipoHabitacion = tipoHabitacion;
        this.precioBase = precioBase;
        this.disponibilidad = true;
    }

    isDisponible(): boolean {
        return this.disponibilidad;
    }

    setDisponibilidad(disponibilidad: boolean): void {
        this.disponibilidad = disponibilidad;
    }

    abstract calcularPrecio(): number;

    reservar(): void {
        if (this.disponibilidad) {
            this.disponibilidad = false;
            console.log("Habitación reservada.");
        } else {
            console.log("Habitación no disponible.");
        }
    }

    cancelarReserva(): void {
        this.disponibilidad = true;
        console.log("Reserva cancelada.");
    }
}

class HabitacionSimple extends Habitacion {
    constructor() {
        super("Simple", 50.0);
    }

    calcularPrecio(): number {
        return this.precioBase;
    }
}

class HabitacionDoble extends Habitacion {
    constructor() {
        super("Doble", 80.0);
    }

    calcularPrecio(): number {
        return this.precioBase;
    }
}

class SistemaReservas {
    private habitaciones: Habitacion[];

    constructor() {
        this.habitaciones = [];
        this.habitaciones.push(new HabitacionSimple());
        this.habitaciones.push(new HabitacionDoble());
    }

    mostrarHabitaciones(): void {
        for (let habitacion of this.habitaciones) {
            let disponibilidad = habitacion.isDisponible() ? "Disponible" : "No disponible";
            console.log(`${habitacion["tipoHabitacion"]}: ${disponibilidad} - Precio: $${habitacion.calcularPrecio()}`);
        }
    }

    reservarHabitacion(tipoHabitacion: string): void {
        for (let habitacion of this.habitaciones) {
            if (habitacion.isDisponible() && habitacion["tipoHabitacion"] === tipoHabitacion) {
                habitacion.reservar();
                return;
            }
        }
        console.log(`No hay habitaciones disponibles del tipo ${tipoHabitacion}`);
    }

    cancelarReserva(tipoHabitacion: string): void {
        for (let habitacion of this.habitaciones) {
            if (!habitacion.isDisponible() && habitacion["tipoHabitacion"] === tipoHabitacion) {
                habitacion.cancelarReserva();
                return;
            }
        }
        console.log(`No hay reservas para habitaciones del tipo ${tipoHabitacion}`);
    }
}

let sistemaReservas = new SistemaReservas();

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