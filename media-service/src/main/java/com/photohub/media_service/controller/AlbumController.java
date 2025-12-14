package com.photohub.media_service.controller;

import com.photohub.media_service.dto.AlbumResponse;
import com.photohub.media_service.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @PostMapping
    public ResponseEntity<AlbumResponse> createAlbum(
            @RequestBody CreateAlbumRequest request,
            Authentication authentication) {

        String userEmail = authentication.getName();
        AlbumResponse response = albumService.createAlbum(request.getName(), userEmail);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<AlbumResponse>> getMyAlbums(Authentication authentication) {
        String userEmail = authentication.getName();
        List<AlbumResponse> albums = albumService.getUserAlbums(userEmail);
        return ResponseEntity.ok(albums);
    }

    @DeleteMapping("/{albumId}")
    public ResponseEntity<String> deleteAlbum(
            @PathVariable Long albumId,
            Authentication authentication) {

        String userEmail = authentication.getName();
        albumService.deleteAlbum(albumId, userEmail);
        return ResponseEntity.ok("Album deleted successfully");
    }
}

@lombok.Data
class CreateAlbumRequest {
    private String name;
}
