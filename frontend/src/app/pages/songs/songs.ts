import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Song } from '../../services/song';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})
export class Songs implements OnInit {

  songs: any[] = [];
  keyword: string = '';

  isArtist: boolean = false;
  currentUsername: string | null = null;

  uploadTitle: string = '';
  uploadGenre: string = '';
  selectedAudio: File | null = null;
  selectedCover: File | null = null;

  constructor(
    private songService: Song,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  this.isArtist = this.auth.getUserRole() === 'ARTIST';
  this.currentUsername = this.auth.getUsername();
  this.loadSongs();
}

trackById(index: number, item: any) {
  return item.id;
}

  loadSongs() {
    this.songService.getAll().subscribe({
      next: (data) => {
        this.songs = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  search() {
    if (!this.keyword.trim()) {
      this.loadSongs();
      return;
    }

    this.songService.search(this.keyword)
      .subscribe(data => {
        this.songs = [...data];
        this.cdr.detectChanges();
      });
  }

  onAudioSelected(event: any) {
    this.selectedAudio = event.target.files[0];
  }

  onCoverSelected(event: any) {
    this.selectedCover = event.target.files[0];
  }

  deleteSong(id: number) {

  if (!confirm("Are you sure you want to delete this song?")) {
    return;
  }

  this.songService.delete(id)
    .subscribe({
      next: () => {

        this.songs = this.songs.filter(
          song => Number(song.id) !== Number(id)
        );
        this.loadSongs();

      },
      error: (err) => console.error(err)
    });
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
          this.uploadTitle = '';
          this.uploadGenre = '';
          this.selectedAudio = null;
          this.selectedCover = null;
          this.loadSongs();
        },
        error: (err) => console.error(err)
      });
  }
}