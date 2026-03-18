import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
    const location = useLocation();

    return (
        <nav className='navbar'>
            <h1 className='navbar-brand'>Search anything</h1>
            <div className='navbar-nav'>
                <Link
                    to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    Search
                </Link>
                <Link
                    to="/collection"
                    className={`nav-link ${location.pathname === '/collection' ? 'active' : ''}`}
                >
                    Collection
                </Link>
            </div>
        </nav>
    )
}

export default NavBar