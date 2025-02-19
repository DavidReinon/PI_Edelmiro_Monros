import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  constructor(private mapService: MapService) { }

  
}
