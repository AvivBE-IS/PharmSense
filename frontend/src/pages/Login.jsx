import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // עדכון מצב ההתחברות ושמירה בדפדפן כדי למנוע ניתוק ברענון
    setIsAuthenticated(true);
    localStorage.setItem('userLoggedIn', 'true');
    navigate('/');
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row h-screen bg-background font-body-md antialiased">
      {/* צד שמאל - תמונה וטקסט שיווקי */}
      <div className="hidden md:block md:w-1/2 relative bg-[#dee8ff] overflow-hidden rounded-r-[32px] z-10 shadow-lg">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdmxEdwqAeTTDNdU0vwzZCB-vGbwuh7DY-oMZzHLkB121p2eEsuJCuFsUn4U4aHYZrsG6dOG_x7Z2yQoNt2PYGAXqLydY0K7UoONahiv6luXiBRZ91DgW-7iYZAW3t5SFKufdoM-5ATpx6SypqzLcw2ENp63s2VKlNffrREqSaJ0QPE3owTerQMqDT9M3Tx4d8qWfJlOZIcWl_RTpzGZw8Y-zjZXaYbMJkSjTprrM-c6zVkyBHmubiMNwKcbA69nqwA4U7JUHvnxU"
          alt="Pharmacist"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003e7b]/80 to-transparent flex flex-col justify-end p-12">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Empathetic Care,<br />Clinical Precision.
          </h1>
        </div>
      </div>

      {/* צד ימין - טופס התחברות */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-background relative">

        {/* לוגו PharmSense מעל הטופס */}
        <div className="mb-8 flex items-center gap-3">
          <span className="material-symbols-outlined text-[#0055a5] text-5xl">medical_services</span>
          <span className="text-4xl font-black tracking-tighter text-[#0055a5]">PharmSense</span>
        </div>

        <div className="w-full max-w-lg bg-white rounded-[32px] p-8 sm:p-12 shadow-xl border border-slate-100">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-extrabold text-[#111c2d] mb-4">Welcome</h2>
            <p className="text-slate-500">Log in to manage your prescriptions.</p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Email Address</label>
              <input
                className="w-full h-[64px] px-6 bg-slate-50 rounded-[20px] border-2 border-slate-100 focus:border-[#0055a5] outline-none transition-all text-lg"
                placeholder="patient@example.com"
                type="email"
                required
              />
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Password</label>
              <div className="relative">
                <input
                  className="w-full h-[64px] pl-6 pr-14 bg-slate-50 rounded-[20px] border-2 border-slate-100 focus:border-[#0055a5] outline-none transition-all text-lg"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  required
                />
                {/* כפתור העין להסתרה/גילוי */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0055a5]"
                >
                  <span className="material-symbols-outlined text-2xl">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[72px] bg-[#0055a5] text-white font-bold rounded-[36px] flex items-center justify-center gap-3 hover:bg-[#003e7b] transition-all shadow-md mt-4"
            >
              Login
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;