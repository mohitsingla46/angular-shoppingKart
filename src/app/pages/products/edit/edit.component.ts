import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app.services';
import { HeaderComponent } from 'src/app/shared/components/layouts/header/header.component';
import { SidebarComponent } from 'src/app/shared/components/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgClass, NgIf, NgFor],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  id!: string;

  appService = inject(AppService);
  router = inject(Router);
  toastr = inject(ToastrService);

  categories = null;
  editProductForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.editProductForm = new FormGroup({
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
    this.id = this.route.snapshot.params['id'];
    this.appService.productDetails(this.id).subscribe({
      next: (resonse) => {
        if (resonse.status === 200) {
          this.editProductForm.patchValue({
            category: resonse.data.category._id,
            name: resonse.data.name,
            price: resonse.data.price,
            description: resonse.data.description,
            inStock: this.convertToString(resonse.data.inStock)
          });
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong at our end. Please try again");
      }
    });
  }

  editProduct() {
    const product = {
      category_id: this.editProductForm.get('category')?.value,
      name: this.editProductForm.get('name')?.value,
      description: this.editProductForm.get('description')?.value,
      price: this.editProductForm.get('price')?.value,
      inStock: this.convertToBoolean(this.editProductForm.get('inStock')?.value)
    };
    this.appService.updateProduct(this.id, product)
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.toastr.success('Product has been updated successfully!');
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

  convertToString(value: any): string {
    if (value === true) {
      return '1';
    } else {
      return '0';
    }
  }

  convertToBoolean(value: any): boolean {
    if (value === '1') {
      return true;
    } else {
      return false;
    }
  }
}
