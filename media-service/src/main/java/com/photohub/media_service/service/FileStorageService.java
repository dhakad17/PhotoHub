package com.photohub.media_service.service;

import com.photohub.media_service.config.FileStorageConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final FileStorageConfig fileStorageConfig;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "gif", "webp", "mp4",
            "mov", "avi", "mkv");
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    public String storeFile(MultipartFile file, Long userId) {
        // Validate file
        validateFile(file);

        try {
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = getFileExtension(originalFilename);
            String newFilename = userId + "_" + UUID.randomUUID().toString() + "." + extension;

            // Create user directory if not exists
            Path userDir = Paths.get(fileStorageConfig.getUploadDir(), userId.toString());
            if (!Files.exists(userDir)) {
                Files.createDirectories(userDir);
            }

            // Store file
            Path targetLocation = userDir.resolve(newFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Return relative path
            return userId + "/" + newFilename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Cannot upload empty file");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("File size exceeds maximum limit of 10MB");
        }

        String extension = getFileExtension(file.getOriginalFilename());
        if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new RuntimeException("Invalid file type. Allowed: " + ALLOWED_EXTENSIONS);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            throw new RuntimeException("Invalid filename");
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }

    public void deleteFile(String filePath) {
        try {
            Path path = Paths.get(fileStorageConfig.getUploadDir(), filePath);
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file", e);
        }
    }
}
