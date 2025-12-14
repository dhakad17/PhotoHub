package com.photohub.model_service.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "albums")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albumId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "album_name")
    private String albumName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
