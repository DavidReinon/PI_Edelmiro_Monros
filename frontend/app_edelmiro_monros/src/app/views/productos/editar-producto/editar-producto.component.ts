import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Productos } from '../../../models/productos.interfaces';
import { ProductoService } from '../../../services/producto.service';
import { ProductosStateService } from '../../../services/productos-state.service';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {
  productoForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl<number | null>(null),
    foto: new FormControl('')
  });

  public productoId: number | undefined = 0;
  public newFoto: string = '';

  constructor(
    private router: Router,
    public productosService: ProductoService,
    public stateService: ProductosStateService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    let producto: Productos = this.stateService.getProducto();
    if (producto) {
      this.productoForm.setValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio ?? 0,
        foto: null
      });
      this.productoId = producto.id;
    } else {
      this.productoForm.setValue({
        nombre: 'Título de ejemplo',
        descripcion: 'Descripción de ejemplo',
        precio: 0,
        foto: ''
      });
    }
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        this.newFoto = base64String.split(',')[1];
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
    }
  }

  public onSubmit(): void {
    let producto: Productos = this.stateService.getProducto();
    const rawValue = this.productoForm.getRawValue();

    const nombre = rawValue.nombre || producto.nombre;
    const descripcion = rawValue.descripcion || producto.descripcion;
    const precio = rawValue.precio !== null ? Number(rawValue.precio) : producto.precio;

    const payload: Productos = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      foto: this.newFoto,
      stock: producto.stock,
      usuario: null
    };

    const cambios: Partial<Productos> = {};

    if (rawValue.nombre && rawValue.nombre !== producto.nombre) {
      cambios.nombre = rawValue.nombre;
    }

    if (rawValue.descripcion && rawValue.descripcion !== producto.descripcion) {
      cambios.descripcion = rawValue.descripcion;
    }

    if (rawValue.precio !== null && Number(rawValue.precio) !== producto.precio) {
      cambios.precio = Number(rawValue.precio);
    }

    if (this.newFoto && this.newFoto !== producto.foto) {
      cambios.foto = this.newFoto;
    }

    if (Object.keys(cambios).length === Object.keys(producto).length) {
      this.productosService.putProducto(this.productoId, payload).subscribe({
        next: response => {
          console.log('Producto actualizado completamente', response);
          this.router.navigate(['/productos']);
        },
        error: error => console.error('Error al actualizar producto', error)
      });
    } else if (Object.keys(cambios).length > 0) {
      this.productosService.patchProducto(this.productoId, cambios).subscribe({
        next: response => {
          console.log('Producto actualizado parcialmente', response);
          this.router.navigate(['/productos']);
        },
        error: error => console.error('Error al actualizar producto', error)
      });
    } else {
      console.log('No se hicieron cambios.');
    }
  }

  public cancelar(): void {
    this.router.navigate(['/productos']);
  }
}
