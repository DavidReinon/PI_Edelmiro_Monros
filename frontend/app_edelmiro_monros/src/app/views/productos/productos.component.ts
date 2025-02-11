import { Component } from '@angular/core';
import { Productos } from '../../models/productos.interfaces';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-productos',
  imports: [CardComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  public content: Productos[] = [
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
}
