import ProtectedRoute from "../Routes/ProtectedRoute"; // Import ProtectedRoute
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
import FollowUser from "../Pages/Follow/FollowUser";
import MyFollowingStories from "../Pages/Story/MyFollowingStories";
import PostByUser from "../Pages/Post/PostByUser";

export const routeList = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/createpost",
    element: (
      <ProtectedRoute>
        <CreatePost />
      </ProtectedRoute>
    )
  },
  {
    path: "/updatepost",
    element: (
      <ProtectedRoute>
        <UpdatePost />
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: "/updateprofile",
    element: (
      <ProtectedRoute>
        <UpdateProfile />
      </ProtectedRoute>
    )
  },
  {
    path: "/myfollowers",
    element: (
      <ProtectedRoute>
        <MyFollowers />
      </ProtectedRoute>
    )
  },
  {
    path: "/myfollowing",
    element: (
      <ProtectedRoute>
        <MyFollowing />
      </ProtectedRoute>
    )
  },
  {
    path: "/createcomment",
    element: (
      <ProtectedRoute>
        <CreateComment />
      </ProtectedRoute>
    )
  },
  {
    path: "/deletecomment",
    element: (
      <ProtectedRoute>
        <DeleteComment />
      </ProtectedRoute>
    )
  },
  {
    path: "/likepost",
    element: (
      <ProtectedRoute>
        <LikePost />
      </ProtectedRoute>
    )
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/storybyid/:storyId",
    element: (
      <ProtectedRoute>
        <StoryById />
      </ProtectedRoute>
    )
  },
  {
    path: "/search",
    element: (
      <ProtectedRoute>
        <SearchUser />
      </ProtectedRoute>
    )
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute>
        <ProfileSearch />
      </ProtectedRoute>
    )
  },
  {
    path: "/post/:id",
    element: (
      <ProtectedRoute>
        <PostById />
      </ProtectedRoute>
    )
  },
  {
    path: "/explore",
    element: (
      <ProtectedRoute>
        <Explore />
      </ProtectedRoute>
    )
  },
  {
    path: "/sidebar",
    element: (
      <ProtectedRoute>
        <Sidebar />
      </ProtectedRoute>
    )
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  {
    path: "/followuser",
    element: (
      <ProtectedRoute>
        <FollowUser />
      </ProtectedRoute>
    )
  },
  {
    path: "/myfollowingstories",
    element: (
      <ProtectedRoute>
        <MyFollowingStories />
      </ProtectedRoute>
    )
  },
  {
    path: "/postbyuser",
    element: (
      <ProtectedRoute>
        <PostByUser />
      </ProtectedRoute>
    )
  }
];

export default routeList;
