package com.RevPlay_2.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String genre;

    private String audioPath;
    private String coverImagePath;

    private int playCount;

    @ManyToOne
    @JoinColumn(name = "artist_id")
    private User artist;


}