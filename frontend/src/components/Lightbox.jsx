import React from 'react';

const Lightbox = ({ media, isOpen, onClose, onNext, onPrev }) => {
    if (!isOpen || !media) return null;

    const isVideo = media.mediaType === 'video';

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
    };

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen]);

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox-close" onClick={onClose}>×</button>

                {onPrev && (
                    <button className="lightbox-nav lightbox-prev" onClick={onPrev}>
                        ‹
                    </button>
                )}

                <div className="lightbox-media">
                    {isVideo ? (
                        <video
                            src={`http://localhost:8082/${media.mediaUrl}`}
                            controls
                            autoPlay
                        />
                    ) : (
                        <img
                            src={`http://localhost:8082/${media.mediaUrl}`}
                            alt="Media"
                        />
                    )}
                </div>

                {onNext && (
                    <button className="lightbox-nav lightbox-next" onClick={onNext}>
                        ›
                    </button>
                )}

                <div className="lightbox-info">
                    <p>Uploaded: {new Date(media.uploadedAt).toLocaleString()}</p>
                    <p>Type: {media.mediaType}</p>
                </div>
            </div>
        </div>
    );
};

export default Lightbox;
