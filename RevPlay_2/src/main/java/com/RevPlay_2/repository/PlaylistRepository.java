package com.RevPlay_2.repository;

import com.RevPlay_2.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByUserUsername(String username);
}
