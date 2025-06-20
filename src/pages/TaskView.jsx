import React, { useState, useEffect } from "react";
import {
  FiClock,
  FiTag,
  FiRepeat,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiCircle,
  FiCalendar,
  FiUser,
  FiHash,
} from "react-icons/fi";
import API from "../utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TaskView = ({ taskId }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await API.get(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTask(response.data.task);
      setError(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch task");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    console.log("Edit task:", task._id);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await API.delete(`/tasks/${task._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await Swal.fire("Deleted!", "Your task has been deleted.", "success");
        navigate("/tasks");
      } catch (err) {
        console.error("Failed to delete task:", err);
        Swal.fire("Error!", "Failed to delete task.", "error");
      }
    }
  };

  const toggleTaskStatus = async () => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/tasks/${task._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask((prev) => ({ ...prev, status: newStatus }));
      toast.success(`Task marked as ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update task status");
      console.error("Failed to update task status:", err);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: "⏳",
          text: "Pending",
        };
      case "in-progress":
        return {
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "🔄",
          text: "In Progress",
        };
      case "completed":
        return {
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "✅",
          text: "Completed",
        };
      default:
        return {
          color: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: "📋",
          text: "Unknown",
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading task...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm border max-w-md">
          <div className="text-red-500 text-3xl mb-3">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Task
          </h3>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm border max-w-md">
          <div className="text-gray-400 text-3xl mb-3">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Task Not Found
          </h3>
          <p className="text-gray-600 text-sm">
            The requested task could not be found.
          </p>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(task.status);

  return (
    <div className="min-h-screen bg-white pb-6">
      <UserHeader />
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <button
                onClick={toggleTaskStatus}
                className="mt-1 flex-shrink-0 hover:scale-110 transition-transform"
              >
                {task.status === "completed" ? (
                  <FiCheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <FiCircle className="h-6 w-6 text-gray-400 hover:text-blue-600" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h1
                  className={`text-2xl font-bold mb-2 ${
                    task.status === "completed"
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h1>

                {/* Status and Color */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}
                  >
                    <span className="mr-1">{statusConfig.icon}</span>
                    {statusConfig.text}
                  </span>

                  {task.color && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: task.color }}
                      ></div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {task.color}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {task.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {task.description}
                  </p>
                )}

                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                      >
                        <FiTag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiRepeat className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Repeat Schedule</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Frequency
                </span>
                <p className="text-gray-900 font-medium capitalize mt-1">
                  {task.repeat.frequency}
                </p>
              </div>
              {task.repeat.days && task.repeat.days.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Days
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {task.repeat.days.map((day, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FiCalendar className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Timeline</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Created</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(task.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Updated</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatDate(task.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Task */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FiHash className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Task Metadata</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Task ID
              </span>
              <p className="text-xs font-mono text-gray-700 mt-1 break-all">
                {task._id}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Created By
              </span>
              <p className="text-xs font-mono text-gray-700 mt-1 break-all">
                {task.createdBy}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Link
              to={`/edit-task/${task._id}`}
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <FiEdit className="h-4 w-4" />
              Edit Task
            </Link>

            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <FiTrash2 className="h-4 w-4" />
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
