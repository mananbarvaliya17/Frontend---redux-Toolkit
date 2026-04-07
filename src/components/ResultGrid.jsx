import React, { useEffect, useMemo, useState } from 'react'
import { FetchVideos, fetchPhotos } from '../api/MediaApi'
import { clearResults, setError, setLoading, setResults } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'

const ResultGrid = () => {
  const dispatch = useDispatch()
  const { query, activeTabs, result, loading, error } = useSelector((store) => store.search)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 16

  const normalizedQuery = query.trim()
  const isQueryTooShort = normalizedQuery.length > 0 && normalizedQuery.length < 2
  const totalPages = Math.max(1, Math.ceil(result.length / PAGE_SIZE))

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (page <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }

    if (page >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  }

  const pagedResults = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return result.slice(start, start + PAGE_SIZE)
  }, [result, page])

  useEffect(() => {
    setPage(1)
  }, [normalizedQuery, activeTabs])

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  useEffect(() => {
    if (!normalizedQuery) {
      dispatch(clearResults())
      dispatch(setLoading(false))
      return
    }

    if (isQueryTooShort) {
      dispatch(clearResults())
      dispatch(setLoading(false))
      return
    }

    let isCancelled = false
    const getData = async () => {
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        let data = []

        if (activeTabs === 'photos') {
          const res = await fetchPhotos(normalizedQuery)
          data = res.map((item, index) => ({
            id: item.id || `photo-${index}`,
            type: 'photos',
            title: item.alt_description || 'Title',
            thumbnail: item.urls.small,
            src: item.urls.full,
            url: item.links.html,
          }));
        }

        else if (activeTabs === 'videos') {
          const res = await FetchVideos(normalizedQuery)
          data = res.map((item, i) => ({
            id: item.id || `video-${i}`,
            type: 'videos',
            title: item.user?.name || 'Untitled',
            thumbnail: item.video_pictures?.[0]?.picture,
            src: item.video_files?.find(v => v.quality === 'hd')?.link
              || item.video_files?.[0]?.link,
            url: item.url,
          }));
        }

        if (!isCancelled && data) {
          const uniqueById = Array.from(
            new Map(data.map((item) => [item.id, item])).values()
          )
          dispatch(setResults(uniqueById))
        }
      } catch (err) {
        if (!isCancelled) {
          console.error(err)
          dispatch(setError(err?.message || 'Something went wrong'))
        }
      } finally {
        if (!isCancelled) {
          dispatch(setLoading(false))
        }
      }
    }

    getData()
    return () => {
      // prevent state updates after the component unmounts
      isCancelled = true
    }
  }, [normalizedQuery, activeTabs, dispatch, isQueryTooShort])

  if (loading) {
    return (
      <div className='center' style={{ minHeight: '400px' }}>
        <div className='loading'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='center text-center' style={{ minHeight: '400px', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <h2 style={{ color: 'var(--color-error)' }}>Something went wrong</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>{error}</p>
      </div>
    );
  }

  if (isQueryTooShort) {
    return (
      <div className='center text-center' style={{ minHeight: '320px' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)' }}>
          Type at least 2 characters to search.
        </p>
      </div>
    )
  }

  if (result.length === 0) {
    return (
      <div className='center text-center' style={{ minHeight: '400px' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)' }}>
          No results found. Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className='result-grid'>
        {pagedResults.map((val) => (
          <ResultCard key={val.id} data={val} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className='pagination-bar'>
          <button
            className='btn btn-secondary'
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <div className='pagination-pages'>
            {getVisiblePages().map((value, idx) => {
              if (value === '...') {
                return (
                  <span key={`dots-${idx}`} className='pagination-dots'>
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={value}
                  className={`pagination-number ${page === value ? 'active' : ''}`}
                  onClick={() => setPage(value)}
                  aria-label={`Go to page ${value}`}
                >
                  {value}
                </button>
              )
            })}
          </div>
          <button
            className='btn btn-primary'
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default ResultGrid
