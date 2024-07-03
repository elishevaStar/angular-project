// direction.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  private directionSubject = new BehaviorSubject<string>('ltr');
  direction$ = this.directionSubject.asObservable();
//   directionObservable$: Observable<string> = this.directionSubject.asObservable();


  setDirection(direction: string) {
    console.log('Setting direction to:', direction);
    document.documentElement.dir = direction; // משנה את כיוון כל הדף
    if (direction === 'ltr') {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    } else {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    }
    this.directionSubject.next(direction);
  }
}



//   setDirection(direction: string) {
//     this.directionSubject.next(direction);
//   }
// }
