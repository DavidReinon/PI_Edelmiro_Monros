import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiasService } from '../../../services/noticias.service';

@Component({
  selector: 'app-crear-noticia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css']
})
export class CrearNoticiaComponent {
  noticiaForm = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fecha: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    foto: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private router: Router, private noticiasService: NoticiasService) { }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        this.noticiaForm.patchValue({ foto: base64String.split(',')[1] });
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
    }
  }

  public onSubmit(): void {
    if (this.noticiaForm.invalid) {
      console.log('Formulario no válido');
      this.noticiaForm.markAllAsTouched();
      return;
    }

    const rawValue = this.noticiaForm.getRawValue();
    const date = new Date(rawValue.fecha);
    const fechaISO = date.toISOString();

    const payload = {
      titulo: rawValue.titulo,
      descripcion: rawValue.descripcion,
      fecha: fechaISO,
      usuario: 1,
      foto: rawValue.foto ? rawValue.foto : null
    };

    console.log(payload);

    this.noticiasService.postNoticia(payload).subscribe({
      next: (response) => {
        console.log('Noticia creada', response);
        this.router.navigate(['/noticias']);
      },
      error: (error) => {
        console.error('Error al crear noticia', error);
        if (error.status === 400) {
          console.log('Detalles del error:', error.error);
        }
      }
    });
  }

  public cancelar(): void {
    this.router.navigate(['/noticias']);
  }
}
