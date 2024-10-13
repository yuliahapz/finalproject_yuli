import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
const CreateComment = ({ postId, onAddComment }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return // Jika comment kosong, keluar dari fungsi ini
    
    if (!comment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-comment/`,
        { postId: postId, comment : comment },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
          },
        }
      );
      // Tambah komentar ke daftar komentar
      const newComment = response.data.data;
      onAddComment(postId, newComment);
      setComment(''); // Kosongkan input setelah submit
    } catch (error) {
      setError('Failed to add comment. Please try again.');
      console.error('Error adding comment:', error);
    }
  };

  CreateComment.propTypes = {
    postId: PropTypes.string.isRequired,
    onAddComment: PropTypes.func.isRequired,
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Comment
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default CreateComment;
