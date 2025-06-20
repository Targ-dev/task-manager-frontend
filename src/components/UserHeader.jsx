import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMoon } from "react-icons/io";
import { GoBellFill } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import propic from "../assets/propic.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const UserHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowDropdown(false);
  };

  if (!token) return null;

  return (
    <div className="flex items-center justify-end text-2xl space-x-4 px-5 py-6">
      <IoMdMoon />
      <GoBellFill />

      <div className="relative" ref={dropdownRef}>
        <img
          src={propic}
          className="w-10 h-10 rounded-3xl cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all"
          onClick={() => setShowDropdown(!showDropdown)}
          alt="Profile"
        />

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <BiLogOut className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
