import React, { useState } from 'react';
import { mediaService, albumService } from '../api/mediaService';

const UploadModal = ({ isOpen, onClose, onUploadSuccess, albumId = null }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(albumId || '');
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);

    React.useEffect(() => {
        if (isOpen && !albumId) {
            loadAlbums();
        }
    }, [isOpen, albumId]);

    const loadAlbums = async () => {
        try {
            const data = await albumService.getMyAlbums();
            setAlbums(data);
        } catch (err) {
            console.error('Failed to load albums:', err);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        handleFile(selectedFile);
    };

    const handleFile = (selectedFile) => {
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const albumIdToUse = selectedAlbum || null;
            await mediaService.uploadMedia(file, albumIdToUse);
            setFile(null);
            setPreview(null);
            setSelectedAlbum('');
            onUploadSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload media');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Upload Media</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleUpload}>
                    {error && <div className="error">{error}</div>}

                    <div
                        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {preview ? (
                            <div className="preview">
                                {file.type.startsWith('video/') ? (
                                    <video src={preview} controls />
                                ) : (
                                    <img src={preview} alt="Preview" />
                                )}
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <p>📁 Drag and drop or click to select</p>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                    id="file-input"
                                />
                                <label htmlFor="file-input" className="file-label">
                                    Choose File
                                </label>
                            </div>
                        )}
                    </div>

                    {!albumId && (
                        <div className="form-group">
                            <label>Album (Optional)</label>
                            <select
                                value={selectedAlbum}
                                onChange={(e) => setSelectedAlbum(e.target.value)}
                            >
                                <option value="">No Album</option>
                                {albums.map((album) => (
                                    <option key={album.albumId} value={album.albumId}>
                                        {album.albumName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading || !file}>
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadModal;
