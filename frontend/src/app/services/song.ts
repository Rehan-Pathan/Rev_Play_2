import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Song {

  private baseUrl = 'http://localhost:8080/songs';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }

  search(keyword: string) {
    return this.http.get<any[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }

  upload(formData: FormData) {
    return this.http.post(this.baseUrl + '/upload', formData);
  }

  delete(id: number) {
  return this.http.delete(this.baseUrl + '/' + id);
}
}