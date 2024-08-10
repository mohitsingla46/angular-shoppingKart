import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  appName: string = environment.appName;
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  router = inject(Router);
  toastr = inject(ToastrService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  public async onSubmit(): Promise<void> {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.signin(email, password)
    .subscribe({
      next: (response) => {
        if(response.status === 200){
          this.toastr.success('You are logged in successfully!');
          this.router.navigate(['/home']);
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
