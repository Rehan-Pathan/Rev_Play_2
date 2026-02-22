import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class User {

  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getMe() {
    return this.http.get<any>(this.baseUrl + '/me');
  }

  uploadProfile(formData: FormData) {
    return this.http.post<any>(
      this.baseUrl + '/upload-profile',
      formData
    );
  }
}