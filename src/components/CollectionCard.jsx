import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCollection, removeToast } from '../redux/features/collectionSlice'

const CollectionCard = ({ data }) => {
  const dispatch = useDispatch()

  if (!data) return null

  const handleRemove = (item) => {
    if (!item?.id) return
    dispatch(removeCollection(item.id))
    dispatch(removeToast())
  }

  const typeLabel = data.type === 'videos' ? 'Video' : 'Photo'

  return (
    <div className="collection-card fade-in">
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="collection-card-media"
        aria-label={`${typeLabel} preview`}
      >
        {data.type === 'photos' && (
          <img
            src={data.thumbnail}
            alt={data.title || 'Saved media'}
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

      <div className="collection-card-overlay">
        <div className="collection-card-text">
          <span className="chip">{typeLabel}</span>
          <h3 className="collection-card-title">{data.title || 'Untitled'}</h3>
        </div>
        <div className="collection-card-actions">
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="collection-action ghost"
          >
            Open
          </a>
          <button
            onClick={() => handleRemove(data)}
            className="collection-action danger"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard
