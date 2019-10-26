export class Admin {

    public id: number;
    public usuario: string;
    public passwd: string;
    public active: boolean;

    constructor(id: number, usuario: string, passwd: string, active: boolean) {

        this.id = id;
        this.usuario = usuario;
        this.passwd = passwd;
        this.active = active;

    }

}