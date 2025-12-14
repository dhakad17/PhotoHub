import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MediaCard from '../components/MediaCard';
import UploadModal from '../components/UploadModal';
import Lightbox from '../components/Lightbox';
import { mediaService } from '../api/mediaService';

const AlbumDetail = () => {
    const { albumId } = useParams();
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    useEffect(() => {
        loadMedia();
    }, [albumId]);

    const loadMedia = async () => {
        try {
            const data = await mediaService.getAlbumMedia(albumId);
            setMedia(data);
        } catch (error) {
            console.error('Failed to load album media:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMedia = async (mediaId) => {
        if (window.confirm('Are you sure you want to delete this media?')) {
            try {
                await mediaService.deleteMedia(mediaId);
                loadMedia();
            } catch (error) {
                alert('Failed to delete media');
            }
        }
    };

    const handleMediaClick = (index) => {
        setSelectedMediaIndex(index);
        setLightboxOpen(true);
    };

    const handleNext = () => {
        setSelectedMediaIndex((prev) => (prev + 1) % media.length);
    };

    const handlePrev = () => {
        setSelectedMediaIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    return (
        <div className="album-detail-container">


            <div className="page-content">
                <div className="page-header">
                    <h1>Album Media</h1>
                    <button
                        className="upload-btn"
                        onClick={() => setUploadModalOpen(true)}
                    >
                        📤 Upload to Album
                    </button>
                </div>

                {loading ? (
                    <p>Loading media...</p>
                ) : media.length > 0 ? (
                    <div className="media-grid">
                        {media.map((item, index) => (
                            <MediaCard
                                key={item.mediaId}
                                media={item}
                                onDelete={handleDeleteMedia}
                                onClick={() => handleMediaClick(index)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No media in this album yet. Upload your first photo!</p>
                    </div>
                )}
            </div>

            <UploadModal
                isOpen={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                onUploadSuccess={loadMedia}
                albumId={albumId}
            />

            <Lightbox
                media={media[selectedMediaIndex]}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNext={media.length > 1 ? handleNext : null}
                onPrev={media.length > 1 ? handlePrev : null}
            />
        </div>
    );
};

export default AlbumDetail;
