import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Productos } from '../../../models/productos.interfaces';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {
  productoForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    photo: new FormControl(''),
    price: new FormControl(0)
  });

  productos: Productos[] = [
    {
      id: 1,
      title: 'Moño 1',
      text: 'Moño Fallera 1',
      photo: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7974.jpg',
      price: 100,
    },
    {
      id: 2,
      title: 'Moño 2',
      text: 'Moño Fallera 2',
      photo: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7545.jpg',
      price: 200,
    },
    {
      id: 3,
      title: 'Moño 3',
      text: 'Moño Fallera 3',
      photo: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_1403.jpeg',
      price: 300,
    },
    {
      id: 4,
      title: 'Moño 4',
      text: 'Moño Fallera 4',
      photo: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_2610.jpeg',
      price: 400,
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', id);
    const producto = this.productos.find(p => p.id === id);
    console.log('Producto encontrado:', producto);
    
    if (producto) {
      this.productoForm.patchValue({
        title: producto.title,
        text: producto.text,
        photo: producto.photo,
        price: producto.price
      });
    }
  }

  onSubmit() {
    console.log(this.productoForm.value);
    this.router.navigate(['/productos']);
  }

  cancelar() {
    this.router.navigate(['/productos']);
  }
}
