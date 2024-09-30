const Navbar =()=>{
    return (
        <nav className="navbar">
            <div className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                <path d="M18 5l-2-3h-8l-2 3h-6v17h24v-17h-6zm4 7h-4.079c.581 3.754-2.312 7-5.921 7-3.612 0-6.501-3.248-5.921-7h-4.079v-5h5.07l2-3h5.859l2 3h5.071v5zm-10-3c-2.243 0-4 1.73-4 3.939 0 2.239 1.794 4.061 4 4.061s4-1.822 4-4.061c0-2.209-1.757-3.939-4-3.939zm-.436 3.555c-.632.503-1.461.5-1.852-.006-.39-.506-.194-1.324.438-1.827.632-.502 1.461-.499 1.851.007.391.505.195 1.323-.437 1.826z"/>
                </svg></div>
                <imput type="text" placeholder="search for friends or moments" className="search-bar" />
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#explore">Explore</a></li>
                </ul>
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
           
        </nav>
    )
}