import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Board from "./components/Board";
import TaskDetailPage from "./components/TaskDetail";
import { useAuthStore } from "./state/store"; // Auth store
import { useTaskStore } from "./state/store"; // Task store
import "./App.css";

// 🔒 Private route wrapper
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    initializeAuth(); // restore token + userId
  }, [initializeAuth]);

  // Only fetch tasks if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, fetchTasks]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/board" /> : <Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/board"
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
        <Route
          path="/task/new"
          element={
            <PrivateRoute>
              <TaskDetailPage isNew={true} />
            </PrivateRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <TaskDetailPage isNew={false} />
            </PrivateRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
