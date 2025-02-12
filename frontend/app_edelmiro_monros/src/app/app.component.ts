import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvisoLegalComponent } from "./views/aviso-legal/aviso-legal.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AvisoLegalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app_edelmiro_monros';
}
