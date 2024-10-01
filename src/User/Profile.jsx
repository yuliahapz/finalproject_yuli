import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profilePictureUrl, setProfilePictureUrl] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [bio, setBio] = useState();
  const [website, setWebsite] = useState();
  const [totalFollowing, setTotalFollowing] = useState();
  const [totalFollowers, setTotalFollowers] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user", {
        headers: {
          apiKey: "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const {
          id,
          username,
          name,
          email,
          profile_picture_url,
          phone_number,
          bio,
          website,
          total_following,
          total_followers,
        } = response.data.data;

        setId(id);
        setUsername(username);
        setName(name);
        setEmail(email);
        setProfilePictureUrl(profile_picture_url);
        setPhoneNumber(phone_number);
        setBio(bio);
        setWebsite(website);
        setTotalFollowing(total_following);
        setTotalFollowers(total_followers);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch profile data. Please try again later.");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white p-6 mt-8 rounded-lg shadow-lg max-w-xl w-full">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24">
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{username}</h1>
            <p className="text-gray-600">{name}</p>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-600">{phoneNumber}</p>
          </div>
        </div>

        {/* Bio and Website */}
        <div className="mt-4">
          <p className="text-gray-800">{bio}</p>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {website}
            </a>
          )}
        </div>

        {/* Follow Info */}
        <div className="mt-6 flex space-x-8 justify-center">
          <div className="text-center">
            <p className="text-lg font-bold">{totalFollowing}</p>
            <p className="text-gray-600">Following</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{totalFollowers}</p>
            <p className="text-gray-600">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
