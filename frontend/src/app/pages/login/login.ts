import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm;
  message: string | null = null;
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.auth.login(this.loginForm.value)
      .subscribe({
        next: () => {

          this.isSuccess = true;
          this.message = "Login successful! Redirecting...";

          this.cdr.detectChanges(); // 🔥 force UI update

          setTimeout(() => {
            this.router.navigate(['/songs']);
          }, 1200);
        },
        error: () => {

          this.isSuccess = false;
          this.message = "Login failed. Please check your credentials.";

          this.cdr.detectChanges(); // 🔥 immediate UI update

          setTimeout(() => {
            this.message = null;
            this.cdr.detectChanges(); // 🔥 clear UI
          }, 3000);
        }
      });
  }
}