import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Productos } from '../../../models/productos.interfaces';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./formulario-producto.component.css'],
})
export class FormularioProductoComponent {
  productoForm = new FormGroup({
    nombre: new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    precio: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null),
    usuarioId: new FormControl<number>(1),
    foto: new FormControl<string | null>(null)
  });

  constructor(
    private router: Router,
    private productoService: ProductoService
  ) {}

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        this.productoForm.patchValue({ foto: base64String.split(',')[1] });
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
    }
  }

  public onSubmit() {
    if (this.productoForm.valid) {
      const payload: Productos = {
        nombre: this.productoForm.value.nombre || '',
        descripcion: this.productoForm.value.descripcion || '',
        precio: Number(this.productoForm.value.precio) || 0,
        stock: Number(this.productoForm.value.stock) || 0,
        usuario: 1,
        foto: this.productoForm.value.foto || null
      };

      console.log('Enviando payload:', payload);

      this.productoService.createProducto(payload).subscribe({
        next: (response) => {
          console.log('Producto creado:', response);
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          console.error('Error al crear producto:', error);
          if (error.error) {
            console.log('Error detallado:', error.error);
          }
        }
      });
    }
  }

  public cancelar() {
    this.router.navigate(['/productos']);
  }
}
