import React, { useState, useEffect } from 'react';

import AlbumCard from '../components/AlbumCard';
import { albumService } from '../api/mediaService';

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAlbumName, setNewAlbumName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadAlbums();
    }, []);

    const loadAlbums = async () => {
        try {
            const data = await albumService.getMyAlbums();
            setAlbums(data);
        } catch (error) {
            console.error('Failed to load albums:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAlbum = async (e) => {
        e.preventDefault();
        if (!newAlbumName.trim()) {
            setError('Album name is required');
            return;
        }

        try {
            await albumService.createAlbum(newAlbumName);
            setNewAlbumName('');
            setShowCreateModal(false);
            loadAlbums();
        } catch (error) {
            setError('Failed to create album');
        }
    };

    const handleDeleteAlbum = async (albumId) => {
        if (window.confirm('Are you sure you want to delete this album?')) {
            try {
                await albumService.deleteAlbum(albumId);
                loadAlbums();
            } catch (error) {
                alert('Failed to delete album');
            }
        }
    };

    return (
        <div className="albums-container">


            <div className="page-content">
                <div className="page-header">
                    <h1>My Albums</h1>
                    <button
                        className="create-btn"
                        onClick={() => setShowCreateModal(true)}
                    >
                        ➕ Create Album
                    </button>
                </div>

                {loading ? (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                    </div>
                ) : albums.length > 0 ? (
                    <div className="albums-grid">
                        {albums.map((album) => (
                            <AlbumCard
                                key={album.albumId}
                                album={album}
                                onDelete={handleDeleteAlbum}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No albums yet. Create your first album to organize your photos!</p>
                    </div>
                )}
            </div>

            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Create New Album</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowCreateModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleCreateAlbum}>
                            {error && <div className="error">{error}</div>}
                            <div className="form-group">
                                <label>Album Name</label>
                                <input
                                    type="text"
                                    value={newAlbumName}
                                    onChange={(e) => setNewAlbumName(e.target.value)}
                                    placeholder="Enter album name"
                                    autoFocus
                                />
                            </div>
                            <div className="modal-actions">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Albums;
