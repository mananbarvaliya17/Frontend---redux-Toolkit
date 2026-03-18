import React, { useEffect } from 'react'
import { FetchVideos, fetchPhotos } from '../api/MediaApi'
import { clearResults, setError, setLoading, setResults } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'

const ResultGrid = () => {
  const dispatch = useDispatch()
  const { query, activeTabs, result, loading, error } = useSelector((store) => store.search)

  const normalizedQuery = query.trim()
  const isQueryTooShort = normalizedQuery.length > 0 && normalizedQuery.length < 2

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
    <div className='result-grid'>
      {result.map((val) => (
        <ResultCard key={val.id} data={val} />
      ))}
    </div>
  )
}

export default ResultGrid
