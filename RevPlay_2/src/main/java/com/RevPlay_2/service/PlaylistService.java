package com.RevPlay_2.service;

import com.RevPlay_2.entity.Playlist;
import com.RevPlay_2.entity.PlaylistSong;
import com.RevPlay_2.entity.Song;
import com.RevPlay_2.entity.User;
import com.RevPlay_2.repository.PlaylistRepository;
import com.RevPlay_2.repository.PlaylistSongRepository;
import com.RevPlay_2.repository.SongRepository;
import com.RevPlay_2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final PlaylistSongRepository playlistSongRepository;
    private final SongRepository songRepository;
    private final UserRepository userRepository;

    // ✅ Create Playlist
    public Playlist createPlaylist(String username, String name) {

        User user = userRepository.findByUsername(username).orElseThrow();

        Playlist playlist = Playlist.builder()
                .name(name)
                .user(user)
                .build();

        return playlistRepository.save(playlist);
    }

    // ✅ Add Song to Playlist (prevent duplicates)
    public void addSongToPlaylist(Long playlistId, Long songId) {

        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow();
        Song song = songRepository.findById(songId).orElseThrow();

        boolean alreadyExists = playlistSongRepository
                .findByPlaylistId(playlistId)
                .stream()
                .anyMatch(ps -> ps.getSong().getId().equals(songId));

        if (alreadyExists) {
            throw new RuntimeException("Song already in playlist");
        }

        PlaylistSong ps = PlaylistSong.builder()
                .playlist(playlist)
                .song(song)
                .build();

        playlistSongRepository.save(ps);
    }

    // ✅ Get Songs in Playlist
    public List<Song> getSongsInPlaylist(Long playlistId) {

        return playlistSongRepository
                .findByPlaylistId(playlistId)
                .stream()
                .map(PlaylistSong::getSong)
                .collect(Collectors.toList());
    }

    // ✅ Remove Song from Playlist
    public void removeSongFromPlaylist(Long playlistId, Long songId) {

        PlaylistSong ps = playlistSongRepository
                .findByPlaylistId(playlistId)
                .stream()
                .filter(p -> p.getSong().getId().equals(songId))
                .findFirst()
                .orElseThrow();

        playlistSongRepository.delete(ps);
    }

    public void deletePlaylist(Long playlistId, String username) {

        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow();

        if (!playlist.getUser().getUsername().equals(username)) {
            throw new RuntimeException("You can only delete your own playlist");
        }

        playlistRepository.delete(playlist);
    }

    public List<Playlist> getUserPlaylists(String username) {
        return playlistRepository.findByUserUsername(username);
    }
}
