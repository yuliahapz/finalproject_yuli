import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const PostByUser = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post/${id}?size=10&page=${currentPage}`,
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPosts();
  }, [id, currentPage]);

  PostByUser.propTypes = {
    id: PropTypes.string.isRequired,
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

  const Pagination = () => (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3H8.25m12.75 0a9 9 0 1 0-18 0 9 9 0 0 0 18 0Z" />
        </svg>
      </button>
    </div>
  );

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex overflow-x-auto space-x-4 py-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-64 h-64 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => handlePostClick(post)}
            />
            {isModalOpen && selectedPost === post && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full">
                  <div className="flex justify-end p-2">
                    <button className="text-gray-500 hover:text-gray-700" onClick={toggleModal}>
                      x
                    </button>
                  </div>
                  <div className="p-4">
                    <img
                      src={post.imageUrl || "https://carapandang.com/uploads/news/DsqaUeQGqut5MUneFABnolWx6FUpK58kqHPscu2w.jpg"}
                      alt={post.caption || 'Post image'}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default PostByUser;
