import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import CreatePost from "../Pages/Post/CreatePost";
import Dashboard from "../Pages/Dashboard";
import UpdatePost from "../Pages/Post/UpdatePost";

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
    }
]

export default routeList;