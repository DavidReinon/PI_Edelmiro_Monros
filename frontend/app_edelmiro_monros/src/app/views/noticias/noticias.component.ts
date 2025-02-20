import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardNoticiasComponent } from '../../components/card-noticias/card-noticias.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  foto: string | null;
}

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CardNoticiasComponent, CommonModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})

export class NoticiasComponent {
  public isAdmin$!: Observable<boolean>;
  public noticias: Noticia[] = [
    {
      id: 1,
      titulo: "Operativo especial contra la pirotecnia ilegal durante las Fallas 2025",
      descripcion: "La delegada del Gobierno, Pilar Bernabé, y la alcaldesa de València, María José Catalá, han anunciado un operativo especial para combatir la venta y uso de pirotecnia ilegal durante las próximas festividades falleras.",
      fecha: new Date("2025-02-19"),
      foto: "https://cadenaser.com/resizer/2df86r3gfrrqghcpirotecnia_fallas.jpg"
    },
    {
      id: 2,
      titulo: "Pirotecnia Valenciana iluminará las Fallas de València con 'L'Albà'",
      descripcion: "La empresa familiar Pirotecnia Valenciana, de Llanera de Ranes, será la encargada de disparar 'L'Albà de les Falles', un espectáculo de fuegos artificiales en honor a las falleras mayores.",
      fecha: new Date("2025-02-19"),
      foto: "https://cadenaser.com/resizer/3fdt53gft43fwa_lalba_fallas.jpg"
    },
    {
      id: 3,
      titulo: "Torrent muestra a la mujer a través de la indumentaria tradicional",
      descripcion: "L'Espai Sant Gregori de Torrent acoge, del 20 de febrero al 22 de marzo, una exposición que destaca la figura de la mujer en la indumentaria tradicional valenciana.",
      fecha: new Date("2025-02-18"),
      foto: "https://www.levante-emv.com/resizer/8jh45ghj3indumentaria_tradicional_torrent.jpg"
    },
    {
      id: 4,
      titulo: "Exposición solidaria de indumentaria valenciana recauda 40.000 euros",
      descripcion: "Una exposición organizada por las Falleras Mayores de València ha recaudado 40.000 euros para las fallas afectadas por la DANA.",
      fecha: new Date("2025-02-06"),
      foto: "https://www.eldiario.es/resizer/234jkg45exposicion_indumentaria_valenciana.jpg"
    },
    {
      id: 5,
      titulo: "Inaugurada la exposición solidaria de indumentaria valenciana en el Parador So Nelo",
      descripcion: "El Parador So Nelo ha inaugurado una exposición que reúne 70 trajes y 9 bandas, representando la historia reciente de la indumentaria fallera.",
      fecha: new Date("2025-01-30"),
      foto: "https://www.elperiodic.com/resizer/384hg4h5expo_indumentaria_parador.jpg"
    }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin$;
    this.isAdmin$.subscribe(isAdmin => {
      console.log('isAdmin:', isAdmin);
    });
  }

  agregarNoticia() {
    this.router.navigate(['/noticias/crear']);
  }

  eliminarNoticia(id: number) {
    this.noticias = this.noticias.filter((noticia) => noticia.id !== id);
  }
}
  