import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DirectionService } from '../direction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentDirection!: string;

  constructor(private _router: Router, private directionService: DirectionService) {
    this.directionService.direction$.subscribe(direction => {
      this.currentDirection = direction;
    });
  }

  goToAbsences() {
    this._router.navigate(["/absence"]);
  }

  setDirection(direction: string) {
    console.log('Button clicked, setting direction to:', direction);
    this.directionService.setDirection(direction);
  }
}
