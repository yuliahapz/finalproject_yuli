import axios from "axios";
import { useEffect, useState } from "react";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1bGlAZ21haWwuY29tIiwidXNlcklkIjoiMTFjNzFlZGQtZDhjZi00MDFjLTliMTctMDQ1MzgyZmEwNDI4Iiwicm9sZSI6ImdlbmVyYWwiLCJpYXQiOjE3Mjc0ODE2OTd9.BC2exy8bHpwZD1DCMmtBWx3RBlPIdOGf24DopDjE56o";
        
            axios.get(
                `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post?size=10&page=${currentPage}`,
                {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${token}`,
                        apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b'
                    },
                }
            )
            .then(response => {
                const fetchedPosts = response.data.data.posts;
                if (Array.isArray(fetchedPosts)) {
                    setPosts(fetchedPosts);
                    setTotalPages(response.data.data.totalPages);
                } else {
                    throw new Error("No posts found or data is not an array");
                }
            })
            .catch(error => {
                if (error.response) {
                    setError(`Error: ${error.response.data.message}`);
                } else if (error.request) {
                    setError("Network error: Please check your connection.");
                } else {
                    setError(`Error: ${error.message}`);
                }
            })
            .finally(() => {
                setLoading(false);
            });
        };

        fetchPosts();
    }, [currentPage]);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <div className="spinner">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div>
            <nav className="navbar">
                <div className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                <path d="M18 5l-2-3h-8l-2 3h-6v17h24v-17h-6zm4 7h-4.079c.581 3.754-2.312 7-5.921 7-3.612 0-6.501-3.248-5.921-7h-4.079v-5h5.07l2-3h5.859l2 3h5.071v5zm-10-3c-2.243 0-4 1.73-4 3.939 0 2.239 1.794 4.061 4 4.061s4-1.822 4-4.061c0-2.209-1.757-3.939-4-3.939zm-.436 3.555c-.632.503-1.461.5-1.852-.006-.39-.506-.194-1.324.438-1.827.632-.502 1.461-.499 1.851.007.391.505.195 1.323-.437 1.826z"/>
                </svg></div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#explore">Explore</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
            </nav>

            <section className="hero">
                <div className="hero-content">
                    <h1>Capture and Share Moments</h1>
                    <p>Your photos, your story. Explore, create, and share your favorite moments.</p>
                    <a href="#explore" className="hero-btn">Explore Gallery</a>
                </div>
            </section>

            <section className="gallery" id="explore">
                <h2>Explore Our Collection</h2>
                <div className="photo-grid">
                    {posts.length === 0 ? (
                        <p>No posts available.</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="photo-card">
                                <img src={post.imageUrl} alt={post.caption} className="post-image" />
                                <p>{post.caption}</p>
                                <p>Liked: {post.isLike ? 'Yes' : 'No'}</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="pagination">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1} className={currentPage === 1 ? "disabled" : ""}>
                        Previous
                    </button>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : ""}>
                        Next
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 PhotoShare. All rights reserved.</p>
                <ul className="social-links">
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Twitter</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default Dashboard;
