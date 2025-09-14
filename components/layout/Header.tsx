
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MenuIcon } from '../icons';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none md:hidden">
          <MenuIcon className="h-6 w-6" />
        </button>
        <div className="relative mx-4 md:mx-0">
          <span className="text-xl font-semibold text-gray-700">Welcome, {user?.name || 'User'}!</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
            <span className="text-right">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
            </span>
            <img className="h-10 w-10 rounded-full object-cover ml-4" src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="User avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
