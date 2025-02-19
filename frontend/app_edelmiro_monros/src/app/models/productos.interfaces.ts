export interface Productos { 
    nombre: string; 
    descripcion: string; 
    precio: number | null;
    stock: number | null;
    usuarioId: number;
    foto: string | null;
};