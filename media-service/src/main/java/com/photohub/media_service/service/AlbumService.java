package com.photohub.media_service.service;

import com.photohub.media_service.dto.AlbumResponse;
import com.photohub.model_service.models.Album;
import com.photohub.model_service.repositories.AlbumRepository;
import com.photohub.model_service.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final UserRepository userRepository;

    public AlbumResponse createAlbum(String name, String userEmail) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Album album = Album.builder()
                .userId(user.getUserId())
                .albumName(name)
                .createdAt(LocalDateTime.now())
                .build();

        album = albumRepository.save(album);
        return mapToResponse(album);
    }

    public List<AlbumResponse> getUserAlbums(String userEmail) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return albumRepository.findByUserId(user.getUserId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void deleteAlbum(Long albumId, String userEmail) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album not found"));

        if (!album.getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Unauthorized to delete this album");
        }

        albumRepository.delete(album);
    }

    private AlbumResponse mapToResponse(Album album) {
        return AlbumResponse.builder()
                .albumId(album.getAlbumId())
                .userId(album.getUserId())
                .albumName(album.getAlbumName())
                .createdAt(album.getCreatedAt())
                .build();
    }
}
