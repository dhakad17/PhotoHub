import React, { useState, useEffect } from 'react';

import MediaCard from '../components/MediaCard';
import UploadModal from '../components/UploadModal';
import Lightbox from '../components/Lightbox';
import { mediaService } from '../api/mediaService';

const MyMedia = () => {
    const [media, setMedia] = useState([]);
    const [filteredMedia, setFilteredMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadMedia();
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredMedia(media);
        } else {
            setFilteredMedia(media.filter((m) => m.mediaType === filter));
        }
    }, [filter, media]);

    const loadMedia = async () => {
        try {
            const data = await mediaService.getMyMedia();
            setMedia(data);
            setFilteredMedia(data);
        } catch (error) {
            console.error('Failed to load media:', error);
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
        setSelectedMediaIndex((prev) => (prev + 1) % filteredMedia.length);
    };

    const handlePrev = () => {
        setSelectedMediaIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
    };

    return (
        <div className="my-media-container">


            <div className="page-content">
                <div className="page-header">
                    <h1>My Media</h1>
                    <button
                        className="upload-btn"
                        onClick={() => setUploadModalOpen(true)}
                    >
                        📤 Upload Media
                    </button>
                </div>

                <div className="filter-bar">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={filter === 'image' ? 'active' : ''}
                        onClick={() => setFilter('image')}
                    >
                        Images
                    </button>
                    <button
                        className={filter === 'video' ? 'active' : ''}
                        onClick={() => setFilter('video')}
                    >
                        Videos
                    </button>
                </div>

                {loading ? (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                    </div>
                ) : filteredMedia.length > 0 ? (
                    <div className="media-grid">
                        {filteredMedia.map((item, index) => (
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
                        <p>
                            {filter === 'all'
                                ? 'No media yet. Upload your first photo!'
                                : `No ${filter}s found.`}
                        </p>
                    </div>
                )}
            </div>

            <UploadModal
                isOpen={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                onUploadSuccess={loadMedia}
            />

            <Lightbox
                media={filteredMedia[selectedMediaIndex]}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNext={filteredMedia.length > 1 ? handleNext : null}
                onPrev={filteredMedia.length > 1 ? handlePrev : null}
            />
        </div>
    );
};

export default MyMedia;
