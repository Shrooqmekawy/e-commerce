import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangetypepass]',
})
export class ChangetypepassDirective {
  private isPasswordVisible = false;

  constructor(private el: ElementRef) {}

  @HostListener('click') togglePassword() {
    const input = this.el.nativeElement.previousElementSibling;
    if (input && input.tagName === 'INPUT') {
      this.isPasswordVisible = !this.isPasswordVisible;
      input.type = this.isPasswordVisible ? 'text' : 'password';
    }
  }
}
