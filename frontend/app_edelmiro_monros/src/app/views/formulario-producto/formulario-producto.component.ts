import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent {

  productoForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    price: new FormControl(''),
    photo: new FormControl('')
  });

  constructor(private router: Router) {}

  onSubmit() {
    console.log(this.productoForm.value);
    this.router.navigate(['/productos']);
  }

  cancelar() {
    this.router.navigate(['/productos']);
  }
} 

