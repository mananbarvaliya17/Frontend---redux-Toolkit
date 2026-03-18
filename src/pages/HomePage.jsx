import React from 'react'
import Tabs from '../components/Tabs'
import Searchbar from '../components/Serchbar.jsx'
import ResultGrid from '../components/ResultGrid.jsx'
import { useSelector } from 'react-redux'
import NavBar from '../components/NavBar.jsx'


const HomePage = () => {

    const { query } = useSelector((store) => store.search)


    return (
        <div className='page-shell'>
            <Searchbar />

            {query !== '' && (
                <>
                    <Tabs />
                    <ResultGrid />
                </>
            )}
        </div>
    )
}

export default HomePage