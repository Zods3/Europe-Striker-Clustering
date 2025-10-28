import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFutbol } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-lg shadow-md border-b border-indigo-100">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
            <FaFutbol className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            StrikerMap
          </h1>
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/" isActive={isActive("/")}>Home</NavLink>
          <NavLink to="/search" isActive={isActive("/search")}>Search</NavLink>
          <NavLink to="/visualization" isActive={isActive("/visualization")}>Visualization</NavLink>
          <NavLink to="/help" isActive={isActive("/help")}>Help</NavLink>
          <NavLink to="/about" isActive={isActive("/about")}>About</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-indigo-50 transition-colors">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

function NavLink({ to, children, isActive }) {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        isActive
          ? "text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md"
          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
      }`}
    >
      {children}
    </Link>
  );
}

export default Navbar;