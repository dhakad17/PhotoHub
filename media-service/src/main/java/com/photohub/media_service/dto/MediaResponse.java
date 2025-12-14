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
public class MediaResponse {
    private Long mediaId;
    private Long userId;
    private Long albumId;
    private String mediaUrl;
    private String mediaType;
    private LocalDateTime uploadedAt;
}
