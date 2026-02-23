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

    if (!confirm("Are you sure you want to delete this song?")) return;

    this.songService.delete(id).subscribe(() => {

      this.songs = this.songs.filter(song => song.id !== id);

      this.playlists.forEach(p => {
        p.songs = p.songs.filter((ps: any) => ps.song.id !== id);
      });

      this.cdr.detectChanges();
    });
  }

  addToPlaylist(songId: number) {

    const playlistId = this.selectedPlaylist[songId];

    if (!playlistId) return;

    this.playlistService.addSong(playlistId, songId)
      .subscribe(() => {

        this.selectedPlaylist[songId] = null;
        alert("Song added to playlist!");

       
      });
  }
}