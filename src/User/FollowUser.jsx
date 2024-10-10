import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

export const FollowUser = ({ userId, isFollowing, onFollowChange }) => {
    const [loading, setLoading] = useState(false);

    const handleFollowToggle = async () => {
        setLoading(true);
        try {
            if (isFollowing) {
                // Unfollow request
                await axios.post(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/unfollow`, 
                { userIdFollow: userId },
                {
                    headers: {
                        apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                toast.success("User unfollowed!");
            } else {
                // Follow request
                await axios.post(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/follow`, 
                { userIdFollow: userId },
                {
                    headers: {
                        apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                toast.success("User followed!");
            }
            onFollowChange(!isFollowing); // Update follow status
        } catch (error) {
            console.error("Error updating follow status:", error);
            toast.error("Failed to update follow status.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`px-6 py-2 rounded-lg font-semibold transition duration-300 
                        ${isFollowing ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'}
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleFollowToggle}
            disabled={loading}
        >
            {loading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowUser;
