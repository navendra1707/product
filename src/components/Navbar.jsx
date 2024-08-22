import React from 'react';
import { useLocation } from 'react-router-dom';
import { menuOptions } from '../constants';

const Navbar = () => {
  const location = useLocation();

  const currentPage = menuOptions.find(option => option.route === location.pathname)?.name || 'Page Not Found';

  return (
    <div className="bg-gray-300 md:bg-gray-100 min-h-20 w-full flex flex-col md:flex-row items-center justify-between px-4 shadow-md">
      <div className="text-lg font-semibold">
        {currentPage}
      </div>
      <div className="flex items-center space-x-4 mt-2 md:mt-0">
        <button className="text-gray-600">Settings</button>
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://via.placeholder.com/150"
            alt="User Avatar"
          />
          <span className="font-semibold text-gray-700">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
