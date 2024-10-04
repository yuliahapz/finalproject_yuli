import axios from "axios";
import { useState } from "react";

const DeleteComment = ({ commentId }) => {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Token is missing. Please log in again.");
            return;
        }

        axios.delete(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/delete-comment/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
            },
        })
        .then((response) => {
            if (response.status === 200) {
                toast.success("Comment deleted successfully!");
                setIsDeleted(true); // Mark the comment as deleted
            } else {
                toast.error("Failed to delete the comment.");
            }
        })
        .catch((error) => {
            toast.error("Error occurred: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div>
            <Toaster />
            {isDeleted ? (
                <p>Comment Deleted</p>
            ) : (
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                    Delete Comment
                </button>
            )}
        </div>
    );
};

export default DeleteComment;
