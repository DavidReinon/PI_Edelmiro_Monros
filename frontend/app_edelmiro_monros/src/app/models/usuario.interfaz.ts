export interface Usuarios {
    "@context": string;
    "@id":      string;
    "@type":    string;
    totalItems: number;
    member:     Member[];
}

export interface Member {
    "@id":      string;
    "@type":    string;
    id:         number;
    nombre:     string;
    contraseña: string;
    email:      string;
    admin:      boolean;
    noticias:   Noticia[];
    productos:  Producto[];
}

export interface Noticia {
    "@type":     string;
    "@id":       string;
    id:          number;
    titulo:      string;
    descripcion: string;
    fecha:       Date;
    foto?:       string;
    usuario:     string;
}

export interface Producto {
    "@type":         string;
    "@id":           string;
    id:              number;
    nombre:          string;
    descripcion:     string;
    foto:            string;
    precio:          number;
    stock:           number;
    usuarioProducto: string;
}