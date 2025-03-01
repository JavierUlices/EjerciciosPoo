const readlineSync = require('readline-sync');
enum TipoPersonaje {
    Guerrero = "Guerrero",
    Mago = "Mago",
    Sanador = "Sanador",
}

class Personaje {
    constructor(
        public nombre: string,
        public salud: number,
        public ataque: number,
        public defensaFisica: number,
        public defensaMagica: number,
        public poderMagico: number,
        public tipo: TipoPersonaje
    ) {}

    mostrarInfo() {
        return `${this.nombre} (${this.tipo}) - Salud: ${this.salud}, Ataque: ${this.ataque}, Defensa Física: ${this.defensaFisica}, Defensa Mágica: ${this.defensaMagica}, Poder Mágico: ${this.poderMagico}`;
    }
}
class Guerrero extends Personaje {
    constructor(nombre: string, salud: number, ataque: number, defensaFisica: number) {
        super(nombre, salud, ataque, defensaFisica, 0, 0, TipoPersonaje.Guerrero);
    }
}

class Mago extends Personaje {
    constructor(nombre: string, salud: number, ataque: number, poderMagico: number) {
        super(nombre, salud, ataque, 0, 0, poderMagico, TipoPersonaje.Mago);
    }
}

class Sanador extends Personaje {
    constructor(nombre: string, salud: number, defensaFisica: number, defensaMagica: number) {
        super(nombre, salud, 0, defensaFisica, defensaMagica, 0, TipoPersonaje.Sanador);
    }
}
class GestionPersonajes {
    private personajes: Personaje[] = [];
    agregarPersonaje(personaje: Personaje): void {
        this.personajes.push(personaje);
    }
    mostrarPersonajes(): void {
        if (this.personajes.length === 0) {
            console.log("No hay personajes registrados.");
        } else {
            this.personajes.forEach((personaje) => {
                console.log(personaje.mostrarInfo());
            });
        }
    }
    mostrarPorCategoria(tipo: TipoPersonaje): void {
        const personajesFiltrados = this.personajes.filter((personaje) => personaje.tipo === tipo);
        if (personajesFiltrados.length === 0) {
            console.log(`No hay personajes de tipo ${tipo}.`);
        } else {
            personajesFiltrados.forEach((personaje) => {
                console.log(personaje.mostrarInfo());
            });
        }
    }
    editarPersonaje(nombre: string, nuevosDatos: Partial<Personaje>): void {
        const personaje = this.personajes.find((p) => p.nombre === nombre);
        if (personaje) {
            Object.assign(personaje, nuevosDatos);
            console.log(`Personaje ${nombre} actualizado.`);
        } else {
            console.log(`No se encontró un personaje con el nombre ${nombre}.`);
        }
    }
    eliminarPersonaje(nombre: string): void {
        const index = this.personajes.findIndex((p) => p.nombre === nombre);
        if (index !== -1) {
            this.personajes.splice(index, 1);
            console.log(`Personaje ${nombre} eliminado.`);
        } else {
            console.log(`No se encontró un personaje con el nombre ${nombre}.`);
        }
    }
}
function ingresarNumero(mensaje: string): number {
    let numero: number;
    while (true) {
        const input = readlineSync.question(mensaje);
        numero = Number(input);
        if (!isNaN(numero) && numero >= 0) {
            break;
        } else {
            console.log("Por favor, ingrese un número válido.");
        }
    }
    return numero;
}

// Función para ingresar el tipo de personaje
function ingresarTipo(): TipoPersonaje {
    console.log("Seleccione el tipo de personaje:");
    console.log("1. Guerrero");
    console.log("2. Mago");
    console.log("3. Sanador");
    let opcion: number;
    while (true) {
        const input = readlineSync.question("Opción: ");
        opcion = Number(input);
        if (opcion === 1) return TipoPersonaje.Guerrero;
        if (opcion === 2) return TipoPersonaje.Mago;
        if (opcion === 3) return TipoPersonaje.Sanador;
        console.log("Opción incorrecta. Por favor, intente nuevamente.");
    }
}

function main() {
    const gestionPersonajes = new GestionPersonajes();

    try {
        while (true) {
            console.log("1. Agregar personaje");
            console.log("2. Mostrar todos los personajes");
            console.log("3. Mostrar personajes por tipo");
            console.log("4. Editar personaje");
            console.log("5. Eliminar personaje");
            console.log("6. Salir");

            const opcion = readlineSync.question("Por favor, elija una opción: ");

            if (opcion === "1") {
               
                const nombre = readlineSync.question("Ingrese el nombre del personaje: ");
                const salud = ingresarNumero("Ingrese la salud: ");
                const ataque = ingresarNumero("Ingrese el ataque: ");
                const defensaFisica = ingresarNumero("Ingrese la defensa física: ");
                const defensaMagica = ingresarNumero("Ingrese la defensa mágica: ");
                const poderMagico = ingresarNumero("Ingrese el poder mágico: ");
                const tipo = ingresarTipo();

                let nuevoPersonaje: Personaje;
                if (tipo === TipoPersonaje.Guerrero) {
                    nuevoPersonaje = new Guerrero(nombre, salud, ataque, defensaFisica);
                } else if (tipo === TipoPersonaje.Mago) {
                    nuevoPersonaje = new Mago(nombre, salud, ataque, poderMagico);
                } else {
                    nuevoPersonaje = new Sanador(nombre, salud, defensaFisica, defensaMagica);
                }

                gestionPersonajes.agregarPersonaje(nuevoPersonaje);
            } else if (opcion === "2") {
                // Mostrar dotos los personajes del juego
                gestionPersonajes.mostrarPersonajes();
            } else if (opcion === "3") {
                // Mostrar personaje del juego por tipo
                const tipo = ingresarTipo();
                gestionPersonajes.mostrarPorCategoria(tipo);
            } else if (opcion === "4") {
                // Editar los personsjes del juego
                const nombre = readlineSync.question("Ingrese el nombre del personaje a editar: ");
                const salud = readlineSync.question("¿Desea editar la salud? (s/n): ");
                const ataque = readlineSync.question("¿Desea editar el ataque? (s/n): ");
                if (salud === "s" || ataque === "s") {
                    const nuevosDatos: Partial<Personaje> = {};
                    if (salud === "s") nuevosDatos.salud = ingresarNumero("Ingrese la nueva salud: ");
                    if (ataque === "s") nuevosDatos.ataque = ingresarNumero("Ingrese el nuevo ataque: ");
                    gestionPersonajes.editarPersonaje(nombre, nuevosDatos);
                } else {
                    console.log("No se realizaron cambios.");
                }
            } else if (opcion === "5") {
                // Eliminar solo un personaje del juego
                const nombre = readlineSync.question
                console.log("Ingrese el nombre del personaje a eliminar: ");
                gestionPersonajes.eliminarPersonaje(nombre);
            } else if (opcion === "6") {
                console.log("Saliendo...");
                break;
            } else {
                console.log("Opción no válida.");
            }
        }
    } catch (error) {
        console.error("Ha ocurrido un error: ", error);
    }
}

main();

