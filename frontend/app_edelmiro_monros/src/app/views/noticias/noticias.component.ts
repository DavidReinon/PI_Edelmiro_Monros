import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardNoticiasComponent } from '../../components/card-noticias/card-noticias.component';
import { Observable } from 'rxjs';
import { Auth } from '../../services/auth.service';
import { NoticiasService } from '../../services/noticias.service';
import { Noticias } from '../../models/noticias.interfaces';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CardNoticiasComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})

export class NoticiasComponent {
  public isAdmin$!: Observable<boolean>;

  constructor(private router: Router, private authService: Auth, public service: NoticiasService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  public getNoticias(): void {
    this.noticias = []
    this.service.getNoticias().subscribe((response) => {
      this.noticias = response
    });
  }

  public ngOnInit(): void {
    this.getNoticias();
  }


  noticias: Noticias[] = []

  agregarNoticia() {
    this.router.navigate(['/noticias/crear']);
  }

  public eliminarNoticia(id: string): void {
    this.service.deleteNoticia(id).subscribe(() => {
      this.noticias = this.noticias.filter(noticia => noticia.id !== id);
    });
  }
}
