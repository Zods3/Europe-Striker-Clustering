import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFutbol } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ⭐ TAMBAH INI
  
  const isActive = (path) => location.pathname === path;
  
  // ⭐ TAMBAH FUNGSI INI
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-lg shadow-md border-b border-indigo-100">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
          <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
            <FaFutbol className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            StrikerMap
          </h1>
        </Link>

        {/* Menu Links Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/" isActive={isActive("/")}>Home</NavLink>
          <NavLink to="/search" isActive={isActive("/search")}>Search</NavLink>
          <NavLink to="/visualization" isActive={isActive("/visualization")}>Visualization</NavLink>
          <NavLink to="/help" isActive={isActive("/help")}>Help</NavLink>
          <NavLink to="/about" isActive={isActive("/about")}>About</NavLink>
        </div>

        {/* Mobile Menu Button - ⭐ TAMBAH onClick */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isMenuOpen ? (
            // Icon X
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Icon hamburger
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ⭐ TAMBAH MOBILE MENU INI */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-2 bg-white border-t border-indigo-100">
          <MobileNavLink to="/" isActive={isActive("/")} onClick={closeMenu}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/search" isActive={isActive("/search")} onClick={closeMenu}>
            Search
          </MobileNavLink>
          <MobileNavLink to="/visualization" isActive={isActive("/visualization")} onClick={closeMenu}>
            Visualization
          </MobileNavLink>
          <MobileNavLink to="/help" isActive={isActive("/help")} onClick={closeMenu}>
            Help
          </MobileNavLink>
          <MobileNavLink to="/about" isActive={isActive("/about")} onClick={closeMenu}>
            About
          </MobileNavLink>
        </div>
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

// ⭐ TAMBAH COMPONENT BARU INI
function MobileNavLink({ to, children, isActive, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
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