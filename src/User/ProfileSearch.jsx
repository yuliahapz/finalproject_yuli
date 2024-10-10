import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import FollowUser from './FollowUser'; // Import FollowUser component

const ProfileSearch = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false); // State to manage follow status
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user/${id}`, {
                    headers: {
                        apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUser(response.data.data);
                setIsFollowing(response.data.data.isFollowing); // Assuming API returns follow status
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Error fetching user data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!user) {
        return <div className="flex justify-center items-center min-h-screen">User not found.</div>;
    }

    const {
        username,
        name,
        email,
        profilePictureUrl,
        phoneNumber,
        bio,
        website,
        totalFollowing,
        totalFollowers,
    } = user;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 p-6">
            <Toaster />
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                        <img
                            src={profilePictureUrl || "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"}
                            alt={name}
                            className="w-full h-full rounded-full object-cover shadow-lg transition duration-300 hover:shadow-xl"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww";
                            }}
                        />
                    </div>
                    <h1 className="text-4xl font-semibold text-gray-800 mb-1 text-center">{name}</h1>
                    <p className="text-lg text-indigo-600 mb-3">@{username}</p>
                    <p className="text-gray-700 text-center mb-2">{email}</p>
                    <p className="text-gray-600 text-center mb-4">{phoneNumber || "No phone number"}</p>
                    <p className="text-gray-600 text-center mb-6 max-w-xs">{bio || "No bio available."}</p>
                    {website && (
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800 mb-6 transition duration-300"
                        >
                            {website}
                        </a>
                    )}
                    <div className="flex justify-between items-center w-full mt-4 px-12">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">{totalFollowing}</p>
                            <p className="text-sm text-gray-500">Following</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">{totalFollowers}</p>
                            <p className="text-sm text-gray-500">Followers</p>
                        </div>
                    </div>
                    {/* Follow/Unfollow Button */}
                    <div className="mt-6">
                        <FollowUser userId={id} isFollowing={isFollowing} onFollowChange={setIsFollowing} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSearch;
