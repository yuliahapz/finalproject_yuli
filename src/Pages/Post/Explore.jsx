import { useState, useEffect } from 'react';
import axios from 'axios';
import { toggleLike } from '../Like/LikePost';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import CreateComment from '../Comment/CreateComment';
import { Link } from 'react-router-dom';

const ExplorePost = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comments, setComments] = useState({});

    // Fetching posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post?size=10&page=${currentPage}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                            apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
                        },
                    }
                );
                const fetchedPosts = response.data.data.posts;
                if (Array.isArray(fetchedPosts)) {
                    setPosts(fetchedPosts);
                    setTotalPages(response.data.data.totalPages);
                } else {
                    throw new Error('No posts found or data is not an array');
                }
            } catch (error) {
                setError(`Error: ${error.response ? error.response.data.message : error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage]);

    // Fetching comments for each post
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentPromises = posts.map(post =>
                    axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/post/${post.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
                        },
                    })
                );

                const commentsResponses = await Promise.all(commentPromises);
                const fetchedComments = commentsResponses.reduce((acc, response) => {
                    const postId = response.data.data.id;
                    acc[postId] = response.data.data.comments || []; // Ensure it's an array
                    return acc;
                }, {});

                console.log("Fetched comments:", fetchedComments);
                setComments(fetchedComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        if (posts.length) {
            fetchComments();
        }
    }, [posts]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleCommentAdded = (postId, newComment) => {
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), newComment],
        }));
    };

    // Handling loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handling error state
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex">
            <div className="container mx-auto p-4 flex-1">
                {posts.map((post) => (
                    post.id && ( // Ensure post has a valid ID
                        <div key={post.id} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mb-4">
                            <div className="px-4">
                                <div className="flex items-center mb-4">
                                    <Link to={`/profile/${post.user?.id}`}>
                                        <img
                                            src={post.user?.profilePictureUrl || 'https://image.popmama.com/content-images/community/20240226/community-1983993eeb1b957b1909c5d64695189e.jpeg?1708934772'}
                                            alt={post.user?.username}
                                            className="w-8 h-8 mr-4 rounded-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcX9fmFcz6aeB7fkS13C5Rb4C8Yca7x0HNx9lc_8DsHsJp8BM3iWNnEhU70b3BHe4_OCM&usqp=CAU';
                                            }}
                                        />
                                    </Link>
                                    <Link to={`/profile/${post.user?.id}`}>
                                        <h2 className="text-lg font-bold">{post.user?.username || 'Sarah'}</h2>
                                    </Link>
                                </div>
                                <div className="flex justify-center mb-4">
                                    <Link to={`/post/${post.id}`}>
                                        <img
                                            src={post.imageUrl}
                                            alt={post.caption}
                                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://cdn1-production-images-kly.akamaized.net/J_qaSn7xpC5d-kbHx-wCsOiFsuY=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4770934/original/018943800_1710311605-mountains-8451480_1280.jpg';
                                            }}
                                        />
                                    </Link>
                                </div>
                                <div className="flex items-center ml-4 mb-4">
                                    <button onClick={() => toggleLike(post.id, post.isLike, setPosts)}>
                                        {post.isLike ? (
                                            <HeartIconSolid className="h-6 w-6 text-red-500" />
                                        ) : (
                                            <HeartIconOutline className="h-6 w-6 text-gray-400" />
                                        )}
                                    </button>
                                    <span className="text-sm text-gray-600 ml-2">{post.totalLikes || 0} likes</span>
                                </div>
                                <p className="text-gray-600 mb-4">{post.caption}</p>
                                <div className="mt-2">
                                    <p className="mb-2">Comments:</p>
                                    {comments[post.id] && Array.isArray(comments[post.id]) && comments[post.id].length > 0 ? (
                                        comments[post.id].map((comment) => (
                                            <div key={comment.id} className="mb-2">
                                                <span className="font-bold">{comment.user.username}:</span> {comment.comment}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet</p>
                                    )}
                                </div>
                                <CreateComment postId={post.id} onAddComment={handleCommentAdded} />
                            </div>
                        </div>
                    )
                ))}
                <div className="flex justify-center items-center space-x-2 mt-8">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mb-2 rounded-l" onClick={handlePreviousPage}>
                        Previous
                    </button>
                    <span className="font-bold">{currentPage}</span>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mb-2 rounded-r" onClick={handleNextPage}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExplorePost;
