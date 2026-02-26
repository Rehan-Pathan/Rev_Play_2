package com.RevPlay_2.controller;

import com.RevPlay_2.entity.Song;
import com.RevPlay_2.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/songs")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<Song> uploadSong(
            Authentication authentication,
            @RequestParam String title,
            @RequestParam String genre,
            @RequestPart MultipartFile audio,
            @RequestPart MultipartFile cover
    ) throws Exception  {

        String username = authentication.getName();

        Song song = songService.uploadSong(username, title, genre, audio, cover);

        return ResponseEntity.ok(song);
    }

    @GetMapping
    public List<Song> getAllSongs() {
        return songService.getAllSongs();
    }

    @GetMapping("/search")
    public List<Song> search(@RequestParam String keyword) {
        return songService.search(keyword);
    }

    @PostMapping("/play/{id}")
    public ResponseEntity<?> play(@PathVariable Long id) {
        songService.incrementPlay(id);
        return ResponseEntity.ok(
                Map.of("message", "Play count incremented")
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSong(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String username = authentication.getName();
        songService.deleteSong(id, username);
        return ResponseEntity.ok(Map.of("message","Song deleted successfully"));
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Song>> trending() {
        return ResponseEntity.ok(songService.getTrendingSongs());
    }
}