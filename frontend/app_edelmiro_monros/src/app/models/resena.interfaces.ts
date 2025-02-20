export interface Resena {
    "@context": string;
    "@id":      string;
    "@type":    string;
    totalItems: number;
    member:     Member[];
}

export interface Member {
    "@id":        string;
    "@type":      Type;
    id:           number;
    autor:        string;
    calificacion: number;
    fecha:        Date;
    comentario:   string;
}

export enum Type {
    Resenas = "Resenas",
}
