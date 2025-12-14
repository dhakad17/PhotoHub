package com.photohub.model_service.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "media")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "album_id")
    private Long albumId;

    @Column(name = "media_url", columnDefinition = "TEXT")
    private String mediaUrl;

    @Column(name = "media_type")
    private String mediaType;

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt;

    @Column(name = "size_bytes")
    private Long sizeBytes;
}
