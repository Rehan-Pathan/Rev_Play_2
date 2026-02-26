import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Song } from '../../services/song';
import { Auth } from '../../services/auth';
import { Playlist } from '../../services/playlist';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})
export class Songs implements OnInit {

  songs: any[] = [];
  playlists: any[] = [];
  keyword: string = '';

  isArtist: boolean = false;
  currentUsername: string | null = null;
  isLoggedIn: boolean = false;

  selectedPlaylist: { [key: number]: number | null } = {};
  private playSessionMap = new Map<number, boolean>();

  message: string | null = null;
  isSuccess = true;

  constructor(
    private songService: Song,
    private auth: Auth,
    private playlistService: Playlist,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isArtist = this.auth.getUserRole() === 'ARTIST';
    this.currentUsername = this.auth.getUsername();

    this.loadSongs();

    if (this.isLoggedIn) {
      this.loadMyPlaylists();
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

  handlePlay(songId: number, audio: HTMLAudioElement) {

    if (this.playSessionMap.get(songId)) return;

    setTimeout(() => {

      if (!audio.paused && audio.currentTime >= 5) {

        this.songService.incrementPlayCount(songId).subscribe({
          next: () => {
            const song = this.songs.find(s => s.id === songId);
            if (song) {
              song.playCount++;
              this.cdr.detectChanges();
            }
          }
        });

        this.playSessionMap.set(songId, true);
      }

    }, 5000);
  }

  resetPlaySession(songId: number) {
    this.playSessionMap.set(songId, false);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  loadSongs() {
    this.songService.getAll().subscribe((data: any[]) => {
      this.songs = [...data];
      this.cdr.detectChanges();
    });
  }

  loadMyPlaylists() {
    this.playlistService.getMyPlaylists()
      .subscribe((data: any[]) => {
        this.playlists = [...data];
        this.cdr.detectChanges();
      });
  }

  search() {
    if (!this.keyword.trim()) {
      this.loadSongs();
      return;
    }

    this.songService.search(this.keyword)
      .subscribe((data: any[]) => {
        this.songs = [...data];
        this.cdr.detectChanges();
      });
  }

  deleteSong(id: number) {

    this.songService.delete(id).subscribe({
      next: () => {

        this.songs = this.songs.filter(song => song.id !== id);

        this.playlists.forEach(p => {
          p.songs = p.songs.filter((ps: any) => ps.song.id !== id);
        });

        this.showMessage("Song deleted successfully", true);
      },
      error: () => {
        this.showMessage("Failed to delete song", false);
      }
    });
  }

  addToPlaylist(songId: number) {

    const playlistId = this.selectedPlaylist[songId];

    if (!playlistId) {
      this.showMessage("Select a playlist first", false);
      return;
    }

    this.playlistService.addSong(playlistId, songId)
      .subscribe({
        next: () => {
          this.selectedPlaylist[songId] = null;
          this.showMessage("Song added to playlist!", true);
        },
        error: () => {
          this.showMessage("Failed to add song", false);
        }
      });
  }

  
}