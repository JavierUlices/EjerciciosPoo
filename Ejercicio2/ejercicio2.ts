//interfaz para los usuarios
interface Usuario {
    id: number;
    nombre: string;
    email: string;
}

interface Contenido {
    titulo: string;
    tipo: "video" | "documento" | "ejercicio";
}

abstract class CursoBase {
    protected estudiantes: Estudiante[] = [];
    protected contenidos: Contenido[] = [];

    constructor(public id: number, public titulo: string, public duracion: number) {}

    agregarContenido(contenido: Contenido): void {
        this.contenidos.push(contenido);
    }

    inscribirEstudiante(estudiante: Estudiante): void {
        if (!this.estudiantes.includes(estudiante)) {
            this.estudiantes.push(estudiante);
        } else {
            throw new Error("El estudiante ya está inscrito en este curso.");
        }
    }

    abstract calcularCalificacion(estudiante: Estudiante): number;
}

//clase concreta de curso con evaluación
class CursoEvaluado extends CursoBase {
    private calificaciones: Map<number, number> = new Map();

    asignarCalificacion(estudiante: Estudiante, calificacion: number): void {
        if (calificacion < 0 || calificacion > 100) {
            throw new Error("Calificación inválida. Debe estar entre 0 y 100.");
        }
        this.calificaciones.set(estudiante.id, calificacion);
    }

    calcularCalificacion(estudiante: Estudiante): number {
        return this.calificaciones.get(estudiante.id) || 0;
    }

    generarCertificado(estudiante: Estudiante): string {
        if (this.calcularCalificacion(estudiante) >= 60) {
            return `Certificado de aprobación para ${estudiante.nombre} en el curso ${this.titulo}`;
        } else {
            return `Lo sentimos, ${estudiante.nombre} no aprobó el curso ${this.titulo}`;
        }
    }
}

class Estudiante implements Usuario {
    cursos: CursoBase[] = [];

    constructor(public id: number, public nombre: string, public email: string) {}

    inscribirseEnCurso(curso: CursoBase): void {
        curso.inscribirEstudiante(this);
        this.cursos.push(curso);
    }

    obtenerProgreso(): string {
        return `El estudiante ${this.nombre} está inscrito en ${this.cursos.length} curso(s).`;
    }
}

//lase para la gestión de cursos
class PlataformaCursos {
    private cursos: CursoBase[] = [];

    agregarCurso(curso: CursoBase): void {
        this.cursos.push(curso);
    }

    recomendarCurso(): CursoBase | null {
        return this.cursos.length > 0 ? this.cursos[0] : null;
    }

    listarCursos(): void {
        console.log("Cursos disponibles:");
        this.cursos.forEach(curso => console.log(`${curso.titulo} - Duración: ${curso.duracion} horas`));
    }
}

const plataforma = new PlataformaCursos();

const cursoTS = new CursoEvaluado(1, "TypeScript Básico", 10);
const cursoJS = new CursoEvaluado(2, "JavaScript Avanzado", 15);

plataforma.agregarCurso(cursoTS);
plataforma.agregarCurso(cursoJS);

//Crear un estudiante
const estudiante1 = new Estudiante(1, "Carlos López", "carlos@email.com");

estudiante1.inscribirseEnCurso(cursoTS);
cursoTS.asignarCalificacion(estudiante1, 85);

console.log(estudiante1.obtenerProgreso());
console.log(cursoTS.generarCertificado(estudiante1));
plataforma.listarCursos();