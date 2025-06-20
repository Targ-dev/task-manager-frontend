import { GiOpenBook } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import API from "../utils/axios";
import UserHeader from "../components/UserHeader";
import { toast } from "react-toastify";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error(error.response?.data?.message || "Failed to load tasks");
      }
    };

    fetchTasks();
  }, [token]);

  const statuses = [
    ...new Set(tasks.map((task) => task.status).filter(Boolean)),
  ];

  const filteredTasks = selectedStatus
    ? tasks.filter((task) => task.status === selectedStatus)
    : tasks;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UserHeader />

      <div className="flex justify-between items-center p-5">
        <div className="text-3xl font-bold">Today</div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 rounded md:px-3 px-2 py-1 text-sm text-gray-500 font-light md:font-semibold w-32 md:w-auto"
        >
          <option value="">All Status</option>
          {statuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Task Cards */}
      <div className="flex flex-col p-5 space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-gray-500 font-semibold">No tasks found.</div>
        ) : (
          filteredTasks.map((task) => (
            <Link
              to={`/task/${task._id}`}
              key={task._id}
              className="no-underline"
            >
              <div
                style={{ backgroundColor: task.color || "#fef3c7" }}
                className="rounded-md w-full p-3 flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-red-600 rounded"
                />
                <GiOpenBook className="text-2xl" />
                <span>{task.title}</span>
              </div>
            </Link>
          ))
        )}
      </div>

      <Link
        to="/add-task"
        className="fixed bottom-10 right-10 bg-gray-100 font-semibold text-2xl rounded-full px-4 py-2 shadow-lg cursor-pointer"
      >
        +
      </Link>
    </div>
  );
};

export default Tasks;
