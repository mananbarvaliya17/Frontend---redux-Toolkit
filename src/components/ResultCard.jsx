import React from 'react';
import { useDispatch } from 'react-redux';
import { addCollection, addedToast } from '../redux/features/collectionSlice';

const ResultCard = ({ data }) => {

  const dispatch = useDispatch();

  const collection = (item) => {
    dispatch(addCollection(item))
    dispatch(addedToast())
  };

  return (
    <div className="result-card fade-in">

      {/* Media Container */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={data.url}
        className="result-card-media"
      >
        {data.type === 'photos' && (
          <img
            src={data.thumbnail}
            alt={data.title || 'Media result'}
            loading="lazy"
          />
        )}

        {data.type === 'videos' && (
          <video
            src={data.src}
            poster={data.thumbnail}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </a>

      {/* Bottom Text Overlay */}
      <div className="result-card-overlay">

        {/* Title */}
        <h2 className="result-card-title">
          {data.title || 'Untitled'}
        </h2>

        {/* Action Buttons */}
        <div className="result-card-actions">
          <button
            onClick={() => {
              collection(data);
            }}
            className="result-card-button"
            aria-label={`Save ${data.title || 'item'}`}
          >
            Save
          </button>
        </div>
      </div>

    </div>
  );
};

export default ResultCard;
