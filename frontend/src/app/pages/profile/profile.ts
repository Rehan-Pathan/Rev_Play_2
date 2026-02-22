import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: any = null;
  selectedFile: File | null = null;

  constructor(
    private userService: User,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getMe()
      .subscribe({
        next: (data) => {
          this.user = data;

          // 🔥 force Angular to render immediately
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadProfile() {

    if (!this.selectedFile) {
      alert("Select image");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.userService.uploadProfile(formData)
      .subscribe({
        next: () => {
          this.loadProfile();  // reload data
        },
        error: (err) => console.error(err)
      });
  }
}