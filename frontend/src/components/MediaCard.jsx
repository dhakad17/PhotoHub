import React from 'react';

const MediaCard = ({ media, onDelete, onClick }) => {
    const isVideo = media.mediaType === 'video';

    return (
        <div className="media-card" onClick={onClick}>
            <div className="media-card-image">
                {isVideo ? (
                    <video src={`http://localhost:8082/${media.mediaUrl}`} />
                ) : (
                    <img src={`http://localhost:8082/${media.mediaUrl}`} alt="Media" />
                )}
                <div className="media-card-overlay">
                    <button
                        className="delete-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(media.mediaId);
                        }}
                    >
                        🗑️
                    </button>
                </div>
            </div>
            <div className="media-card-info">
                <span className="media-type">{media.mediaType}</span>
                <span className="media-date">
                    {new Date(media.uploadedAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};

export default MediaCard;
