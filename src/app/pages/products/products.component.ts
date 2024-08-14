import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AppService } from 'src/app/core/services/app.services';
import { HeaderComponent } from 'src/app/shared/components/layouts/header/header.component';
import { SidebarComponent } from 'src/app/shared/components/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
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
