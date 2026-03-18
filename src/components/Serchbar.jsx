import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setQuery } from '../redux/features/searchSlice';

const Searchbar = () => {

    const dispatch = useDispatch();

    const [text, setText] = useState('')

    const suggestions = useMemo(() => (
        ['nature', 'architecture', 'technology', 'travel', 'abstract']
    ), [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = text.trim()
        if (value.length < 2) return
        dispatch(setQuery(value));
    }

    return (
        <div className='search-panel'>
            <form
                className='search-form'
                onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                <input
                    value={text}
                    type="text"
                    placeholder='Search high-quality photos or videos...'
                    className='search-input form-input'
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type='submit'
                    className='search-button btn btn-primary'
                    disabled={text.trim().length < 2}
                    aria-disabled={text.trim().length < 2}
                >
                    Search
                </button>
            </form>

            <div className='search-meta'>
                <p className='search-hint'>Try a quick suggestion:</p>
                <div className='search-pills'>
                    {suggestions.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className='pill'
                            onClick={() => {
                                setText(item)
                                dispatch(setQuery(item))
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Searchbar
