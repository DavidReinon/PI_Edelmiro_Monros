import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rating-star',
  standalone: true,
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.css']
})
export class RatingStarComponent implements OnChanges {
  @Input() rating: number = 0; 
  stars: string[] = [];

  ngOnChanges() {
    this.updateStars();
  }

  private updateStars() {
    this.stars = Array(5).fill('bi bi-star'); 

    for (let i = 0; i < Math.floor(this.rating); i++) {
      this.stars[i] = 'bi bi-star-fill'; 
    }

    if (this.rating % 1 !== 0) {
      this.stars[Math.floor(this.rating)] = 'bi bi-star-half'; 
    }
  }
}
