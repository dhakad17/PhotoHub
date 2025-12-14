package com.photohub.model_service.repositories;

import com.photohub.model_service.models.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findByUserId(Long userId);

    List<Media> findByAlbumIdAndUserId(Long albumId, Long userId);
}
