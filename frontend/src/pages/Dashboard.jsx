import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UploadModal from '../components/UploadModal';
import MediaCard from '../components/MediaCard';
import Lightbox from '../components/Lightbox';
import { mediaService, albumService } from '../api/mediaService';

const Dashboard = () => {
    const [recentMedia, setRecentMedia] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [mediaData, albumData] = await Promise.all([
                mediaService.getMyMedia(),
                albumService.getMyAlbums(),
            ]);
            setRecentMedia(mediaData.slice(0, 6)); // Show only 6 recent
            setAlbums(albumData.slice(0, 4)); // Show only 4 albums
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMedia = async (mediaId) => {
        if (window.confirm('Are you sure you want to delete this media?')) {
            try {
                await mediaService.deleteMedia(mediaId);
                loadData();
            } catch (error) {
                alert('Failed to delete media');
            }
        }
    };

    const handleMediaClick = (media) => {
        setSelectedMedia(media);
        setLightboxOpen(true);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Welcome to PhotoHub</h1>
                    <button
                        className="upload-btn"
                        onClick={() => setUploadModalOpen(true)}
                    >
                        📤 Upload Media
                    </button>
                </div>

                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h3>{recentMedia.length}</h3>
                        <p>Recent Media</p>
                    </div>
                    <div className="stat-card">
                        <h3>{albums.length}</h3>
                        <p>Albums</p>
                    </div>
                </div>

                <section className="dashboard-section">
                    <div className="section-header">
                        <h2>Recent Media</h2>
                        <button onClick={() => navigate('/my-media')} className="view-all-btn">
                            View All →
                        </button>
                    </div>
                    {loading ? (
                        <div className="loading">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : recentMedia.length > 0 ? (
                        <div className="media-grid">
                            {recentMedia.map((media) => (
                                <MediaCard
                                    key={media.mediaId}
                                    media={media}
                                    onDelete={handleDeleteMedia}
                                    onClick={() => handleMediaClick(media)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="empty-state">No media yet. Upload your first photo!</p>
                    )}
                </section>

                <section className="dashboard-section">
                    <div className="section-header">
                        <h2>Albums</h2>
                        <button onClick={() => navigate('/albums')} className="view-all-btn">
                            View All →
                        </button>
                    </div>
                    {albums.length > 0 ? (
                        <div className="albums-preview">
                            {albums.map((album) => (
                                <div
                                    key={album.albumId}
                                    className="album-preview-card"
                                    onClick={() => navigate(`/albums/${album.albumId}`)}
                                >
                                    <h3>{album.albumName}</h3>
                                    <p>{new Date(album.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-state">No albums yet. Create your first album!</p>
                    )}
                </section>
            </div>

            <UploadModal
                isOpen={uploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                onUploadSuccess={loadData}
            />

            <Lightbox
                media={selectedMedia}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </div>
    );
};

export default Dashboard;
