package com.RevPlay_2.service;

import com.RevPlay_2.entity.Role;
import com.RevPlay_2.entity.Song;
import com.RevPlay_2.entity.User;
import com.RevPlay_2.repository.SongRepository;
import com.RevPlay_2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public Song uploadSong(String username,
                           String title,
                           String genre,
                           MultipartFile audio,
                           MultipartFile cover) throws Exception {

        User artist = userRepository.findByUsername(username).orElseThrow();

        if (artist.getRole() != Role.ARTIST) {
            throw new RuntimeException("Only ARTIST can upload songs");
        }

        String audioPath = fileStorageService.saveFile(audio, "songs");
        String coverPath = fileStorageService.saveFile(cover, "covers");

        Song song = Song.builder()
                .title(title)
                .genre(genre)
                .audioPath(audioPath)
                .coverImagePath(coverPath)
                .playCount(0)
                .artist(artist)
                .build();

        return songRepository.save(song);
    }

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public List<Song> search(String keyword) {
        return songRepository.findByTitleContainingIgnoreCaseOrGenreContainingIgnoreCase(keyword, keyword);
    }

    public void incrementPlay(Long songId) {
        Song song = songRepository.findById(songId).orElseThrow();
        song.setPlayCount(song.getPlayCount() + 1);
        songRepository.save(song);
    }

    public void deleteSong(Long songId, String username) {

        Song song = songRepository.findById(songId).orElseThrow();

        // Only the artist who uploaded it can delete
        if (!song.getArtist().getUsername().equals(username)) {
            throw new RuntimeException("You can only delete your own songs");
        }

        songRepository.delete(song);
    }

    public List<Song> getTrendingSongs() {
        return songRepository.findAllByOrderByPlayCountDesc(PageRequest.of(0, 10));
    }
}