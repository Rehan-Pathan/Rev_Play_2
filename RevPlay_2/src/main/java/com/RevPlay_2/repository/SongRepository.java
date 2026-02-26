package com.RevPlay_2.repository;

import com.RevPlay_2.entity.Song;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {

    List<Song> findByTitleContainingIgnoreCase(String keyword);
    List<Song> findByTitleContainingIgnoreCaseOrGenreContainingIgnoreCase(
            String title,
            String genre
    );

    List<Song> findAllByOrderByPlayCountDesc(Pageable pageable);
}