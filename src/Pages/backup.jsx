import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChatBubbleBottomCenterTextIcon, TrashIcon } from '@heroicons/react/24/outline'; 
import { Link } from "react-router-dom";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import CommentForm from "./Comment/CreateComment";
import DeleteComment from "./Comment/DeleteComment";


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
            { postId },
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
                            totalLikes: isLike ? Math.max(post.totalLikes - 1, 0) : post.totalLikes + 1
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

    const handleDeleteComment = (postId, commentId) => {
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: prevComments[postId].filter(comment => comment.id !== commentId)
        }));
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
                                    <img src={post.imageUrl} alt={post.caption} className="w-full h-40 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url'; }} />
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
                                <span>{(comments[post.id] || []).length} comments</span>
                                </div>

                                <div> 
                                    {comments[post.id]?.map(newComment => (
                                        <div key={newComment.id}>
                                            <p>{newComment.text}</p>
                                            <DeleteComment postId={post.id} commentId={newComment.id} onDeleteComment={handleDeleteComment} />
                                            </div>
                                    ))}
                                </div>

                                        <div className="mt-4">
                                            <p className="font-bold"><span className="text-gray-900">{(comments[post.id] || []).length} </span>
                                            Comments</p>
                                            {comments[post.id]?.map(comment => (
                                                <div key={comment.id} className="bg-gray-100 rounded-md p-2 mt-2">
                                                    <p>{comment.text}</p>
                                                    <button
                                                        className="text-red-500 hover:underline"
                                                        onClick={() => handleDeleteComment(post.id, comment.id)}
                                                    >
                                                        <TrashIcon className="w-5 h-5 inline-block" /> Delete
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <CommentForm postId={post.id} onAddComment={handleAddComment} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex justify-center space-x-4 mt-8">
                        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                            Previous
                        </button>
                        <span className="text-gray-700">{currentPage} of {totalPages}</span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                            Next
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
