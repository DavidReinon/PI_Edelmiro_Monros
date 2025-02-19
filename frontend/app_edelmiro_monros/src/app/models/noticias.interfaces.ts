export interface Noticias {
    id?:          number;
    titulo:      string;
    descripcion: string;
    fecha:       Date;
    usuario: Usuario | string
    foto:        string | null;
}

export interface Usuario {
    id:         number;
    nombre:     string;
    contraseña: string;
    admin:      boolean;
    gmail:      string;
}
