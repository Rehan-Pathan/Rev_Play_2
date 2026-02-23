package com.RevPlay_2.controller;

import com.RevPlay_2.entity.Playlist;
import com.RevPlay_2.entity.Song;
import com.RevPlay_2.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/playlists")
@RequiredArgsConstructor
public class PlaylistController {

    private final PlaylistService playlistService;

    // ✅ Create Playlist
    @PostMapping("/create")
    public ResponseEntity<Playlist> createPlaylist(
            Authentication authentication,
            @RequestParam String name
    ) {
        String username = authentication.getName();
        Playlist playlist = playlistService.createPlaylist(username, name);
        return ResponseEntity.ok(playlist);
    }

    // ✅ Add Song to Playlist
    @PostMapping("/{playlistId}/add/{songId}")
    public ResponseEntity<?> addSong(
            @PathVariable Long playlistId,
            @PathVariable Long songId
    ) {
        playlistService.addSongToPlaylist(playlistId, songId);
        return ResponseEntity.ok(Map.of("message" ,"Song added to playlist"));
    }

    // ✅ Get Songs in Playlist
    @GetMapping("/{playlistId}")
    public ResponseEntity<List<Song>> getSongs(
            @PathVariable Long playlistId
    ) {
        return ResponseEntity.ok(
                playlistService.getSongsInPlaylist(playlistId)
        );
    }

    @GetMapping("/my")
    public ResponseEntity<List<Playlist>> getMyPlaylists(Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                playlistService.getUserPlaylists(username)
        );
    }

    // ✅ Remove Song from Playlist
    @DeleteMapping("/{playlistId}/remove/{songId}")
    public ResponseEntity<?> removeSong(
            @PathVariable Long playlistId,
            @PathVariable Long songId
    ) {
        playlistService.removeSongFromPlaylist(playlistId, songId);
        return ResponseEntity.ok(Map.of("message","Song removed from playlist"));
    }

    @DeleteMapping("/{playlistId}")
    public ResponseEntity<?> deletePlaylist(
            @PathVariable Long playlistId,
            Authentication authentication
    ) {
        String username = authentication.getName();

        playlistService.deletePlaylist(playlistId, username);

        return ResponseEntity.ok(Map.of("message","Playlist deleted successfully"));
    }
}
