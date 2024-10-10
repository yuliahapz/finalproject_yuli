import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import CreatePost from "../Pages/Post/CreatePost";
import UpdatePost from "../Pages/Post/UpdatePost";
import Profile from "../User/Profile";
import UpdateProfile from "../User/UpdateProfile";
import MyFollowers from "../User/MyFollowers";
import MyFollowing from "../User/MyFollowing";
import CreateComment from "../Pages/Comment/CreateComment";
import DeleteComment from "../Pages/Comment/DeleteComment";
import LikePost from "../Pages/Like/LikePost";
import Logout from "../Pages/Auth/Logout";
import StoryById from "../Pages/Story/StoryById";
import SearchUser from "../User/SearchUserbyId";
import ProfileSearch from "../User/ProfileSearch";
import PostById from "../Pages/Post/PostById";
import Explore from "../Pages/Post/Explore";
import Sidebar from "../Pages/Component/Sidebar";
import Home from "../Home";
import FollowUser from "../User/FollowUser";
import MyFollowingStories from "../Pages/Story/MyFollowingStories";


export const routeList =[
    {
         path : "/login",
         element: <Login />
    },
    {
        path : "/register",
        element: <Register />
    },
    {
        path : "/createpost",
        element: <CreatePost />
    },
    {
        path : "/updatepost",
        element: <UpdatePost />
    },

    {
        path : "/Profile",
        element: <Profile />
    },
    {
        path : "/updateprofile",
        element: <UpdateProfile />
    },{
        path : "/MyFollowers",
        element: <MyFollowers />
    },
    {
        path : "/MyFollowing",
        element: <MyFollowing />
    },
    {
        path : "/CreateComment",
        element: <CreateComment />
    },
    {
        path : "/DeleteComment",
        element: <DeleteComment />
    },
    {
        path : "/Likepost",
        element: <LikePost />
    },
    {
        path : "/logout",
        element : <Logout />
    },
    {   path :"/storybyid/:storyId",
        element:<StoryById />},
    {
        path : "/search",
        element : <SearchUser />
    },
    {
        path : "/profile/:id",
        element : <ProfileSearch />
    },
    {
        path : "/Post/:id",
        element : <PostById />
    },
    {
        path : "/explore",
        element : <Explore />
    },
    {
        path : "sidebar",
        element : <Sidebar />
    },
    {
        path : "home",
        element : <Home />
    },
    {
        path : "followuser",
        element : <FollowUser />
    },
    {
        path : "myfollowingstories",
        elemeny : <MyFollowingStories />
    }
    
]

export default routeList;