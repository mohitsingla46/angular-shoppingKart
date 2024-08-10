import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/layouts/sidebar/sidebar.component";
import { HeaderComponent } from "../../shared/components/layouts/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
