import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import Tasks from './pages/Tasks'
import AddTask from './pages/AddTask'
import TaskView from './pages/TaskView'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound'

const AppLayout = () => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const validRoutes = [
    '/',
    '/register',
    '/tasks',
    '/add-task',
    '/edit-task/',
    '/task/'
  ]

  const isValidRoute = validRoutes.some(route => 
    route.endsWith('/') 
      ? location.pathname.startsWith(route)
      : location.pathname === route
  )

  const isAuthPage = location.pathname === '/' || location.pathname === '/register'
  const showSidebar = !isAuthPage && isValidRoute
  const showNavbar = isAuthPage

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {showSidebar && (
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={closeSidebar} 
        />
      )}
      <div className="flex flex-col flex-1">
        {showNavbar && <Navbar />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/edit-task/:id" element={<AddTask isEditing={true} />} />
            <Route path="/task/:id" element={<TaskView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppLayout />
    </Router>
  )
}

export default App