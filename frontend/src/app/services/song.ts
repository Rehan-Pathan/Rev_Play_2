import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Song {

  private baseUrl = 'http://localhost:8080/songs';

  private playCountUpdated = new Subject<number>();
  playCountUpdated$ = this.playCountUpdated.asObservable();

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }

  search(keyword: string) {
    return this.http.get<any[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }
  incrementPlayCount(songId: number): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/play/${songId}`,
    {}
  ).pipe(
    tap(() => this.playCountUpdated.next(songId))
  );
}

  upload(formData: FormData) {
    return this.http.post(this.baseUrl + '/upload', formData);
  }

  getTrendingSongs(): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.baseUrl}/trending`
  );
}

  delete(id: number) {
  return this.http.delete(this.baseUrl + '/' + id);
}
}