package com.photohub.media_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlbumResponse {
    private Long albumId;
    private Long userId;
    private String albumName;
    private LocalDateTime createdAt;
}
