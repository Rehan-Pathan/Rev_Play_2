# 🎵 RevPlay - Music Streaming Platform

RevPlay is a **full-stack music streaming application** where **artists upload songs** and **users listen, search, and organize music through playlists**.

The project demonstrates **REST API development with Spring Boot** and a **Single Page Application (SPA) frontend using Angular**.

---

# 🚀 Technology Stack

## Backend
- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA / Hibernate
- MySQL
- Lombok
- Swagger / OpenAPI

## Frontend
- Angular
- TypeScript
- Bootstrap
- RxJS
- Angular Router
- Angular Forms

## Tools
- Maven
- Git / GitHub
- Swagger UI

---

# 🏗 System Architecture


Angular Frontend (SPA)
│
│ HTTP REST APIs
▼
Spring Boot Backend
│
│ JPA / Hibernate
▼
MySQL Database
│
▼
File Storage (uploads folder)


---

# 🗄 Database Design



## User
Represents both artists and listeners.

Fields:

id
username
email
password
role (USER / ARTIST)
profileImagePath


---

## Song
Represents music uploaded by artists.

Fields:

id
title
genre
audioPath
coverImagePath
playCount
artist_id


---

## Playlist
Represents a collection of songs created by users.

Fields:

id
name
user_id


---

## PlaylistSong
Join table connecting playlists and songs.

Fields:

id
playlist_id
song_id


---

# ✨ Key Features

## 🔐 Authentication
- User registration
- User login
- JWT token authentication
- Role-based authorization

---

## 🎤 Artist Features
Artists can:

- Upload songs
- Upload song cover images
- Delete songs they uploaded
- Manage their music

---

## 🎧 User Features
Users can:

- Browse songs
- Play songs
- Search songs by title or genre
- Create playlists
- Add songs to playlists
- Remove songs from playlists
- Delete playlists

---

## 👤 Profile Features
Users can:

- Upload profile images
- View their profile
- Access their playlists

---

# 📡 REST API Endpoints

## Authentication


POST /auth/register
POST /auth/login


---

## User


GET /users/me
POST /users/upload-profile


---

## Songs


GET /songs
GET /songs/search
POST /songs/upload
POST /songs/play/{id}
DELETE /songs/{id}


---

## Playlists


POST /playlists/create
GET /playlists/{playlistId}
POST /playlists/{playlistId}/add/{songId}
DELETE /playlists/{playlistId}/remove/{songId}
DELETE /playlists/{playlistId}


---

# 🖥 Frontend Pages

The Angular frontend includes the following pages:

### Authentication
- Login
- Register

### Music
- Songs page
- Song search
- Audio player

### Playlists
- Create playlist
- View playlist songs
- Add/remove songs

### Profile
- Upload profile image
- View profile details

---

# ⚙️ Running the Project

## 1️⃣ Backend Setup

Navigate to the backend folder and run:


Backend runs at:

http://localhost:8080

Swagger API documentation:

http://localhost:8080/swagger-ui.html
2️⃣ Frontend Setup

Navigate to the frontend folder.

Install dependencies:

npm install

Run Angular:

ng serve

Frontend runs at:

http://localhost:4200
📂 Project Structure
RevPlay
│
├── RevPlay_2 (Backend)
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── security
│   └── config
│
├── frontend
│   ├── pages
│   ├── services
│   ├── components
│   └── routing
│
└── uploads

⚠️ Challenges Faced

Handling JWT authentication in Angular

Managing file uploads (audio and images)

Resolving CORS issues between Angular and Spring Boot

Handling JSON parsing errors in Angular when backend returned plain text

Managing database relationships for playlists and songs

Updating Angular UI using Change Detection

📚 Key Learnings

This project strengthened understanding of:

Full-stack application architecture

REST API design

Spring Security with JWT

Angular services and HTTP client

Database relationships using JPA

File upload handling

SPA routing and state updates

🏁 Conclusion

RevPlay demonstrates a complete music streaming platform prototype built using modern web technologies.

The system integrates secure authentication, REST APIs, file uploads, database relationships, and a responsive Angular interface to allow artists to upload music and users to listen and manage playlists.

👨‍💻 Author

Rehan Pathan

---




