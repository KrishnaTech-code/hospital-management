
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DashboardIcon, CalendarIcon, UsersIcon, LogoutIcon } from '../icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClasses = "flex items-center px-4 py-3 text-gray-200 hover:bg-primary-dark hover:text-white rounded-lg transition-colors duration-200";
  const activeNavLinkClasses = "bg-primary-dark text-white";

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`fixed md:relative inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-dark text-white flex flex-col z-30 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">HMS</h1>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          <NavLink to="/dashboard" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setSidebarOpen(false)}>
            <DashboardIcon className="h-6 w-6 mr-3" />
            Dashboard
          </NavLink>
          <NavLink to="/appointments" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setSidebarOpen(false)}>
            <CalendarIcon className="h-6 w-6 mr-3" />
            Appointments
          </NavLink>
          <NavLink to="/patients" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setSidebarOpen(false)}>
            <UsersIcon className="h-6 w-6 mr-3" />
            Patients
          </NavLink>
        </nav>
        <div className="px-4 py-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-gray-200 hover:bg-danger hover:text-white rounded-lg transition-colors duration-200">
            <LogoutIcon className="h-6 w-6 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
