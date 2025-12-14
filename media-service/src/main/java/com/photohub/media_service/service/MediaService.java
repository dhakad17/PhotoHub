package com.photohub.media_service.service;

import com.photohub.media_service.dto.MediaResponse;
import com.photohub.model_service.models.Media;
import com.photohub.model_service.repositories.MediaRepository;
import com.photohub.model_service.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final MediaRepository mediaRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public MediaResponse uploadMedia(MultipartFile file, String userEmail, Long albumId) {
        // Get user by email
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Store file
        String filePath = fileStorageService.storeFile(file, user.getUserId());

        // Create media entity
        Media media = Media.builder()
                .userId(user.getUserId())
                .albumId(albumId)
                .mediaUrl(filePath)
                .mediaType(getMediaType(file.getContentType()))
                .sizeBytes(file.getSize())
                .uploadedAt(LocalDateTime.now())
                .build();

        media = mediaRepository.save(media);

        return mapToResponse(media);
    }

    public List<MediaResponse> getUserMedia(String userEmail) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mediaRepository.findByUserId(user.getUserId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<MediaResponse> getAlbumMedia(Long albumId, String userEmail) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mediaRepository.findByAlbumIdAndUserId(albumId, user.getUserId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void deleteMedia(Long mediaId, String userEmail) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("Media not found"));

        if (!media.getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Unauthorized to delete this media");
        }

        // Delete file from storage
        fileStorageService.deleteFile(media.getMediaUrl());

        // Delete from database
        mediaRepository.delete(media);
    }

    private String getMediaType(String contentType) {
        if (contentType == null)
            return "image";
        if (contentType.startsWith("image"))
            return "image";
        if (contentType.startsWith("video"))
            return "video";
        return "other";
    }

    private MediaResponse mapToResponse(Media media) {
        return MediaResponse.builder()
                .mediaId(media.getMediaId())
                .userId(media.getUserId())
                .albumId(media.getAlbumId())
                .mediaUrl(media.getMediaUrl())
                .mediaType(media.getMediaType())
                .uploadedAt(media.getUploadedAt())
                .build();
    }
}
