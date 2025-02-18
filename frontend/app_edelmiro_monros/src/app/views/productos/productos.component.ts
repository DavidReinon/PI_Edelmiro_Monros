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
  imports: [CardComponent, RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  public isAdmin$!: Observable<boolean>;
<<<<<<< HEAD
  productos: Productos[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe(isAdmin => {
      console.log('isAdmin:', isAdmin);
    });

    this.productos = [
      {
        id: 1,
        title: 'Moño 1',
        text: 'Moño Fallera 1',
        photo:
          'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7974.jpg',
        price: 100,
      },
      {
        id: 2,
        title: 'Moño 2',
        text: 'Moño Fallera 2',
        photo:
          'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7545.jpg',
        price: 200,
      },
      {
        id: 3,
        title: 'Moño 3',
        text: 'Moño Fallera 3',
        photo:
          'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_1403.jpeg',
        price: 300,
      },
      {
        id: 4,
        title: 'Moño 4',
        text: 'Moño Fallera 4',
        photo:
          'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_2610.jpeg',
        price: 400,
      },
    ];
=======

  constructor(private router: Router, private authService: Auth) {}
  productos: Productos[] = [
    {
      id: 1,
      title: 'Moño 1',
      text: 'Moño Fallera 1',
      photo:
        'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7974.jpg',
      price: 100,
    },
    {
      id: 2,
      title: 'Moño 2',
      text: 'Moño Fallera 2',
      photo:
        'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7545.jpg',
      price: 200,
    },
    {
      id: 3,
      title: 'Moño 3',
      text: 'Moño Fallera 3',
      photo:
        'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_1403.jpeg',
      price: 300,
    },
    {
      id: 4,
      title: 'Moño 4',
      text: 'Moño Fallera 4',
      photo:
        'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_2610.jpeg',
      price: 400,
    },
  ];

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe((isAdmin) => {
      console.log('isAdmin:', isAdmin);
    });
>>>>>>> 97f87e0fcc1f141f8efd3939d9cdff4680eee7c7
  }

  agregarProducto() {
    this.router.navigate(['/formularioProducto']);
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter((producto) => producto.id !== id);
    console.log('funciona');
  }

  editarProducto(id: number) {
    this.router.navigate(['/editarProducto', id]);
  }
}
