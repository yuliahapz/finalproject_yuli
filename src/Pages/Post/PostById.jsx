import { Image } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostById = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Extract 'id' from the URL
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
          },
        });

        // Filter the posts to find the one matching the ID
        const foundPost = response.data.data.posts.find(post => post.id === id);
        setPost(foundPost); // Set the post if found
      } catch (error) {
        console.log(response.data.data.posts);
        console.error("Error fetching posts:", error);
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id]); // Re-fetch when id changes

  if (isLoading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h1>Post with ID: {id}</h1>
      {post ? (
        <div className="max-w-md overflow-hidden shadow-lg rounded-lg bg-white">
          <Image
            className="rounded"
            width={300}
            height={300}
            src={post.imageUrl}
            alt={post.caption || 'Post image'}
          />
          <div className="px-6 py-4">
            <h5>Uploaded by: {post.user ? post.user.username : 'Unknown User'}</h5>
            <h2>{post.caption || 'No caption available'}</h2>
            <p>Likes: {post.totalLikes}</p>
            <p>Comments: {post.totalComments || 0}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(post.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostById;
