export interface Productos { 
    id?: number;
    nombre: string; 
    descripcion: string; 
    precio: number | null;
    stock: number | null;
    usuario: number;
    foto?: string | null;
};