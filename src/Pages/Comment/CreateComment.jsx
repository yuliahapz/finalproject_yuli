import { useState } from 'react';
import axios from 'axios';

const CreateComment = ({ postId, onAddComment }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-comment/`,
        { postId, comment },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
          },
        }
      );
      // Tambah komentar ke daftar komentar
      onAddComment(response.data.comment);
      setComment(''); // Kosongkan input setelah submit
    } catch (error) {
      setError('Failed to add comment. Please try again.');
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Comment
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default CreateComment;
