import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { TrashIcon, PencilSquareIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline"; 
import { Image } from "antd";
import { toggleLike } from '../Like/LikePost';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const MyPost = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!id) return
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post/${id}?size=10&page=${currentPage}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
          },
        });

        const fetchedPosts = Array.isArray(response.data.data.posts) ? response.data.data.posts : [];  
        const sortedPosted = fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosted);
        setTotalPages(response.data.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching posts:', error.response ? error.response.data : error.message);
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id, currentPage]);

  const toggleDropdown = (postId) => {
    setDropdownOpen(dropdownOpen === postId ? null : postId);
  };

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

  if (loading) {
    return <div>Loading...</div>; // Consider adding a loading spinner
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Posts</h1>
    
    {posts.length === 0 ? (
      <p className="text-center text-gray-500">No posts found.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
            {/* Image Section */}
            <Image
              src={post.imageUrl}
              alt="Post Image"
              className="w-full h-48 object-cover"
            />
            
            {/* Post Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">{post.caption}</h2>
              <p className="text-sm text-gray-600 my-2">{post.body}</p>
              
              {/* Like Button & Count */}
              <div className="flex items-center mt-2">
                <button
                  onClick={() => toggleLike(post.id, post.isLike, setPosts)}
                  aria-label={post.isLike ? "Unlike" : "Like"}
                >
                  {post.isLike ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIconOutline className="h-6 w-6 text-gray-400" />
                  )}
                </button>
                <span className="ml-2 text-gray-600 text-sm">{post.totalLikes || 0} likes</span>
              </div>
            </div>
  
            {/* Post Actions (Edit/Delete) */}
            <div className="absolute top-2 right-2">
              <button onClick={() => toggleDropdown(post.id)} aria-label="More options">
                <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
              </button>
              {dropdownOpen === post.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <button
                    onClick={() => navigate(`/UpdatePost/${post.id}`)}
                    className="flex items-center p-2 hover:bg-gray-100 w-full text-left"
                    aria-label="Edit Post"
                  >
                    <PencilSquareIcon className="h-5 w-5 mr-2 text-gray-700" />
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/DeletePost/${post.id}`)}
                    className="flex items-center p-2 hover:bg-gray-100 w-full text-left"
                    aria-label="Delete Post"
                  >
                    <TrashIcon className="h-5 w-5 mr-2 text-red-600" />
                    Delete
                  </button>
                </div>
              )}
            </div>
  
            {/* Post Date Info */}
            <div className="px-4 pb-4">
              <p className="text-xs text-gray-400">Created: {new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="text-xs text-gray-400">Updated: {new Date(post.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    )}
    
    {/* Pagination */}
    <div className="flex justify-center mt-8">
      <button
        className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-l ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-white text-gray-800">{currentPage}</span>
      <button
        className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-r ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
  );
};

MyPost.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MyPost;
