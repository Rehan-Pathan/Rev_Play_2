import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Song } from '../../services/song';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending.html',
  styleUrl: './trending.css'
})
export class Trending implements OnInit {

  songs: any[] = [];
  private playSessionMap = new Map<number, boolean>();

  constructor(
    private songService: Song,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTrending();
  }

  loadTrending() {
    this.songService.getTrendingSongs().subscribe({
      next: (data) => {
        this.songs = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to load trending songs", err);
      }
    });
  }

  handlePlay(songId: number, audio: HTMLAudioElement) {

    if (this.playSessionMap.get(songId)) return;

    setTimeout(() => {

      if (!audio.paused && audio.currentTime >= 5) {

        this.songService.incrementPlayCount(songId).subscribe({
          next: () => {
            this.loadTrending(); // reload sorted list
          }
        });

        this.playSessionMap.set(songId, true);
      }

    }, 5000);
  }

  resetPlaySession(songId: number) {
    this.playSessionMap.set(songId, false);
  }

}