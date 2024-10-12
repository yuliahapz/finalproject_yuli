import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import FollowUser from "../Pages/Follow/FollowUser";
import PostByUser from "../Pages/Post/PostByUser";
import { Image, Modal } from "antd";
import { useNavigate } from 'react-router-dom';
const ProfileSearch = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingList, setFollowingList] = useState([]);
    const [followersList, setFollowersList] = useState([]);
    const [isFollowingModalVisible, setFollowingModalVisible] = useState(false);
    const [isFollowersModalVisible, setFollowersModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch user data from API
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
                setIsFollowing(response.data.data.isFollowing);
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Error fetching user data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    // Fetch following list
    const getFollowing = async () => {
        setFollowingModalVisible(true);
        try {
            const response = await axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following/${id}?size=10&page=1`, {
                headers: {
                    apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setFollowingList(response.data.data.users);
        } catch (error) {
            console.error("Error fetching following data:", error);
            toast.error("Failed to fetch following data.");
        }
    };

    // Fetch followers list
    const getFollowers = async () => {
        setFollowersModalVisible(true);
        try {
            const response = await axios.get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/followers/${id}?size=10&page=1`, {
                headers: {
                    apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setFollowersList(response.data.data.users);
        } catch (error) {
            console.error("Error fetching followers data:", error);
            toast.error("Failed to fetch followers data.");
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      };

    return (
        <div>
            {/* Profile Picture */}
            <div className="container mx-auto px-4">
                {/* Action Buttons */}
                <div className="flex justify-between p-4 mb-6">
                    <button onClick={() => navigate(-1)} className="bg-white text-xs py-1 px-2 rounded">Back</button>
                    <button onClick={handleLogout} className="bg-white text-xs py-1 px-2 rounded">Logout</button>
                </div>
    
                {/* Main Profile Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-b gap-8 mb-8 pb-4">
                    <div className="flex flex-col justify-center items-center mb-4 relative">
                        <Image
                            src={profilePictureUrl || "https://i.pinimg.com/736x/4c/7e/a6/4c7ea6b3320713b22634c68b2ee89862.jpg"}
                            alt={username}
                            width={200}
                            height={200}
                            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover mb-4"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://i.pinimg.com/736x/4c/7e/a6/4c7ea6b3320713b22634c68b2ee89862.jpg";
                            }}
                        />
                        
                        {/* Follow/Unfollow Button */}
                        <div>
                            <FollowUser userId={id} isFollowing={isFollowing} onFollowChange={setIsFollowing} />
                        </div>
                    </div>
    
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-800 mb-2">{name}</h1>
                        
                        {/* Following and Followers */}
                        <div className="flex justify-center md:justify-start space-x-6 mt-4">
                            <div className="text-center cursor-pointer" onClick={getFollowing}>
                                <p className="text-2xl font-bold text-gray-800">{totalFollowing}</p>
                                <p className="text-sm text-blue-500">Following</p>
                            </div>
                            <div className="text-center cursor-pointer" onClick={getFollowers}>
                                <p className="text-2xl font-bold text-gray-800">{totalFollowers}</p>
                                <p className="text-sm text-blue-500">Followers</p>
                            </div>
                        </div>
    
                        {/* Profile Details */}
                        <div className="mt-4 text-center md:text-left">
                            <p className="text-sm">{id}</p>
                            <p className="text-sm">{username}</p>
                            <p className="text-sm">{email}</p>
                            <p className="text-sm">{bio || 'No bio available'}</p>
                            <p className="text-sm">{phoneNumber || 'No phone number available'}</p>
                            <a
                                href={website}
                                className="text-sm"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {website}
                            </a>
                        </div>
                    </div>
                </div>
    
                {/* Posts */}
                <div
    className="w-full max-w-6xl border-gray-300 mx-auto"
    style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
>
    <PostByUser id={id} />
</div>

                
                {/* Modal for Following List */}
                <Modal
                    title="Following"
                    visible={isFollowingModalVisible}
                    onCancel={() => setFollowingModalVisible(false)}
                    footer={null}
                    width="80%"
                    centered
                >
                    <div className="mt-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search following..."
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                    <ul className="max-h-64 overflow-y-auto mt-4">
                        {followingList.length > 0 ? (
                            followingList
                                .filter((user) =>
                                    user.username.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((user) => (
                                    <li key={user.id} className="flex items-center space-x-4 mt-4 justify-center">
                                        <img
                                            src={user.profilePictureUrl || "https://i.pinimg.com/736x/4c/7e/a6/4c7ea6b3320713b22634c68b2ee89862.jpg"}
                                            alt={user.username}
                                            className="w-10 h-10 rounded-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://i.pinimg.com/736x/4c/7e/a6/4c7ea6b3320713b22634c68b2ee89862.jpg";
                                            }}
                                        />
                                        <span>{user.username}</span>
                                    </li>
                                ))
                        ) : (
                            // eslint-disable-next-line react/no-unescaped-entities
                            <p>You don't follow anyone yet.</p>
                        )}
                    </ul>
                </Modal>
    
                {/* Modal for Followers List */}
                <Modal
                    title="Followers"
                    visible={isFollowersModalVisible}
                    onCancel={() => setFollowersModalVisible(false)}
                    footer={null}
                    width="80%"
                    centered
                >
                    <div className="mt-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search followers..."
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                    <ul className="max-h-64 overflow-y-auto mt-4">
                        {followersList.length > 0 ? (
                            followersList
                                .filter((user) =>
                                    user.username.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((user) => (
                                    <li key={user.id} className="flex items-center space-x-4 mt-4 justify-center">
                                        <img
                                            src={user.profilePictureUrl || "https://i.pinimg.com/736x/4c/7e/a6/4c7ea6b3320713b22634c68b2ee89862.jpg"}
                                            alt={user.username}
                                            className="w-10 h-10 rounded-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://i.pinimg.com/736x/4c/7e/a6/4c7ea6b3320713b22634c68b2ee89862.jpg";
                                            }}
                                        />
                                        <span>{user.username}</span>
                                    </li>
                                ))
                        ) : (
                            <p>No followers yet.</p>
                        )}
                    </ul>
                </Modal>
            </div>
        </div>
    );    
};

export default ProfileSearch;