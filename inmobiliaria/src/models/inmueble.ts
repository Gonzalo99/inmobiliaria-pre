export class Inmueble {

    public id: number;
    public titulo: string;
    public contenido: string;
    public tipo: string;
    public metros: number;
    public visitas: number;
    public direccion: string;
    public precio: number;
    public estado: string; //Nuevo o segunda mano
    public oferta: boolean;
    public antiguedad: number;
    public planta: number;
    public ascensor: boolean;
    public garaje: boolean;
    public first_img: string;

    constructor(id: number, titulo: string, contenido: string, tipo: string, metros: number, visitas: number, direccion: string, precio: number, estado: string, oferta: boolean, antiguedad: number, planta: number, ascensor: boolean, garaje: boolean, first_img: string) {

        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.tipo = tipo;
        this.metros = metros;
        this.visitas = visitas;
        this.direccion = direccion;
        this.precio = precio;
        this.estado = estado;
        this.oferta = oferta;
        this.antiguedad = antiguedad;
        this.planta = planta;
        this.ascensor = ascensor;
        this.garaje = garaje;
        this.first_img = first_img;

    }

}