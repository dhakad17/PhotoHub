import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumCard = ({ album, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/albums/${album.albumId}`);
    };

    return (
        <div className="album-card" onClick={handleClick}>
            <div className="album-card-header">
                <h3>{album.albumName}</h3>
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(album.albumId);
                    }}
                >
                    🗑️
                </button>
            </div>
            <div className="album-card-body">
                <div className="album-placeholder">
                    📁
                </div>
                <p className="album-date">
                    Created: {new Date(album.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default AlbumCard;
