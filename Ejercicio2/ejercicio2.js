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
var CursoBase = /** @class */ (function () {
    function CursoBase(id, titulo, duracion) {
        this.id = id;
        this.titulo = titulo;
        this.duracion = duracion;
        this.estudiantes = [];
        this.contenidos = [];
    }
    CursoBase.prototype.agregarContenido = function (contenido) {
        this.contenidos.push(contenido);
    };
    CursoBase.prototype.inscribirEstudiante = function (estudiante) {
        if (!this.estudiantes.includes(estudiante)) {
            this.estudiantes.push(estudiante);
        }
        else {
            throw new Error("El estudiante ya está inscrito en este curso.");
        }
    };
    return CursoBase;
}());
//clase concreta de curso con evaluación
var CursoEvaluado = /** @class */ (function (_super) {
    __extends(CursoEvaluado, _super);
    function CursoEvaluado() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.calificaciones = new Map();
        return _this;
    }
    CursoEvaluado.prototype.asignarCalificacion = function (estudiante, calificacion) {
        if (calificacion < 0 || calificacion > 100) {
            throw new Error("Calificación inválida. Debe estar entre 0 y 100.");
        }
        this.calificaciones.set(estudiante.id, calificacion);
    };
    CursoEvaluado.prototype.calcularCalificacion = function (estudiante) {
        return this.calificaciones.get(estudiante.id) || 0;
    };
    CursoEvaluado.prototype.generarCertificado = function (estudiante) {
        if (this.calcularCalificacion(estudiante) >= 60) {
            return "Certificado de aprobaci\u00F3n para ".concat(estudiante.nombre, " en el curso ").concat(this.titulo);
        }
        else {
            return "Lo sentimos, ".concat(estudiante.nombre, " no aprob\u00F3 el curso ").concat(this.titulo);
        }
    };
    return CursoEvaluado;
}(CursoBase));
var Estudiante = /** @class */ (function () {
    function Estudiante(id, nombre, email) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.cursos = [];
    }
    Estudiante.prototype.inscribirseEnCurso = function (curso) {
        curso.inscribirEstudiante(this);
        this.cursos.push(curso);
    };
    Estudiante.prototype.obtenerProgreso = function () {
        return "El estudiante ".concat(this.nombre, " est\u00E1 inscrito en ").concat(this.cursos.length, " curso(s).");
    };
    return Estudiante;
}());
//lase para la gestión de cursos
var PlataformaCursos = /** @class */ (function () {
    function PlataformaCursos() {
        this.cursos = [];
    }
    PlataformaCursos.prototype.agregarCurso = function (curso) {
        this.cursos.push(curso);
    };
    PlataformaCursos.prototype.recomendarCurso = function () {
        return this.cursos.length > 0 ? this.cursos[0] : null;
    };
    PlataformaCursos.prototype.listarCursos = function () {
        console.log("Cursos disponibles:");
        this.cursos.forEach(function (curso) { return console.log("".concat(curso.titulo, " - Duraci\u00F3n: ").concat(curso.duracion, " horas")); });
    };
    return PlataformaCursos;
}());
var plataforma = new PlataformaCursos();
var cursoTS = new CursoEvaluado(1, "TypeScript Básico", 10);
var cursoJS = new CursoEvaluado(2, "JavaScript Avanzado", 15);
plataforma.agregarCurso(cursoTS);
plataforma.agregarCurso(cursoJS);
//Crear un estudiante
var estudiante1 = new Estudiante(1, "Carlos López", "carlos@email.com");
estudiante1.inscribirseEnCurso(cursoTS);
cursoTS.asignarCalificacion(estudiante1, 85);
console.log(estudiante1.obtenerProgreso());
console.log(cursoTS.generarCertificado(estudiante1));
plataforma.listarCursos();
