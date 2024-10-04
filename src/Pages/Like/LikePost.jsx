// src/components/LikePost.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LikePost = () => {
    const [likePost, setLikePost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch liked posts
        axios.post('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/like', {}, {
            headers: {
                Authorization: `Bearer ${token}`, 
                apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
            },
        })
        .then((response) => {
            setLikePost(response.data.data.posts);
        })
        .catch((error) => {
            console.error('Error fetching liked posts:', error);
        });
    }, [navigate]);

    return (
        <div>
            <h1>Liked Posts</h1>
            {likePost.length > 0 ? (
                likePost.map((post) => (
                    <div key={post.id}>
                        <p>{post.caption}</p>
                        <img src={post.imageUrl} alt={post.caption} />
                    </div>
                ))
            ) : (
                <p>No liked posts available.</p>
            )}
        </div>
    );
};

export default LikePost;
