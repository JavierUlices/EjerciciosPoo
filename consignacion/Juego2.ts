import * as readline from 'readline';

// Clase  para el vehiculo
abstract class Vehiculo {
    marca: string;
    modelo: string;
    año: number;

    constructor(marca: string, modelo: string, año: number) {
        if (año < 1886) {
            throw new Error("Año no puede ser anterior a 1886.");
        } else {
            if (año > new Date().getFullYear()) {
                throw new Error("El año no puede ser mayor al año actual.");
            }
        }
    
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
    }
    
    abstract obtenerDescripcion(): string;
}

 // Clase coche
class Coche extends Vehiculo {
    numeroDePuertas: number;

    constructor(marca: string, modelo: string, año: number, numeroDePuertas: number) {
        super(marca, modelo, año);
        if (numeroDePuertas < 2 || numeroDePuertas > 5) {
            throw new Error("El número de puertas del auto debe ser entre 2 y 5.");
        }
        this.numeroDePuertas = numeroDePuertas;
    }

    obtenerDescripcion(): string {
        return `${this.marca} ${this.modelo}, Año: ${this.año}, Puertas: ${this.numeroDePuertas}`;
    }
}

// Clase Motocicleta 
class Motocicleta extends Vehiculo {
    tipoDeMotor: string;

    constructor(marca: string, modelo: string, año: number, tipoDeMotor: string) {
        super(marca, modelo, año);
        this.tipoDeMotor = tipoDeMotor;
    }

    obtenerDescripcion(): string {
        return `${this.marca} ${this.modelo}, Año: ${this.año}, Motor: ${this.tipoDeMotor}`;
    }
}

// Creando la interfaz de readline  
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para pedir los datos de dichos usuarios
function crearVehiculo() {
    rl.question("¿Qué tipo de vehiculos te gustaría tener? (coche o motocicleta): ", (tipo) => {
        if (!tipo) {
            console.log("Por favor ingrese el tipo de vehículo.");
            rl.close();
            return;
        }

        const tipoLower = tipo.toLowerCase();

        rl.question("Marca del vehículo: ", (marca) => {
            rl.question("Modelo del vehículo: ", (modelo) => {
                rl.question("Año del vehículo: ", (añoStr) => {
                    const año = parseInt(añoStr);

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
                        rl.question("Número de puertas del coche (2 a 5): ", (numeroDePuertasStr) => {
                            const numeroDePuertas = parseInt(numeroDePuertasStr);

                            if (isNaN(numeroDePuertas) || numeroDePuertas < 2 || numeroDePuertas > 5) {
                                console.log("El número de puertas debe ser entre 2 y 5.");
                                rl.close();
                                return;
                            }

                            const coche = new Coche(marca, modelo, año, numeroDePuertas);
                            console.log(coche.obtenerDescripcion());
                            rl.close();
                        });
                    } else if (tipoLower === "motocicleta") {
                        rl.question("Tipo de motor de la motocicleta: ", (tipoDeMotor) => {
                            if (!tipoDeMotor) {
                                console.log("El tipo de motor es obligatorio.");
                                rl.close();
                                return;
                            }

                            const moto = new Motocicleta(marca, modelo, año, tipoDeMotor);
                            console.log(moto.obtenerDescripcion());
                            rl.close();
                        });
                    } else {
                        console.log("Tipo de vehículo no válido.");
                        rl.close();
                    }
                });
            });
        });
    });
}

// Llamando la funcion para crear el vehículo.
crearVehiculo();
