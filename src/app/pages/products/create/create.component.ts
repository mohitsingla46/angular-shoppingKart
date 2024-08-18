import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app.services';
import { HeaderComponent } from 'src/app/shared/components/layouts/header/header.component';
import { SidebarComponent } from 'src/app/shared/components/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  appService = inject(AppService);
  router = inject(Router);
  toastr = inject(ToastrService);

  categories = null;
  addProductForm!: FormGroup;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      category: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      inStock: new FormControl('', Validators.required)
    });
    this.appService.categoryList().subscribe((res) => {
      if (res.status === 200) {
        this.categories = res.data;
      }
    });
  }

  addProduct() {
    const product = {
      category_id: this.addProductForm.get('category')?.value,
      name: this.addProductForm.get('name')?.value,
      description: this.addProductForm.get('description')?.value,
      price: this.addProductForm.get('price')?.value,
      inStock: this.convertToBoolean(this.addProductForm.get('inStock')?.value)
    };
    this.appService.addProduct(product)
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.toastr.success('Product has been added successfully!');
            this.router.navigate(['/products/index']);
          } else {
            this.toastr.error(response.error);
          }
        },
        error: (error) => {
          this.toastr.error("Something went wrong at our end. Please try again later.");
        }
      });
  }

  onCancel() {
    this.router.navigate(['/products/index']);
  }

  convertToBoolean(value: any): boolean {
    if (value === '1') {
      return true;
    } else {
      return false;
    }
  }
}
