import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/services/app.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  appService = inject(AppService);
  router = inject(Router);

  logout() {
    this.appService.logout();
    this.router.navigate(['/']);
  }

}
