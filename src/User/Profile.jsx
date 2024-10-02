import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MyFollowing from "./MyFollowing";
import MyFollowers from "./MyFollowers";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [totalFollowing, setTotalFollowing] = useState(0);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user profile data
    axios
      .get("https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user", {
        headers: {
          apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
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
        } = response.data.data;

        setUsername(username);
        setName(name);
        setEmail(email);
        setProfilePictureUrl(profilePictureUrl);
        setPhoneNumber(phoneNumber);
        setBio(bio);
        setWebsite(website);
        setTotalFollowing(totalFollowing);
        setTotalFollowers(totalFollowers);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch profile data. Please try again later.");
      });
  }, [navigate]);

  const handleFollowingClick = () => {
    navigate("/myfollowing");
    setShowFollowing(true);
    setShowFollowers(false);
  };

  const handleFollowersClick = () => {
    navigate("/myfollowers");
    setShowFollowers(true);
    setShowFollowing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white p-8 mt-12 rounded-lg shadow-lg max-w-2xl w-full">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <div className="relative w-28 h-28">
            <img
              src={profilePictureUrl || "default-profile.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <button
              className="absolute inset-x-0 bottom-0 bg-blue-500 text-white text-sm py-1 px-3 rounded-full transform hover:bg-blue-600 transition duration-200"
              onClick={() => navigate("/updateprofile")}
            >
              Edit Profile
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2 text-center">{username}</h1>
            <p className="text-gray-500 mb-2 text-center">{name}</p>
            <p className="text-gray-600 mb-2 text-center">{email}</p>
            <p className="text-gray-600 text-center">{phoneNumber}</p>
          </div>
        </div>

        {/* Bio and Website */}
        <div className="mt-6 border-t pt-4">
          <p className="text-gray-700">{bio}</p>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline block mt-2"
            >
              {website}
            </a>
          )}
        </div>

        {/* Follow Info */}
        <div className="mt-8 flex justify-around items-center text-center">
          <div onClick={handleFollowingClick} className="cursor-pointer">
            <p className="text-2xl font-bold">{totalFollowing}</p>
            <p className="text-gray-600">Following</p>
          </div>
          <div onClick={handleFollowersClick} className="cursor-pointer">
            <p className="text-2xl font-bold">{totalFollowers}</p>
            <p className="text-gray-600">Followers</p>
          </div>
        </div>

        {/* Following and Followers Lists */}
        {showFollowing && <MyFollowing />}
        {showFollowers && <MyFollowers />}
      </div>
    </div>
  );
};

export default Profile;
