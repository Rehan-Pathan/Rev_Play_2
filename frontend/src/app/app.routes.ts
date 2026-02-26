import { Routes } from '@angular/router';
import { Trending } from './pages/trending/trending';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Songs } from './pages/songs/songs';
import { Playlists } from './pages/playlists/playlists';
import { Profile } from './pages/profile/profile';
import { Upload } from './pages/upload/upload';

export const routes: Routes = [
  { path: '', redirectTo: 'songs', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'songs', component: Songs },
  { path: 'playlists', component: Playlists },
  { path: 'upload', component: Upload },
  { 
    path: 'profile', 
    component: Profile
      
  },
  {
    path: 'trending',
    component: Trending
  }
];