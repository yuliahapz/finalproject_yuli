import React, { useState, useEffect } from 'react';
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
        if (error.response) {
          setError(`Error: ${error.response.data.message}`);
        } else if (error.request) {
          setError('Network error: Please check your connection.');
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/comments`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
            },
          }
        );
        const commentsData = response.data;
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [currentPage]);

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
    // Update posts state to reflect new comment
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex">
      <div className="container mx-auto p-4 flex-1">
        {posts.map((post) => (
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
                /></Link>

                <Link to={`/profile/${post.user?.id}`}><h2 className="text-lg font-bold">{post.user?.username || 'Sarah'}</h2></Link>
              </div>
              <div className="flex justify-center mb-4">
  <img
    src={post.imageUrl}
    alt={post.caption}
    className= "w-full h-full object-cover rounded-lg"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = 'https://cdn1-production-images-kly.akamaized.net/J_qaSn7xpC5d-kbHx-wCsOiFsuY=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4770934/original/018943800_1710311605-mountains-8451480_1280.jpg';
    }}
  />
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
              <div className="mt-4">
      <h2>Comments:</h2>
      {comments[post.id] && comments[post.id].map((comment) => (
        <div key={comment.id} className="mb-2">
          <span className="font-bold">{comment.user.username}:</span> {comment.comment}
        </div>
      ))}
    </div>
              {/* Integrasikan CreateComment */}
              <CreateComment postId={post.id} onAddComment={handleCommentAdded} />
              
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
        <span className="block text-center mt-4">{currentPage} of {totalPages}</span>
      </div>
    </div>
  );
};

export default ExplorePost;