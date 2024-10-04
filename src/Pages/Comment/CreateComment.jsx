// CommentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; // Pastikan untuk menginstal react-hot-toast

const CommentForm = ({ postId, onAddComment, onClose }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return; // Jangan lakukan apa-apa jika komentar kosong

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Token is missing. Please log in again.");
            return;
        }

        try {
            const response = await axios.post(
                "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-comment",
                { comment, postId }, 
                { headers: { 
                    Authorization: `Bearer ${token}`, 
                    apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b" 
                } }
            );

            if (response.status === 200) {
                toast.success("Comment created successfully!");
                setComment(''); // Reset input
                onAddComment(postId, comment); // Panggil fungsi untuk menambah komentar ke state utama
                onClose(); // Close the modal after adding comment
            } else {
                toast.error("Failed to create comment. Please try again.");
            }
        } catch (error) {
            toast.error("Error occurred: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <Toaster />
            <form onSubmit={handleSubmit} className="flex flex-col mb-3">
                <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="3"
                    className="p-2 mb-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    placeholder="Write a comment..."
                    required
                />
                <button 
                    type="submit"
                    className="mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
