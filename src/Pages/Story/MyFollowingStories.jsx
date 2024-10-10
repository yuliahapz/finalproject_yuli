import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyFollowingStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

useEffect(() => {
    const fetchStories = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Token is missing. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-story?size=10&page=1`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Use the token from localStorage
                        apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
                    },
                }
            );

            const fetchedStories = response.data.data.stories;
            if (Array.isArray(fetchedStories)) {
                setStories(fetchedStories);
                console.log(response.data.data);
            } else {
                throw new Error("No stories found or data is not an array");
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleError = (error) => {
        if (error.response) {
            setError(`Error: ${error.response.data.message}`);
            toast.error(`Error: ${error.response.data.message}`);
        } else if (error.request) {
            setError("Network error: Please check your connection.");
            toast.error("Network error: Please check your connection.");
        } else {
            setError(`Error: ${error.message}`);
            toast.error(`Error: ${error.message}`);
        }
    };

    fetchStories();
}, []);

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>{error}</div>;
}

return (
    <div className="p-4">
    {stories.length === 0 ? (
        <p>No stories found.</p>
    ) : ( 
        <div className="grid grid-cols-3 gap-4">
            {stories.map((story) => (
                <div key={story.id} className="flex-shrink-0 text-center">
                    <Link to={`/storybyid/${story.id}`}>
                                <img
                                    src={story.user?.profilePictureUrl || "/default-profile.png"}
                                    alt={story.user?.username || "Unknown User"}
                                    className={`w-24 h-24 rounded-full border-4 ${
                                        story.isViewed ? 'border-gray-400' : 'border-pink-500'
                                    } p-1`}
                                />
                            </Link>
                            <p className="mt-2 text-sm">{story.user?.username || "Erika"}</p>
                </div>
            ))}
        </div>
    )}
    </div>
)};
export default MyFollowingStories;