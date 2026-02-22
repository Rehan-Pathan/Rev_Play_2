import { Component } from '@angular/core';
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

  constructor(
    private songService: Song,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.auth.getUserRole() !== 'ARTIST') {
      this.router.navigate(['/songs']);
    }
  }

  onAudioSelected(event: any) {
    this.selectedAudio = event.target.files[0];
  }

  onCoverSelected(event: any) {
    this.selectedCover = event.target.files[0];
  }

  uploadSong() {

    if (!this.selectedAudio || !this.selectedCover) {
      alert("Select audio and cover file");
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
          alert("Song Uploaded Successfully");
          this.router.navigate(['/songs']);
        },
        error: (err) => console.error(err)
      });
  }
}
