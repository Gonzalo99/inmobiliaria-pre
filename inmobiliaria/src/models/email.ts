export class Email {

    public nombre: string;
    public apellidos: string;
    public asunto: string;
    public correo: string;
    public mensaje: string;

    constructor(nombre: string, apellidos: string, asunto: string, correo: string, mensaje: string) {

        this.nombre = nombre;
        this.apellidos = apellidos;
        this.asunto = asunto;
        this.correo = correo;
        this.mensaje = mensaje;

    }

}