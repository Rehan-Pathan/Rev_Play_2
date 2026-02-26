import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Song } from '../../services/song';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {

  uploadTitle: string = '';
  uploadGenre: string = '';
  selectedAudio: File | null = null;
  selectedCover: File | null = null;

  message: string | null = null;
  isSuccess = true;

  constructor(
    private songService: Song,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.auth.getUserRole() !== 'ARTIST') {
      this.router.navigate(['/songs']);
    }
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

  onAudioSelected(event: any) {
    this.selectedAudio = event.target.files[0];
  }

  onCoverSelected(event: any) {
    this.selectedCover = event.target.files[0];
  }

  uploadSong() {

    if (!this.selectedAudio || !this.selectedCover) {
      this.showMessage("Select audio and cover file", false);
      return;
    }

    const formData = new FormData();
    formData.append('title', this.uploadTitle);
    formData.append('genre', this.uploadGenre);
    formData.append('audio', this.selectedAudio);
    formData.append('cover', this.selectedCover);

    this.songService.upload(formData)
      .subscribe({
        next: () => {

          this.showMessage("Song Uploaded Successfully", true);

          setTimeout(() => {
            this.router.navigate(['/songs']);
          }, 1200);

        },
        error: () => {
          this.showMessage("Upload failed. Try again.", false);
        }
      });
  }
}