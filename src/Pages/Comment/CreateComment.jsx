import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const CreateComment = ({ postId, onAddComment, onClose }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = e.target[0].value;
    
    try {
      const response = await axios.post(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-comment/`,
        { postId, comment: newComment }, // Include postId in the request body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
          },
        }
      );
      // Handle successful response from server
      onAddComment(postId, response.data);
      setComment(''); // Clear input field
      Navigate('/explore');
    } catch (error) {
      // Handle error
      setError('Failed to add comment. Please try again.'); // Example error message
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2">
          Comment
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default CreateComment;