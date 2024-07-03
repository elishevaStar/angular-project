// direction.directive.ts
import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { DirectionService } from './direction.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appDirection]'
})
export class DirectionDirective implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private directionService: DirectionService
  ) {}

  ngOnInit() {
    this.subscription = this.directionService.direction$.subscribe(direction => {
      console.log('Direction changed to:', direction);
      if (direction === 'ltr') {
        this.renderer.setAttribute(this.el.nativeElement, 'dir', 'ltr');
        this.renderer.addClass(this.el.nativeElement, 'ltr');
        this.renderer.removeClass(this.el.nativeElement, 'rtl');
      } else {
        this.renderer.setAttribute(this.el.nativeElement, 'dir', 'rtl');
        this.renderer.addClass(this.el.nativeElement, 'rtl');
        this.renderer.removeClass(this.el.nativeElement, 'ltr');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
