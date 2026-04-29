import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';         // מבוסס על temp1.html
import Inventory from './pages/Inventory';         // מבוסס על temp2.html
import MedicationDetails from './pages/MedicationDetails.jsx'; // מבוסס על temp3.html
import Profile from './pages/Profile';             // מבוסס על temp4.html

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md antialiased">

        <Navbar />

        {/* כאן מתבצעת החלפת התוכן המרכזי לפי הכתובת בדפדפן */}
        <main className="flex-grow">
          <Routes>
            {/* דף הבית - דשבורד ה-AI */}
            <Route path="/" element={<Dashboard />} />

            {/* דף התחברות */}
            <Route path="/login" element={<Login />} />

            {/* קטלוג התרופות המלא */}
            <Route path="/inventory" element={<Inventory />} />

            {/* דף פרטי תרופה ספציפית (משתמש ב-ID דינמי) */}
            <Route path="/inventory/:id" element={<MedicationDetails />} />

            {/* פרופיל משתמש אישי */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* ה-Footer יופיע בתחתית כל הדפים */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;