package com.photohub.model_service.models;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;
@Entity
@Table(name = "album_media")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AlbumMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albumMediaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "media_id")
    private Media media;

    private LocalDateTime addedAt;
}

