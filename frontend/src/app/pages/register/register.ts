import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm;

  message: string | null = null;
  isSuccess = true;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      role: ['USER']
    });
  }

  showMessage(msg: string, success: boolean) {
    this.message = msg;
    this.isSuccess = success;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.message = null;
      this.cdr.detectChanges();
    }, 3000);
  }

  onSubmit() {
    this.auth.register(this.registerForm.value)
      .subscribe({
        next: () => {

          this.showMessage('User Registered Successfully! Redirecting...', true);

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1200);

        },
        error: () => {

          this.showMessage('Registration Failed. Please try again.', false);

        }
      });
  }
}