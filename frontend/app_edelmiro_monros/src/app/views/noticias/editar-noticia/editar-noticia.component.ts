import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NoticiasService } from '../../../services/noticias.service';
import { NoticiasStateService } from '../../../services/noticias-state.service';
import { Noticias } from '../../../models/noticias.interfaces';

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  foto: string | null;
}

@Component({
  selector: 'app-editar-noticia',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-noticia.component.html',
  styleUrl: './editar-noticia.component.css'
})
export class EditarNoticiaComponent implements OnInit {
  noticiaForm = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    fecha: new FormControl(''),
    foto: new FormControl('')
  });

  public noticiaId: string = '';
  public newFoto: string = ''

  constructor(
    private router: Router,
    public noticiasService: NoticiasService,
    public stateService: NoticiasStateService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    let noticia: Noticias = this.stateService.getNoticia()
    if (noticia) {
      this.noticiaForm.setValue({
        titulo: noticia.titulo,
        descripcion: noticia.descripcion,
        fecha: noticia.fecha,
        foto: null
      });
    } else {
      this.noticiaForm.setValue({
        titulo: 'Título de ejemplo',
        descripcion: 'Descripción de ejemplo',
        fecha: '2024-02-15',
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
        this.newFoto = base64String.split(',')[1]
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
    }
  }

  public onSubmit(): void {
    let noticia: Noticias = this.stateService.getNoticia()
    let fechaISO: string = '';
    let titulo: string = ''
    let descripcion: string = ''
    const rawValue = this.noticiaForm.getRawValue();
    if (noticia.id) {
      this.noticiaId = noticia.id
    }

    if (rawValue.fecha) {
      const date = new Date(rawValue.fecha);
      fechaISO = date.toISOString();
    } else {
      fechaISO = noticia.fecha
    }

    if (rawValue.titulo) {
      titulo = rawValue.titulo
    } else {
      titulo = noticia.titulo
    }

    if (rawValue.descripcion) {
      descripcion = rawValue.descripcion
    } else {
      descripcion = noticia.descripcion
    }

    const payload: Noticias = {
      titulo: titulo,
      descripcion: descripcion,
      fecha: fechaISO,
      usuario: noticia.usuario,
      foto: this.newFoto
    };

    const cambios: Partial<Noticias> = {};

    if (rawValue.titulo && rawValue.titulo !== noticia.titulo) {
      cambios.titulo = rawValue.titulo;
    }

    if (rawValue.descripcion && rawValue.descripcion !== noticia.descripcion) {
      cambios.descripcion = rawValue.descripcion;
    }

    if (rawValue.fecha) {
      const fechaISO = new Date(rawValue.fecha).toISOString();
      if (fechaISO !== noticia.fecha) {
        cambios.fecha = fechaISO;
      }
    }

    if (rawValue.foto !== noticia.foto) {
      cambios.foto = this.newFoto;
    }

    if (Object.keys(cambios).length === Object.keys(noticia).length) {
      this.noticiasService.putNoticia(this.noticiaId, payload).subscribe({
        next: response => {
          console.log('Noticia actualizada completamente', response);
          this.router.navigate(['/noticias']);
        },
        error: error => console.error('Error al actualizar noticia', error)
      });
    } else if (Object.keys(cambios).length > 0) {
      this.noticiasService.patchNoticia(this.noticiaId, cambios).subscribe({
        next: response => {
          console.log('Noticia actualizada parcialmente', response);
          this.router.navigate(['/noticias']);
        },
        error: error => console.error('Error al actualizar noticia', error)
      });
    } else {
      console.log('No se hicieron cambios.');
    }
  }


  public cancelar(): void {
    this.router.navigate(['/noticias']);
  }
} 