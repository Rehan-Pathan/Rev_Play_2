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

  loadMyPlaylists() {
    this.playlistService.getMyPlaylists()
      .subscribe((data: any[]) => {
        this.playlists = [...data];
        this.cdr.detectChanges();
      });
  }

  createPlaylist() {

    if (!this.playlistName.trim()) return;

    this.playlistService.create(this.playlistName)
      .subscribe(() => {

        this.playlistName = '';
        this.loadMyPlaylists();
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
      .subscribe(() => {

        this.selectedPlaylist.songs =
          this.selectedPlaylist.songs
            .filter((ps: any) => ps.song.id !== songId);

        this.cdr.detectChanges();
      });
  }

  deletePlaylist(id: number) {

    this.playlistService.deletePlaylist(id)
      .subscribe(() => {

        this.playlists =
          this.playlists.filter(p => p.id !== id);

        if (this.selectedPlaylist?.id === id) {
          this.selectedPlaylist = null;
        }

        this.cdr.detectChanges();
      });
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}