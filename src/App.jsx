import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ClientDashboard from "./Pages/ClientDashboard";

function App() {
  const [user, setUser] = useState(localStorage.getItem("sessionUser") || null);

  const handleLoginSuccess = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              user === "admin" ? (
                <AdminDashboard user={user} onLogout={handleLogout} />
              ) : (
                <ClientDashboard user={user} onLogout={handleLogout} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
