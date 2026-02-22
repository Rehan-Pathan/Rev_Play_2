package com.RevPlay_2.service;

import com.RevPlay_2.entity.User;
import com.RevPlay_2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public User uploadProfileImage(String username, MultipartFile file) throws Exception {

        User user = userRepository.findByUsername(username).orElseThrow();

        String path = fileStorageService.saveFile(file, "profiles");

        user.setProfileImagePath(path);

        return userRepository.save(user);
    }

    public User getCurrentUser(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }
}