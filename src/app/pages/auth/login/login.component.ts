import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public appName: string = environment.appName;
  public formGroup = this.formBuilder.group({
    email: null,
    password: null,
  });

  constructor(private formBuilder: FormBuilder) {
    this.formGroup.controls.email.setValidators([
      Validators.required,
      Validators.email,
    ]);
    this.formGroup.controls.password.setValidators([Validators.required]);
  }

  public async onSubmit(): Promise<void> {
    await this.authenticate();
  }

  private async authenticate(): Promise<void> {
    const email    = this.formGroup.controls.email.getRawValue();
    const password = this.formGroup.controls.password.getRawValue();
    console.log(email);

  }
}
