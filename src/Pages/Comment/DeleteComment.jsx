// DeleteComment.jsx
import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { TrashIcon } from '@heroicons/react/24/outline';

const DeleteComment = ({ postId, COMMENT_ID, onDeleteComment }) => {
    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.delete(
                `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/delete-comment/${COMMENT_ID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b'
                    }
                }
            );

            if (response.status === 200) {
                toast.success("Comment deleted successfully!");
                onDeleteComment(postId, COMMENT_ID); // Panggil fungsi di Dashboard untuk memperbarui UI
            } else {
                toast.error("Failed to delete comment.");
            }
        } catch (error) {
            toast.error("Error: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <button onClick={handleDelete}>
            <TrashIcon className="h-5 w-5 text-red-500" />
        </button>
    );
};

export default DeleteComment;
