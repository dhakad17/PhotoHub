package com.photohub.media_service.controller;

import com.photohub.media_service.dto.MediaResponse;
import com.photohub.media_service.service.MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class MediaController {

    private final MediaService mediaService;

    @PostMapping("/upload")
    public ResponseEntity<MediaResponse> uploadMedia(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "albumId", required = false) Long albumId,
            Authentication authentication) {

        String userEmail = authentication.getName();
        MediaResponse response = mediaService.uploadMedia(file, userEmail, albumId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-media")
    public ResponseEntity<List<MediaResponse>> getMyMedia(Authentication authentication) {
        String userEmail = authentication.getName();
        List<MediaResponse> media = mediaService.getUserMedia(userEmail);
        return ResponseEntity.ok(media);
    }

    @GetMapping("/album/{albumId}")
    public ResponseEntity<List<MediaResponse>> getAlbumMedia(
            @PathVariable Long albumId,
            Authentication authentication) {

        String userEmail = authentication.getName();
        List<MediaResponse> media = mediaService.getAlbumMedia(albumId, userEmail);
        return ResponseEntity.ok(media);
    }

    @DeleteMapping("/{mediaId}")
    public ResponseEntity<String> deleteMedia(
            @PathVariable Long mediaId,
            Authentication authentication) {

        String userEmail = authentication.getName();
        mediaService.deleteMedia(mediaId, userEmail);
        return ResponseEntity.ok("Media deleted successfully");
    }
}
