import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from 'src/app/core/services/app.services';
import { HeaderComponent } from 'src/app/shared/components/layouts/header/header.component';
import { SidebarComponent } from 'src/app/shared/components/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  appService = inject(AppService);
  productList = null;
  ngOnInit(): void {
    this.appService.productList().subscribe((res) => {
      if(res.status === 200){
        this.productList = res.data;
      }
    });
  }
}
