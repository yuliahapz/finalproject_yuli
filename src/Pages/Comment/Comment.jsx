import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comment = () => {
    const [comments, setComment] = useState(null);
    const { id } = useParams(); // Get the post ID from the URL parameters

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/post/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
                    },
                });
                console.log(response.data.data);
                const fetchedComment = response.data.data; // Adjusted to get the correct data structure
                setComment(fetchedComment);
            } catch (error) {
                console.error("Error fetching comment:", error);
            }
        };

        fetchComment();
    }, [id]);

    return (
        <div className="comment">
            {comments ? (
                <>
                    <h2>{comments.caption}</h2>
                    <p>{comments.comment}</p>
                </>
            ) : (
                <p>Loading comment...</p>
            )}
        </div>
    );
};

export default Comment;
