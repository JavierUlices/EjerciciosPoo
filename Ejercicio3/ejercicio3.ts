// Importando el modulo redline
import * as readline from 'readline';

// Configurar readline para leer desde la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Función para hacer preguntas y obtener respuestas
const pregunta = (consulta: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(consulta, (respuesta) => {
            resolve(respuesta);
        });
    });
};

// 1. Definición de Enums y Tipos
enum EstadoEntrega {
    Pendiente = "Pendiente",
    EnCamino = "EnCamino",
    Entregado = "Entregado",
    Cancelado = "Cancelado"
}

enum TipoVehiculo {
    Bicicleta = "Bicicleta",
    Coche = "Coche",
    Camión = "Camión"
}

type Calificacion = 1 | 2 | 3 | 4 | 5;

interface IEntradaUsuario {
    origen: string;
    destino: string;
    peso: number;
    tipoVehiculo: TipoVehiculo;
    tipoEntrega: "Comida" | "Paquete";
    nombreRestaurante?: string;
    idPaquete?: string;
}

// 2. Definición de Interfaces y Clases Abstractas
interface IEntrega {
    calcularTiempoEntrega(): number;
    calcularCostoEnvio(): number;
    asignarRepartidor(): void;
    generarRutaOptima(): string;
    actualizarEstado(estado: EstadoEntrega): void;
}

abstract class Entrega implements IEntrega {
    constructor(
        public origen: string,
        public destino: string,
        public peso: number,
        public tipoVehiculo: TipoVehiculo,
        public estado: EstadoEntrega = EstadoEntrega.Pendiente
    ) {}

    abstract calcularTiempoEntrega(): number;
    abstract calcularCostoEnvio(): number;
    abstract asignarRepartidor(): void;
    abstract generarRutaOptima(): string;

    public actualizarEstado(estado: EstadoEntrega): void {
        this.estado = estado;
        console.log(`Estado de la entrega actualizado a: ${estado}`);
    }
}

// 3. Clases Concretas
class EntregaComida extends Entrega {
    constructor(
        origen: string,
        destino: string,
        peso: number,
        tipoVehiculo: TipoVehiculo,
        public nombreRestaurante: string
    ) {
        super(origen, destino, peso, tipoVehiculo);
    }

    calcularTiempoEntrega(): number {
        const tiempoBase = 30; // minutos
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
    }

    calcularCostoEnvio(): number {
        const costoBase = 10; // dólares
        return costoBase + (this.peso * 0.5);
    }

    asignarRepartidor(): void {
        console.log(`Asignando repartidor para ${this.nombreRestaurante}`);
    }

    generarRutaOptima(): string {
        return `Ruta óptima desde ${this.origen} hasta ${this.destino} para ${this.nombreRestaurante}`;
    }
}

class EntregaPaquete extends Entrega {
    constructor(
        origen: string,
        destino: string,
        peso: number,
        tipoVehiculo: TipoVehiculo,
        public idPaquete: string
    ) {
        super(origen, destino, peso, tipoVehiculo);
    }

    calcularTiempoEntrega(): number {
        const tiempoBase = 60; // minutos
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
    }

    calcularCostoEnvio(): number {
        const costoBase = 20; // dólares
        return costoBase + (this.peso * 1.2);
    }

    asignarRepartidor(): void {
        console.log(`Asignando repartidor para el paquete ${this.idPaquete}`);
    }

    generarRutaOptima(): string {
        return `Ruta óptima desde ${this.origen} hasta ${this.destino} para el paquete ${this.idPaquete}`;
    }
}

// 4. Gestión de Calificaciones y Repartidores
class Repartidor {
    constructor(
        public id: string,
        public nombre: string,
        public tipoVehiculo: TipoVehiculo,
        public calificacion: Calificacion = 5
    ) {}

    public actualizarCalificacion(nuevaCalificacion: Calificacion): void {
        this.calificacion = nuevaCalificacion;
        console.log(`Calificación actualizada para ${this.nombre} a ${nuevaCalificacion}`);
    }
}

class GestorEntregas {
    private entregas: Entrega[] = [];
    private repartidores: Repartidor[] = [];

    agregarEntrega(entrega: Entrega): void {
        this.entregas.push(entrega);
        console.log(`Entrega agregada: ${entrega.constructor.name}`);
    }

