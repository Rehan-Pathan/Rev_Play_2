import { Component } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      role: ['USER']
    });
  }

  onSubmit() {
    this.auth.register(this.registerForm.value)
      .subscribe({
        next: (response) => {
          console.log('Registered:', response);
          alert('User Registered Successfully');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          alert('Registration Failed');
        }
      });
  }
}