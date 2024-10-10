import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toggleLike } from '../Like/LikePost';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = () => {
      const token = localStorage.getItem("token");

      axios
        .get(
          `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post?size=10&page=${currentPage}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
            },
          }
        )
        .then((response) => {
          const fetchedPosts = response.data.data.posts;
          if (Array.isArray(fetchedPosts)) {
            setPosts(fetchedPosts);
            setTotalPages(response.data.data.totalPages);
            fetchedPosts.forEach((post) => {
              setComments((prevComments) => ({ ...prevComments, [post.id]: [] }));
            });
          } else {
            throw new Error("No posts found or data is not an array");
          }
        })
        .catch((error) => {
          if (error.response) {
            setError(`Error: ${error.response.data.message}`);
          } else if (error.request) {
            setError("Network error: Please check your connection.");
          } else {
            setError(`Error: ${error.message}`);
          }
        })
        .finally(() => setLoading(false));
    };

    fetchPosts();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex">
    <aside class="h-screen sticky top-0">
    <Sidebar /> {/* Fixed Sidebar */}
    <div className="container mx-auto p-4 flex-1">
      {posts.map((post) => (
        <div key={post.id} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-center mb-4">
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://cdn1-production-images-kly.akamaized.net/J_qaSn7xpC5d-kbHx-wCsOiFsuY=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4770934/original/018943800_1710311605-mountains-8451480_1280.jpg';
              }}
            />
          </div>
          <div className="flex items-center ml-4 mb-4">
            <button onClick={() => toggleLike(post.id, post.isLike, setPosts)}>
              {post.isLike ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-500">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003. 001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              )}
            </button>
            <span className="text-sm text-gray-600 ml-2">{post.totalLikes || 0} likes</span>
          </div>
          <div className="px-4">
            <div className="flex items-center mb-4">
              <img
                src={post.user?.profilePictureUrl || "https://image.popmama.com/content-images/community/20240226/community-1983993eeb1b957b1909c5d64695189e.jpeg?1708934772"}
                alt={post.user?.username}
                className="w-8 h-8 mr-4 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcX9fmFcz6aeB7fkS13C5Rb4C8Yca7x0HNx9lc_8DsHsJp8BM3iWNnEhU70b3BHe4_OCM&usqp=CAU";
                }}
              />
              <h2 className="text-lg font-bold mb-2">{post.user?.username || "Sarah"}</h2>
            </div>
            <p className="text-gray-600 mb-4">{post.caption}</p>
            <form>
              <input type="text" placeholder="Enter your comment" className="w-full p-2 mb-2 border border-gray-300 rounded-lg" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Comment</button>
            </form>
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
    </aside>
  </div>
);
};

export default Home;