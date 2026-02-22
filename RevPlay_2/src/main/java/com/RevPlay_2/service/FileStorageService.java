package com.RevPlay_2.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String BASE_DIR = System.getProperty("user.dir") + File.separator + "uploads";

    public String saveFile(MultipartFile file, String folderName) throws IOException {

        // Create base uploads folder if not exists
        File baseFolder = new File(BASE_DIR);
        if (!baseFolder.exists()) {
            baseFolder.mkdirs();
        }

        // Create subfolder (songs, profiles, covers)
        File subFolder = new File(BASE_DIR + File.separator + folderName);
        if (!subFolder.exists()) {
            subFolder.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        String fullPath = Paths.get(subFolder.getAbsolutePath(), fileName).toString();

        // Write manually instead of transferTo
        try (FileOutputStream fos = new FileOutputStream(fullPath)) {
            fos.write(file.getBytes());
        }

        return "/uploads/" + folderName + "/" + fileName;
    }
}