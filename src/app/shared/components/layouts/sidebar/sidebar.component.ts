import { Component } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  appName: string = environment.appName;

}
