import React, { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SysContext } from "../layouts/layout";

const Header = () => {
  let { state, dispatch } = useContext(SysContext);
  return (
    <header className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="text-2xl font-bold tracking-wide cursor-pointer">
          MMedia
        </div>

        {/* Right - Profile */}
        <div>
          <Link to="/profile">
            <img
              src={`http://localhost/Fullstack-Layered-Social-API/backend/public/${state.user.profile_image}`}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white hover:scale-105 transition"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