    asignarRepartidor(entrega: Entrega): void {
        const repartidorDisponible = this.repartidores.find(
            repartidor => repartidor.tipoVehiculo === entrega.tipoVehiculo
        );
        if (repartidorDisponible) {
            entrega.asignarRepartidor();
            console.log(`Asignado ${repartidorDisponible.nombre} a la entrega.`);
        } else {
            throw new Error("No hay repartidores disponibles para este tipo de vehículo.");
        }
    }

    agregarRepartidor(repartidor: Repartidor): void {
        this.repartidores.push(repartidor);
        console.log(`Repartidor agregado: ${repartidor.nombre}`);
    }

    calificarRepartidor(idRepartidor: string, calificacion: Calificacion): void {
        const repartidor = this.repartidores.find(r => r.id === idRepartidor);
        if (repartidor) {
            repartidor.actualizarCalificacion(calificacion);
        } else {
            throw new Error("Repartidor no encontrado.");
        }
    }
}

// 5. Generics
class ColaEntregas<T extends Entrega> {
    private cola: T[] = [];

    encolar(entrega: T): void {
        this.cola.push(entrega);
        console.log(`Entrega encolada: ${entrega.constructor.name}`);
    }

    desencolar(): T | undefined {
        return this.cola.shift();
    }

    procesarCola(): void {
        while (this.cola.length > 0) {
            const entrega = this.desencolar();
            if (entrega) {
                console.log(`Procesando entrega a ${entrega.destino}`);
            }
        }
    }
}

// 6. Validaciones y Manejo de Excepciones
function validarEntradaUsuario(entrada: IEntradaUsuario): void {
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
(async () => {
    try {
        const gestor = new GestorEntregas();

        // Agregando repartidores
        gestor.agregarRepartidor(new Repartidor("1", "Juan Pérez", TipoVehiculo.Bicicleta));
        gestor.agregarRepartidor(new Repartidor("2", "Ana Gómez", TipoVehiculo.Coche));

        // Función para ingresar los datos
        const ingresarDatos = async (): Promise<IEntradaUsuario> => {
            const origen = await pregunta("Ingresa el origen: ");
            const destino = await pregunta("Ingresa el destino: ");
            const peso = parseFloat(await pregunta("Ingresa el peso (en kg): "));
            const tipoVehiculo = await pregunta("Ingresa el tipo de vehículo (Bicicleta, Coche, Camión): ") as TipoVehiculo;
            const tipoEntrega = await pregunta("Ingresa el tipo de entrega (Comida o Paquete): ") as "Comida" | "Paquete";
            const nombreRestaurante = tipoEntrega === "Comida" ? await pregunta("Ingresa el nombre del restaurante: ") : undefined;
            const idPaquete = tipoEntrega === "Paquete" ? await pregunta("Ingresa el ID del paquete: ") : undefined;

            return {
                origen,
                destino,
                peso,
                tipoVehiculo,
                tipoEntrega,
                nombreRestaurante,
                idPaquete,
            };
        };

        // Ingresando datos al usuario
        const entradaUsuario = await ingresarDatos();

        // validando la entrada
        validarEntradaUsuario(entradaUsuario);

        // Creando entregas basadas en tipos
        let entrega: Entrega;
        if (entradaUsuario.tipoEntrega === "Comida") {
            entrega = new EntregaComida(
                entradaUsuario.origen,
                entradaUsuario.destino,
                entradaUsuario.peso,
                entradaUsuario.tipoVehiculo,
                entradaUsuario.nombreRestaurante!
            );
        } else {
            entrega = new EntregaPaquete(
                entradaUsuario.origen,
                entradaUsuario.destino,
                entradaUsuario.peso,
                entradaUsuario.tipoVehiculo,
                entradaUsuario.idPaquete!
            );
        }

        // Agregando y procesando entregas
        gestor.agregarEntrega(entrega);
        gestor.asignarRepartidor(entrega);

        console.log(`Tiempo de entrega: ${entrega.calcularTiempoEntrega()} minutos`);
        console.log(`Costo de envío: $${entrega.calcularCostoEnvio()}`);
        console.log(`Ruta óptima: ${entrega.generarRutaOptima()}`);

        // Procesando colas de entregas
        const colaEntregas = new ColaEntregas<Entrega>();
        colaEntregas.encolar(entrega);
        colaEntregas.procesarCola();

        // Area para calificar al repartidor
        const idRepartidor = await pregunta("Ingresa el ID del repartidor para calificar: ");
        const calificacion = parseInt(await pregunta("Ingresa la calificación (1-5): "));
        gestor.calificarRepartidor(idRepartidor, calificacion as Calificacion);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error(`Error desconocido: ${error}`);
        }
    } finally {
        rl.close();  
    }
})();