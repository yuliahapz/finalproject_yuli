import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChatBubbleBottomCenterTextIcon, TrashIcon } from '@heroicons/react/24/outline'; // Import heart and chat icons
import { Link } from "react-router-dom";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import CommentForm from "./Comment/CreateComment";


const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [comments, setComments] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [newComment, setNewComment] = useState('');

    const navigate = useNavigate();

    const handeLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

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
                setPosts(fetchedPosts);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                setError(error.response ? error.response.data.message : error.message);
            })
            .finally(() => {
                setLoading(false);
            });
        };

        fetchPosts();
    }, [currentPage, navigate]);

    const toggleLike = (postId, isLike) => {
        const token = localStorage.getItem('token');
        if (!token) return;
    
        const url = `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/${isLike ? 'unlike' : 'like'}`;
    
        axios.post(
            url, 
            { postId }, // Mengirim postId di body request
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b'
                }
            }
        )
        .then(() => {
            setPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            isLike: !isLike,
                            totalLikes: isLike ? Math.max(post.totalLikes - 1, 0) : post.totalLikes + 1 // Menghindari nilai negatif
                        };
                    }
                    return post;
                })
            );
        })
        .catch(error => {
            console.error('Error liking post:', error.response ? error.response.data : error.message);
        });
    };
    
    const handleAddComment = (postId, newComment) => {
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), newComment]
        }));
    };    

    const handleOpenModal = (postId) => {
        setCurrentPostId(postId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPostId(null);
    };

    const handleDeleteComment = (postId, commentIndex) => {
        setComments((prevComments) => {
            const updatedComments = [...prevComments[postId]];
            updatedComments.splice(commentIndex, 1);
            return {
                ...prevComments,
                [postId]: updatedComments,
            };
        });
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (loading) return <div className="spinner">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 p-6 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0`}>
                <div className="flex justify-between items-center mb-6">
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
                <button className="mt-auto bg-blue-500 w-full text-center py-2 text-white rounded hover:bg-blue-700" onClick={handeLogout}>Logout</button>
            </div>

            {/* Main content */}
            <div className="flex-1 xl:ml-64">
                <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </header>

                {/* Posts Section */}
                <section className="gallery py-10 bg-gray-100" id="explore">
                    <h2 className="text-center text-3xl font-bold mt-8 mb-8">Explore Our Collection</h2>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {posts.length === 0 ? (
                            <p className="text-center">No posts available.</p>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="photo-card bg-white shadow-lg rounded-lg overflow-hidden max-w-xs">
                                    <img src={post.imageUrl} alt={post.caption} className="w-full h-40 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://cdn1-production-images-kly.akamaized.net/J_qaSn7xpC5d-kbHx-wCsOiFsuY=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4770934/original/018943800_1710311605-mountains-8451480_1280.jpg'; }} />
                                    <div className="p-2">
                                        <p className="text-sm font-bold">{post.caption}</p>
                                        <div className="flex justify-between mt-2">
                                <button onClick={() => toggleLike(post.id, post.isLike)}>
                                    {post.isLike ? (
                                        <HeartIconSolid className="h-6 w-6 text-red-500" />
                                    ) : (
                                        <HeartIconOutline className="h-6 w-6 text-gray-400" />
                                    )}
                                </button>
                                <span className="text-sm text-gray-600">{post.totalLikes || 0} likes</span>
                                <button onClick={() => handleOpenModal(post.id)}>
                                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gray-400 cursor-pointer" />
                                </button>
                                </div>

                                        {/* Comments Section */}
                                        <div className="mt-4">
                                            <p className="font-bold"><span className="text-gray-500">{(comments[post.id] || []).length}</span>
                                            Comments</p>
                                            {comments[post.id] && comments[post.id].length > 0 ? (
                                                comments[post.id].map((comment, index) => (
                                                    <div key={index} className="flex justify-between items-center">
                                                        <p className="text-gray-600">{comment}</p>
                                                        <button onClick={() => handleDeleteComment(post.id, index)}>
                                                            <TrashIcon className="h-5 w-5 text-red-500" />
                                                        </button>
            
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-400">No comments yet.</p>
                                            )}
                                        </div>
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
                <span className="block text-center mt-4">Page {currentPage} of {totalPages}</span>
            </div>

            {/* Modal */}{isModalOpen && (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg p-4 w-96">
        <h2 className="text-lg font-bold mb-4">Add Comment</h2>
        <CommentForm postId={currentPostId} onAddComment={handleAddComment} onClose={handleCloseModal} />
        <button className="bg-red-500 w-full text-white py-2 rounded" onClick={handleCloseModal}>Close</button>
    </div>
</div>
)}
        </div>
    );
};

export default Dashboard;
