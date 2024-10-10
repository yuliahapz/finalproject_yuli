import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage the state of the popup
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from local storage
    navigate('/login');  // Redirect to the login page
  };

  const openModal = () => setIsOpen(true); // Open confirmation popup
  const closeModal = () => setIsOpen(false); // Close confirmation popup

  return (
    <div>
      {/* Logout Button */}
      <button 
        onClick={openModal} 
        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>

      {/* Logout Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-center mb-4">Confirm Logout</h2>
            <p className="text-center mb-6">Are you sure you want to log out?</p>
            
            <div className="flex justify-between">
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
              <button 
                onClick={closeModal} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
