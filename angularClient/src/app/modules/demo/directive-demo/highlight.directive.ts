import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[appHightLight]"
})
export class HighLightDirective implements OnInit {
  @Input() appHightLight?: string;
  @HostBinding("[attr.id]") ud: number = 1;

  constructor(private _el: ElementRef) {
    console.log("highlight");
  }

  ngOnInit(): void {
    // this._el.nativeElement.style.backgroundColor = this.appHightLight || "yellow";
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    this._el.nativeElement.style.backgroundColor = this.appHightLight || "yellow";
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this._el.nativeElement.style.backgroundColor = null;
  }
}
