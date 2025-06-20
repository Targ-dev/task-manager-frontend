import { useState } from "react";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date();
  const today = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed mt-2 top-4 left-4 z-50 bg-gray-300 text-white p-2 rounded-lg shadow-lg"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static top-0 left-0 z-40
        w-64 min-h-screen bg-white shadow-lg p-4
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <a href="/tasks">
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <img src={logo} className="w-15" />
            <div className="text-3xl font-bold">Listify</div>
          </div>
        </a>

        <div
          className="mb-6 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <div className="text-center font-semibold mb-2 text-gray-800">
            {today}
          </div>
          <div className="grid grid-cols-7 text-sm gap-y-1 text-center text-gray-500">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, index) => (
                <div
                  key={day}
                  className="font-medium opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${0.2 + index * 0.05}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  {day}
                </div>
              )
            )}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className={`py-1 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 opacity-0 animate-fade-in ${
                  i === 18
                    ? "bg-green-200 text-black font-medium hover:bg-green-300"
                    : ""
                }`}
                style={{
                  animationDelay: `${0.4 + i * 0.02}s`,
                  animationFillMode: "forwards",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div
          className="mb-6 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
        >
          <h3 className="font-semibold text-gray-700 mb-2">Tasks</h3>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-4 py-3 flex justify-between items-center hover:shadow-md transition-all duration-200 cursor-pointer group">
            <span className="group-hover:text-blue-600 transition-colors duration-200">
              Today
            </span>
            <span className="font-semibold text-sm">2</span>
          </div>
        </div>

        {/* Lists Section */}
        <div
          className="opacity-0 animate-slide-up"
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          <h3 className="font-semibold text-gray-700 mb-3">Lists</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group">
              <span className="group-hover:text-blue-600 transition-colors duration-200">
                Daily Routine
              </span>
              <span className="font-semibold text-sm">1</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer group">
              <span className="group-hover:text-blue-600 transition-colors duration-200">
                Study
              </span>
              <span className="font-semibold text-sm">0</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
