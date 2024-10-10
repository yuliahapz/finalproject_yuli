import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routeList } from './Routes/RouteList'; // Import routeList
import Sidebar from './Pages/Component/Sidebar';
const App = () => {
  const element = useRoutes(routeList); // Generate routes from routeList
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: 200, flex: 1 }}> {/* Adjust content margin */}
        {element} {/* Render routed components */}
      </div>
    </div>
  );
};

export default App;