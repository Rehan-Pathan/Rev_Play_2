import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Playlist {

  private baseUrl = 'http://localhost:8080/playlists';

  constructor(private http: HttpClient) {}

  create(name: string) {
  return this.http.post(
    `http://localhost:8080/playlists/create?name=${name}`,
    {}
  );
  }

  getMyPlaylists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addSong(playlistId: number, songId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${playlistId}/add/${songId}`, {});
  }

  removeSong(playlistId: number, songId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${playlistId}/remove/${songId}`);
  }

  deletePlaylist(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}