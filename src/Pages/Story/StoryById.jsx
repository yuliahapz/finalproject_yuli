import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StoryById = () => {
    const [story, setStory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const navigate = useNavigate();
    const { storyId } = useParams(); // Ensure the parameter is in lowercase and matches your route

    useEffect(() => {
        const fetchStory = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if no token
                return;
            }
            try {
                const response = await axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/story/${storyId}`, {
                    headers: {
                        apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStory(response.data.data); // Assuming the response structure
            } catch (error) {
                console.error("Error fetching story:", error);
            }
        };
        fetchStory();
    }, [storyId, navigate]); // Make sure to include storyId and navigate in dependencies
   
    if (!story) return <div>Loading...</div>;

    // Function to open and close the modal
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div className="flex flex-col items-center">
            {/* Story image */}
            <img 
                src={story.imageUrl} 
                alt={story.caption} 
                className="w-24 h-24 rounded-full object-cover cursor-pointer" 
                onClick={toggleModal} // Open modal on click
            />
            <p className="mt-2 text-center">{story.caption}</p>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={toggleModal}>
                    <div className="bg-white p-4 rounded-lg relative" onClick={(e) => e.stopPropagation()}>
                        {/* X button to close the modal */}
                        <button 
                            className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-900"
                            onClick={toggleModal}
                        >
                            &times; {/* HTML entity for the 'X' symbol */}
                        </button>
                        {/* Story image inside the modal */}
                        <img 
                            src={story.user?.profilePictureUrl || "https://www.wowkeren.com/images/photo/dua_lipa.jpg"}
                            alt={story.user?.username}
                            className="w-24 h-24 rounded-full object-cover"
                            onError={(e) => e.target.src = "https://www.wowkeren.com/images/photo/dua_lipa.jpg"}
                        />
                        <p className="mt-2 bold text-center">{story.user?.username}</p>
                        <img 
                            src={story.imageUrl || "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2000/activities/yxifjtwljrke7iurjkpb/DisneylandResortinCaliforniaThemeParkTickets-Klook.jpg"} 
                            alt={story.name} 
                            className="max-w-full max-h-[80vh] object-cover"
                            onError={(e) => e.target.src = "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2000/activities/yxifjtwljrke7iurjkpb/DisneylandResortinCaliforniaThemeParkTickets-Klook.jpg"}
                        />
                        <p>{story.caption}</p>
                        <pre>{story.createdAt|| toLocaleDateString}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoryById;
