import React, { useState } from "react";
import { FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import bgp from "../assets/bgp.png";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await API.post("/users/register", formData);

      dispatch(loginSuccess({ token: response.data.token }));

      toast.success("Registration successful!");
      navigate("/Tasks");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <img
        src={bgp}
        className="absolute inset-0 w-full h-full object-cover"
        alt="background"
      />
      <div className="relative z-10 min-h-screen flex items-center justify-center py-25 ">
        <div className="bg-[#f7f8f8e1] shadow-[0px_4px_3px_1px_rgba(0,0,0,0.2)] rounded-[3rem] py-15 space-y-8">
          <div className="text-center md:px-50 px-10">
            <h1 className="text-blue-600 text-[24px] font-bold mb-2">
              Register
            </h1>
            <h3 className="text-[#1d2220cd]">
              Welcome back! Sign in using your
              <br />
              social account or email to continue us
            </h3>
          </div>
          <div className="flex justify-center items-center space-x-3 text-2xl mb-10">
            <div className="bg-white/70 p-3 rounded-4xl cursor-pointer hover:scale-125 duration-300 ease-in-out">
              <FaFacebook className="text-blue-600" />
            </div>
            <div className="bg-white/70 p-3 rounded-4xl cursor-pointer hover:scale-125 duration-300 ease-in-out">
              <FcGoogle />
            </div>
            <div className="bg-white/70 p-3 rounded-4xl cursor-pointer hover:scale-125 duration-300 ease-in-out">
              <FaApple />
            </div>
          </div>

          <div className="flex justify-center">
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>

          <div className="space-y-6 flex-col justify-center items-center px-3 md:px-40">
            <div className="bg-white/60 p-5 rounded-xl">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border-b w-full focus:outline-none"
                required
              />
            </div>
            <div className="bg-white/60 p-5 rounded-xl">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border-b w-full focus:outline-none"
                required
              />
            </div>
            <div className="bg-white/60 p-5 rounded-xl">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border-b w-full focus:outline-none"
              />
            </div>
            <div className="text-center mt-15">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="text-2xl font-medium bg-white/50 px-10 md:px-20 py-3 rounded-b-xl 
                rounded-t-md shadow-[0px_3px_3px_1px_rgba(0,0,0,0.2)] cursor-pointer 
                hover:bg-white hover:scale-105 
                transition-all duration-300 ease-in-out"
              >
                {isLoading ? (
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-t-transparent rounded-full"></span>
                ) : (
                  "Register"
                )}
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Already have an account? &nbsp;
                <Link
                  to="/"
                  className="border-b border-dotted hover:text-blue-600 hover:font-semibold cursor-pointer"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
