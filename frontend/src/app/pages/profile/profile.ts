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

  message: string | null = null;
  isSuccess = true;

  constructor(
    private userService: User,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  showMessage(msg: string, success: boolean) {
    this.message = msg;
    this.isSuccess = success;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.message = null;
      this.cdr.detectChanges();
    }, 2500);
  }

  loadProfile() {
    this.userService.getMe()
      .subscribe({
        next: (data) => {
          this.user = data;
          this.cdr.detectChanges();
        },
        error: () => {
          this.showMessage('Failed to load profile', false);
        }
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadProfile() {

    if (!this.selectedFile) {
      this.showMessage("Please select an image first", false);
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.userService.uploadProfile(formData)
      .subscribe({
        next: () => {
          this.showMessage('Profile image updated successfully', true);
          this.loadProfile();
        },
        error: () => {
          this.showMessage('Upload failed', false);
        }
      });
  }
}