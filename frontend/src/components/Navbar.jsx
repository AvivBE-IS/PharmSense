import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    // פונקציית עזר לעיצוב הקישור הפעיל (מוסיפה צבע כחול וקו תחתון)
    const activeStyle = ({ isActive }) =>
        isActive
            ? "text-[#0055A5] border-b-2 border-[#0055A5] font-bold pb-1 transition-all uppercase tracking-wide text-sm"
            : "text-slate-500 hover:text-[#0055A5] font-medium transition-all uppercase tracking-wide text-sm";

    return (
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm w-full">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-20 w-full">

                {/* לוגו PharmSense - מוביל לדף הבית */}
                <Link to="/" className="text-2xl font-black tracking-tighter text-[#0055A5]">
                    PharmSense
                </Link>

                {/* תפריט ניווט */}
                <nav className="hidden md:flex space-x-8 items-center">

                    {/* קישור לקטלוג */}
                    <NavLink to="/inventory" className={activeStyle}>
                        Inventory
                    </NavLink>

                    {/* עדכון: Pharmacy Finder מוביל כעת ל-Dashboard (נתיב "/") */}
                    <NavLink to="/" className={activeStyle}>
                        Pharmacy Finder
                    </NavLink>

                </nav>

                {/* צד ימין - התראות וחשבון */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-slate-400 hover:text-[#0055A5] transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>

                    <NavLink to="/profile" className={({ isActive }) =>
                        `flex items-center gap-2 p-1 pl-3 pr-1 rounded-full transition-all ${isActive ? 'bg-[#0055a5] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`
                    }>
                        <span className="text-xs font-bold uppercase">My Account</span>
                        <span className="material-symbols-outlined text-[32px]">account_circle</span>
                    </NavLink>
                </div>

            </div>
        </header>
    );
};

export default Navbar;