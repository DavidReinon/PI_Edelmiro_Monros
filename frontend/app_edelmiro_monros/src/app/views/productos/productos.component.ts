import { Component } from '@angular/core';
import { Productos } from '../../models/productos.interfaces';
import { CardComponent } from '../../components/card/card.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productos',
  imports: [CardComponent, RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  public isAdmin$!: Observable<boolean>;

  constructor(private router: Router, private authService: Auth) {}

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe(isAdmin => {
      console.log('isAdmin:', isAdmin);
    });
  }

  public productos: Productos[] = [
    {
      title: 'Moño 1',
      text: 'Moño Fallera 1',
      photo:
        'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7974.jpg',
      price: 100,
    },
    {
      title: 'Moño 2',
      text: 'Moño Fallera 2',
      photo:
        'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7545.jpg',
      price: 200,
    },
    {
      title: 'Moño 3',
      text: 'Moño Fallera 3',
      photo:
        'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_1403.jpeg',
      price: 300,
    },
    {
      title: 'Moño 4',
      text: 'Moño Fallera 4',
      photo:
        'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_2610.jpeg',
      price: 400,
    },
  ];

  agregarNoticia() {
    this.router.navigate(['/formularioProducto']);
  }

  eliminarNoticia(id: number) {
    //this.productos = this.productos.filter(producto => producto.id !== id);
    console.log('funciona');
  }
}
