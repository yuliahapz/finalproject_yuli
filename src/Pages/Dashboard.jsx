import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [Logout, setLogout] = useState(false);
    const [fallback, setFallback] = useState(false);
    const fallbackImages = [
        "https://st.depositphotos.com/15991950/56298/i/450/depositphotos_562981124-stock-photo-cherry-blossoms-fuji-fujimi-kotoku.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJbmieELSG-ek1OXl9hHbExU1Hkucg_7C1RQ&s",
        "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-fd5e770d3e129efe4b0ed6c19271ed29afc807dc.jpg?s=1100&c=85&f=jpeg",
        "https://api.adventureranddiscoverer.com/uploads/images/2024/02/image_1280x_65c9eb83eb9e7.jpg",
        "https://png.pngtree.com/thumb_back/fh260/background/20230609/pngtree-in-the-style-of-dark-gray-and-light-amber-image_2935050.jpg",
        "https://www.cdc.gov/healthy-pets/media/images/2024/04/Cat-on-couch.jpg",
        "https://www.ellevetsciences.com/wp-content/uploads/2022/07/ev-blog-huskies-header.jpg"]

    const handleImageError = (e) => {
        e.target.onerror = null;
        if (fallbackIndex < fallbackImages.length -1) {
            setFallbackIndex(fallbackIndex + 1);
            e.target.src = fallbackImages[fallbackIndex + 1]};
        }


    const handeLogout = () => {
        localStorage.removeItem('token');
        setLogout(true);
        navigate('/login');
    }

    useEffect(() => {
        const fetchPosts = () => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            axios.get(
                `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post?size=10&page=${currentPage}`,
                {
                    headers: {
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
                setError(error.response ? error.response.data.message : error.message);
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
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 p-6 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0`}>
                <div className="flex justify-between items-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" viewBox="0 0 24 24" className="mx-auto h-10 w-auto">
                <path d="M18 5l-2-3h-8l-2 3h-6v17h24v-17h-6zm4 7h-4.079c.581 3.754-2.312 7-5.921 7-3.612 0-6.501-3.248-5.921-7h-4.079v-5h5.07l2-3h5.859l2 3h5.071v5zm-10-3c-2.243 0-4 1.73-4 3.939 0 2.239 1.794 4.061 4 4.061s4-1.822 4-4.061c0-2.209-1.757-3.939-4-3.939zm-.436 3.555c-.632.503-1.461.5-1.852-.006-.39-.506-.194-1.324.438-1.827.632-.502 1.461-.499 1.851.007.391.505.195 1.323-.437 1.826z"/>
                </svg>
                    <h2 className="text-white text-2xl font-bold">memories</h2>
                    <button onClick={() => setSidebarOpen(false)} className="text-white xl:hidden">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <nav>
                <ul>
                <li><Link to="/notifications" className="text-gray-400 hover:text-white block py-2">Notifications</Link></li>
                <li><Link to="/home" className="text-gray-400 hover:text-white block py-2">Home</Link></li>
                <li><Link to="/search" className="text-gray-400 hover:text-white block py-2">Search</Link></li>
                <li><Link to="/explore" className="text-gray-400 hover:text-white block py-2">Explore</Link></li>
                <li><Link to="/CreatePost" className="text-gray-400 hover:text-white block py-2">Create</Link></li>
                <li><Link to="/Profile" className="text-gray-400 hover:text-white block py-2">Profile</Link></li>
                </ul>
                </nav>
                {/* Login Button */}
                <button
                    className="mt-auto bg-blue-500 w-full text-center py-2 text-white rounded hover:bg-blue-700"
                    onClick={handeLogout}
                >Logout</button>
            </div>

            {/* Main content */}
            <div className="flex-1 xl:ml-64">
                {/* Top bar */}
                <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center">
                        <form className="relative">
                            <input 
                                type="text" 
                                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none"
                                placeholder="Search..."
                            />
                        </form>
                    </div>
                </header>

                {/* Hero Section */}
               

                {/* Posts Section */}
<section className="gallery py-10 bg-gray-100" id="explore">
    <h2 className="text-center text-3xl font-bold mt-8 mb-8">Explore Our Collection</h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.length === 0 ? (
            <p className="text-center">No posts available.</p>
        ) : (
            posts.map((post) => (
                <div key={post.id} className="photo-card bg-white shadow-lg rounded-lg overflow-hidden max-w-xs">
                    <img src={post.imageUrl} alt={post.caption} className="w-full h-40 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://cdn1-production-images-kly.akamaized.net/J_qaSn7xpC5d-kbHx-wCsOiFsuY=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4770934/original/018943800_1710311605-mountains-8451480_1280.jpg'; }} />
                    <div className="p-2">
                        <p className="text-sm font-bold">{post.caption}</p>
                        <p className="text-xs text-gray-500">Liked: {post.isLike ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            ))
        )}
    </div>
</section>

                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-2 mt-8">
                    <button 
                    onClick={goToPreviousPage} 
                    disabled={currentPage === 1} 
                    className={`inline-block w-24 px-4 py-1 text-sm ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} rounded text-center`}
                    >
                    Previous
                    </button>
                    <button 
                    onClick={goToNextPage} 
                    disabled={currentPage === totalPages} 
                    className={`inline-block w-24 px-4 py-1 text-sm ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} rounded text-center`}
                    >
                    Next
                    </button>
                    </div>
                    <span className="block text-center mt-2">Page {currentPage} of {totalPages}</span>

                {/* Footer */}
                <footer className="bg-gray-800 text-white p-6">
                    <p className="text-center">&copy; 2024 PhotoShare. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;
