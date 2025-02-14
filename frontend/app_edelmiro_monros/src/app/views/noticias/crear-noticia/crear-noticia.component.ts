import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-noticia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-noticia.component.html',
  styleUrl: './crear-noticia.component.css'
})
export class CrearNoticiaComponent {
  noticiaForm = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    fecha: new FormControl(''),
    foto: new FormControl('')
  });

  constructor(private router: Router) {}

  onSubmit() {
    console.log(this.noticiaForm.value);
    this.router.navigate(['/noticias']);
  }

  cancelar() {
    this.router.navigate(['/noticias']);
  }
} 