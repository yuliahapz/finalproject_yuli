import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import CreatePost from "../Pages/Post/CreatePost";
import Dashboard from "../Pages/Dashboard";
import UpdatePost from "../Pages/Post/UpdatePost";
import Profile from "../User/Profile";
import UpdateProfile from "../User/UpdateProfile";
import MyFollowers from "../User/MyFollowers";
import MyFollowing from "../User/MyFollowing";

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
        path : "/",
        element: <Dashboard />
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
    }
]

export default routeList;