import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import MedicationDetails from './pages/MedicationDetails';
import Profile from './pages/Profile';
import Chat from './pages/Chat'; // וודא שהקובץ קיים בתיקיית pages

const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 antialiased font-body-md">
      {!isLoginPage && isAuthenticated && <Navbar />}
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/inventory" element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />} />
          <Route path="/inventory/:id" element={isAuthenticated ? <MedicationDetails /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isLoginPage && isAuthenticated && <Footer />}
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('userLoggedIn') === 'true';
  });

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  );
}

export default App;