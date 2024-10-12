import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Cek apakah ada token
  
  if (!token) {
    return <Navigate to="/login" replace />; // Redirect ke login jika tidak ada token
  }

  // Render `children` jika diberikan, atau `Outlet` jika tidak
  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
