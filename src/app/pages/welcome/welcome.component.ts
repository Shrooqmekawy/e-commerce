import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  constructor() {}
  private router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000);
  }
}
