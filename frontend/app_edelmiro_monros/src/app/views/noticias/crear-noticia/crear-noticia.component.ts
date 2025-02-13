import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoticiaService } from '../../../services/noticias.service';

@Component({
  selector: 'app-crear-noticia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-noticia.component.html',
  styleUrl: './crear-noticia.component.css'
})
export class CrearNoticiaComponent {
  noticiaForm = new FormGroup({
    titulo: new FormControl('', { nonNullable: true }),
    descripcion: new FormControl('', { nonNullable: true }),
    fecha: new FormControl('', { nonNullable: true }),
    foto: new FormControl<File | null>(null)
  });

  constructor(private router: Router, private noticiaService: NoticiaService) { }

  public onSubmit() {
    const formData = new FormData();
    const rawValue = this.noticiaForm.getRawValue();
    formData.append('titulo', rawValue.titulo);
    formData.append('descripcion', rawValue.descripcion);
    formData.append('fecha', rawValue.fecha);
    if (rawValue.foto) {
      formData.append('foto', rawValue.foto);
    }

    this.noticiaService.crearNoticia(formData).subscribe({
      next: (response) => {
        console.log('Noticia creada', response);
        this.router.navigate(['/noticias']);
      },
      error: (error) => {
        console.error('Error al crear noticia', error);
      }
    });
  }

  public cancelar() {
    this.router.navigate(['/noticias']);
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.noticiaForm.get('foto')?.setValue(file);
    }
  }

} 