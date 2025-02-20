import { Component, OnInit } from '@angular/core';
import { Productos } from '../../models/productos.interfaces';
import { CardComponent } from '../../components/card/card.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CardComponent, RouterModule,  RouterLinkActive, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  public isAdmin$!: Observable<boolean>;
  productos: Productos[] = [
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


  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  agregarProducto() {
    this.router.navigate(['/formularioProducto']);
  }

  eliminarProducto(id: number) {
    console.log('Eliminando producto con id:', id);
    this.productos = this.productos.filter((producto) => producto.id !== id);
  }
}
