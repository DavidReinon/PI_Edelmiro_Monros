import { Component } from '@angular/core';
import { Productos } from '../../models/productos.interfaces';
import { CardComponent } from '../../components/card/card.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos',
  imports: [CardComponent, RouterModule, RouterLinkActive],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  public productos: Productos[] = [
    {
      nombre: 'Moño 1',
      descripcion: 'Moño Fallera 1',
      foto: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7974.jpg',
      precio: 100,
      stock: null,
      usuarioId: 1,
    },
    {
      nombre: 'Moño 2',
      descripcion: 'Moño Fallera 2',
      foto: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7545.jpg',
      precio: 200,
      stock: null,
      usuarioId: 1,
    },
    {
      nombre: 'Moño 3',
      descripcion: 'Moño Fallera 3',
      foto: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_1403.jpeg',
      precio: 300,
      stock: null,
      usuarioId: 1,
    },
    {
      nombre: 'Moño 4',
      descripcion: 'Moño Fallera 4',
      foto: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_2610.jpeg',
      precio: 400,
      stock: null,
      usuarioId: 1,
    },
  ];

  constructor(private router: Router) {}

  agregarNoticia() {
    this.router.navigate(['/formularioProducto']);
  }

  eliminarNoticia(id: number) {
    //this.productos = this.productos.filter(producto => producto.id !== id);
    console.log('funciona');
  }
}
