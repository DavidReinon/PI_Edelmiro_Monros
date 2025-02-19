export interface Resena {
    resenas: ResenaElement[];
}

export interface ResenaElement {
    autor:        string;
    calificacion: number;
    fecha:        string;
    comentario:   string;
}
