import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Playlist } from '../../services/playlist';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlists.html',
  styleUrl: './playlists.css'
})
export class Playlists implements OnInit {

  playlistName: string = '';
  playlists: any[] = [];
  selectedPlaylist: any = null;
  isLoggedIn: boolean = false;

  message: string | null = null;
  isSuccess = true;

  constructor(
    private playlistService: Playlist,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();

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

  loadMyPlaylists() {
    this.playlistService.getMyPlaylists()
      .subscribe((data: any[]) => {
        this.playlists = [...data];
        this.cdr.detectChanges();
      });
  }

  createPlaylist() {

    if (!this.playlistName.trim()) {
      this.showMessage("Enter playlist name", false);
      return;
    }

    this.playlistService.create(this.playlistName)
      .subscribe({
        next: () => {
          this.playlistName = '';
          this.loadMyPlaylists();
          this.showMessage("Playlist created", true);
        },
        error: () => {
          this.showMessage("Failed to create playlist", false);
        }
      });
  }

  selectPlaylist(p: any) {
    this.selectedPlaylist = p;
    this.cdr.detectChanges();
  }

  removeSong(songId: number) {

    if (!this.selectedPlaylist) return;

    this.playlistService
      .removeSong(this.selectedPlaylist.id, songId)
      .subscribe({
        next: () => {
          this.selectedPlaylist.songs =
            this.selectedPlaylist.songs
              .filter((ps: any) => ps.song.id !== songId);

          this.showMessage("Song removed", true);
        },
        error: () => {
          this.showMessage("Failed to remove song", false);
        }
      });
  }

  deletePlaylist(id: number) {

    this.playlistService.deletePlaylist(id)
      .subscribe({
        next: () => {

          this.playlists =
            this.playlists.filter(p => p.id !== id);

          if (this.selectedPlaylist?.id === id) {
            this.selectedPlaylist = null;
          }

          this.showMessage("Playlist deleted", true);
        },
        error: () => {
          this.showMessage("Failed to delete playlist", false);
        }
      });
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}