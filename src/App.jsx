import { useLocation, useRoutes } from 'react-router-dom';
import { routeList } from './Routes/RouteList'; // Import routeList
import Sidebar from './Pages/Component/Sidebar';
import "./index.css";
const App = () => {
  const element = useRoutes(routeList); // Generate routes from routeList
  const location = useLocation();

  const isProtectedRoute = !["/login", "/register"].includes(location.pathname); // Check if location.pathname is not "/login" or "/register
  return (  
    <div style={{ display: 'flex' }}>
      {isProtectedRoute && <Sidebar />}
      <div style={{ marginLeft: 200, flex: 1 }}> {/* Adjust content margin */}
        {element} {/* Render routed components */}
      </div>
    </div>
  );
};

export default App;