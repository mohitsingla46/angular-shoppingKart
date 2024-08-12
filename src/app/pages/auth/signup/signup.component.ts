import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app.services';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  appName: string = environment.appName;
  signupForm!: FormGroup;
  errorMessage: string | null = null;

  router = inject(Router);
  toastr = inject(ToastrService);
  appService = inject(AppService);

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  public async onSubmit(): Promise<void> {
    const name = this.signupForm.get('name')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const role = this.signupForm.get('role')?.value;

    this.appService.signup(name, email, password, role)
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.toastr.success('Your account has been created successfully!');
            this.router.navigate(['/']);
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
