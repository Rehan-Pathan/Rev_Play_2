package com.RevPlay_2.controller;

import com.RevPlay_2.entity.User;
import com.RevPlay_2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/upload-profile", consumes = "multipart/form-data")
    public ResponseEntity<User> uploadProfile(
            Authentication authentication,
            @RequestPart("file") MultipartFile file
    ) throws Exception {

        String username = authentication.getName();
        return ResponseEntity.ok(
                userService.uploadProfileImage(username, file)
        );
    }

    @GetMapping("/me")
    public ResponseEntity<User> getProfile(Authentication authentication) {

        String username = authentication.getName();
        return ResponseEntity.ok(
                userService.getCurrentUser(username)
        );
    }
}