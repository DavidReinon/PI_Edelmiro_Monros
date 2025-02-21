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
    id: new FormControl<number | null>(null),
    nombre: new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    precio: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null),
    usuario: new FormControl<number>(0),
    foto: new FormControl<string | null>(null)
  });

  productos: Productos[] = [
    {
      id: 1,
      nombre: 'Moño 1',
      descripcion: 'Moño Fallera 1',
      foto: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7974.jpg',
      precio: 100,
      stock: 10,
      usuario: 1
    },
    {
      id: 2,
      nombre: 'Moño 2',
      descripcion: 'Moño Fallera 2',
      foto: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_7545.jpg',
      precio: 200,
      stock: 20,
      usuario: 2
    },
    {
      id: 3,
      nombre: 'Moño 3',
      descripcion: 'Moño Fallera 3',
      foto: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_1403.jpeg',
      precio: 300,
      stock: 30,
      usuario: 3
    },
    {
      id: 4,
      nombre: 'Moño 4',
      descripcion: 'Moño Fallera 4',
      foto: 'https://edelmiromonros.com/img/cms/nuestros%20trabajos/optimiz/IMG_2610.jpeg',
      precio: 400,
      stock: 40,
      usuario: 4
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
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        usuario: producto.usuario,
        foto: producto.foto
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
