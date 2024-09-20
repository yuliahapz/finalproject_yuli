import { Navigate } from "react-router-dom";
import Login from "../component/Authentication/Login";
import Register from "../component/Authentication/Register";
import Categories from "../Sport_Category/Categories";

export const routeList = [
    {
        path: "/",
        element: <Navigate to="/dashboard" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <Categories />,
    }
]

export default routeList;