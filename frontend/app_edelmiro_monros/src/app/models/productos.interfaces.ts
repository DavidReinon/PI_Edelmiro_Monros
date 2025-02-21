export interface Productos {
  id?: number ;
  nombre: string;
  descripcion: string;
  foto: string | null;
  precio: number | null;
  stock: number | null;
  usuario: number;
}