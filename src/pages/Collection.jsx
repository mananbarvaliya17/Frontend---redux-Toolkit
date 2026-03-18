import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from '../components/CollectionCard';
import NavBar from '../components/NavBar';
import { clearCollection } from '../redux/features/collectionSlice';


const Collection = () => {
  const collectionValue = useSelector(state => state.collection.items)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 16

  const dispatch = useDispatch()

  const totalPages = Math.max(1, Math.ceil(collectionValue.length / PAGE_SIZE))

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  const pagedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return collectionValue.slice(start, start + PAGE_SIZE)
  }, [collectionValue, page])

  const clearAllCollection = () => {
    dispatch(clearCollection())

  }
  return (
    <div className='page-shell'>
      <div>
        <div className="collection-header">
          {collectionValue.length > 0 ? (
            <>
              <h1 className="collection-title">My Collection</h1>
              <p className="collection-subtitle">{collectionValue.length} item{collectionValue.length > 1 ? 's' : ''} saved</p>
              <button
                onClick={clearAllCollection}
                className="btn btn-danger"
              >
                Clear collection
              </button>
            </>
          ) : (
            <h1 className="collection-empty">
              No items in Collection
            </h1>
          )}
        </div>

        {collectionValue.length > 0 && (
          <>
            <div className="collection-grid">
              {pagedItems.map((item, idx) => (
                <CollectionCard key={item.id || idx} data={item} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination-bar">
                <button
                  className="btn btn-secondary"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <span className="pagination-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="btn btn-primary"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Collection