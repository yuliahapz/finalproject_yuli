import { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    if (!token){
        return <Navigate to="/login" />
    }
    return <>{Children || <Outlet />}</>
}

export default ProtectedRoute;