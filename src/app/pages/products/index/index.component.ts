import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app.services';
import { HeaderComponent } from 'src/app/shared/components/layouts/header/header.component';
import { SidebarComponent } from 'src/app/shared/components/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, RouterLink, FontAwesomeModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  appService = inject(AppService);
  toastr = inject(ToastrService);

  productList = null;
  faEdit = faEdit;
  faTrash = faTrash;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.appService.productList().subscribe((res) => {
      if (res.status === 200) {
        this.productList = res.data;
      }
    });
  }

  deleteProduct(product_id: string) {
    this.appService.deleteProduct(product_id).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.toastr.success('Product has been deleted successfully!');
          this.getProducts();
        } else {
          this.toastr.error(response.error);
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong at our end. Please try again later.");
      }
    });
  }
}
