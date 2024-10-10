import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SearchUser  = () => {
    const [id, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [user, setUser ] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!id.trim()) {
            toast.error("ID cannot be empty.");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Token is missing. Please log in again.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user/${id}`, {
                headers: {
                    apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser (response.data.data);
            setIsModalOpen(true);
            toast.success("User  found!");
        } catch (error) {
            console.error("Error fetching user:", error);
            toast.error("User  not found.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUser (null);
    };

    const navigateToProfile = () => {
        closeModal();
        navigate(`/profile/${id}`);
    };

    return (
        <div>
            <Toaster />
            <form onSubmit={handleSearch} className="mb-4">
                <input 
                    type="text" 
                    value={id || email || name} 
                    onChange={handleInputChange} 
                    placeholder="Enter user ID, name, or email"
                    className="border p-2 rounded mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 relative z-50">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
                            &times;
                        </button>
                        {user && (
                            <div className="flex flex-col items-center">
                                <img 
                                    src={user.imageUrl} 
                                    alt={user.name} 
                                    className="w-24 h-24 rounded-full object-cover mb-2"
                                />
                                <p className="text-lg font-bold">{user.name}</p>
                                <p>{user.email}</p>
                                <button onClick={navigateToProfile} className="mt-4 bg-green-500 text-white py-1 px-3 rounded">
                                    View Profile
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="fixed inset-0" onClick={closeModal}></div>
                </div>
            )}
        </div>
    );
};

export default SearchUser ;