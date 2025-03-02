import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appChangeicon]',
  standalone: true,
})
export class ChangeiconDirective implements AfterViewInit {
  @Input() itemId!: string;
  private isActive: boolean = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.isActive = localStorage.getItem(`icon-${this.itemId}`) === 'true';
    this.updateIcon();
  }

  @HostListener('click') toggleIcon() {
    this.isActive = !this.isActive;
    localStorage.setItem(`icon-${this.itemId}`, this.isActive.toString());
    this.updateIcon();
  }

  private updateIcon() {
    this.el.nativeElement.classList.toggle('text-red-700', this.isActive);
    this.el.nativeElement.classList.toggle('fa-solid', this.isActive);
    this.el.nativeElement.classList.toggle('fa-regular', !this.isActive);
  }
}
