package com.RevPlay_2.controller;

import com.RevPlay_2.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestUploadController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload-profile")
    public ResponseEntity<String> uploadProfile(@RequestParam MultipartFile file) throws Exception {

        String path = fileStorageService.saveFile(file, "profiles");
        return ResponseEntity.ok(path);
    }

    @PostMapping("/upload-song")
    public ResponseEntity<String> uploadSong(@RequestParam MultipartFile file) throws Exception {

        String path = fileStorageService.saveFile(file, "songs");
        return ResponseEntity.ok(path);
    }

    @PostMapping("/upload-cover")
    public ResponseEntity<String> uploadCover(@RequestParam MultipartFile file) throws Exception {

        String path = fileStorageService.saveFile(file, "covers");
        return ResponseEntity.ok(path);
    }
}