import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { menuOptions } from '../constants';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-full shadow-md">
      <div className={`fixed z-20 inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 bg-gray-100 w-64`}>
        <div className="flex items-center justify-between p-4 bg-gray-300 h-20 shadow-md">
          <h1 className="text-lg font-bold">KYC Hub</h1>
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            ✖
          </button>
        </div>
        <nav className="mt-10">
          {menuOptions.map(option => (
            <NavLink 
              key={option.route} 
              to={option.route} 
              className={({ isActive }) => 
                `block px-4 py-2 m-2 text-md font-semibold rounded hover:bg-gray-300 ${isActive ? 'bg-gray-500 text-white' : 'bg-gray-200'}`
              }
            >
              {option.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex-1">
        <button className="md:hidden p-4 text-gray-500 bg-gray-300 h-20" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
