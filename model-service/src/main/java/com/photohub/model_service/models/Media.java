package com.photohub.model_service.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "media")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT")
    private String fileUrl;

    @Column(columnDefinition = "TEXT")
    private String thumbnailUrl;

    private String mimeType;
    private Long sizeBytes;

    private Integer width;
    private Integer height;

    private LocalDateTime createdAt;
    private LocalDateTime takenAt;

    private String cameraModel;

    private Double locationLat;
    private Double locationLng;

    @Enumerated(EnumType.STRING)
    private MediaStatus status;
}
