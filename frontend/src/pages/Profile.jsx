import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    // נתוני המשתמש המעודכנים עבור ריק סנצ'ז
    const user = {
        name: "Rick Sanchez",
        email: "rick.sanchez@pharmsense.io",
        age: "70",
        gender: "Male",
        city: "Seattle, WA",
        title: "Chief Science Officer",
        // תמונה איכותית של גבר בחליפה התואמת את התיאור
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    };

    return (
        <div className="min-h-screen flex bg-[#f9f9ff]">
            {/* Sidebar Navigation - מעודכן ללא Dashboard ו-Inventory */}
            <aside className="w-64 bg-[#001b3c] text-white flex flex-col flex-shrink-0 border-r border-slate-200">
                <div className="p-8">
                    <span className="text-2xl font-black tracking-tighter text-white font-manrope">
                        PharmSense
                    </span>
                </div>

                <nav className="flex-grow px-4 space-y-2">
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0055a5] text-white font-semibold shadow-md font-button">
                        <span className="material-symbols-outlined">person</span>
                        Profile
                    </Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Header Section */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold text-[#003e7b] tracking-tight">User Profile</h1>
                        <div className="h-1 w-12 bg-[#0055A5] rounded-full" />
                    </div>

                    {/* Bento Profile Card */}
                    <section className="bg-white rounded-[32px] shadow-[0_20px_40px_-15px_rgba(0,85,165,0.04)] border border-slate-100 overflow-hidden">

                        {/* Top Profile Banner */}
                        <div className="p-10 flex flex-col md:flex-row items-center gap-8 border-b border-slate-50">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-slate-50 shadow-inner bg-slate-200">
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <span className="absolute bottom-1 right-1 bg-teal-500 w-6 h-6 rounded-full border-4 border-white shadow-sm" />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-4xl font-black text-[#111c2d] leading-none mb-2">{user.name}</h2>
                                <p className="text-lg text-slate-500 font-medium">{user.title}</p>
                            </div>
                        </div>

                        {/* Information Grid - מיושר לחלוטין עבור ריק סנצ'ז */}
                        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 bg-slate-50/50">

                            <div className="space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Full Name</span>
                                <p className="text-xl font-bold text-[#111c2d]">{user.name}</p>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Email Address</span>
                                <p className="text-xl font-bold text-[#111c2d]">{user.email}</p>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Age</span>
                                <p className="text-xl font-bold text-[#111c2d]">{user.age}</p>
                            </div>

                            <div className="space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Gender</span>
                                <p className="text-xl font-bold text-[#111c2d]">{user.gender}</p>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">City</span>
                                <p className="text-xl font-bold text-[#111c2d]">{user.city}</p>
                            </div>

                        </div>

                        {/* Footer Action */}
                        <div className="px-10 py-6 bg-white flex justify-end">
                            <button className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-[#0055a5] font-bold rounded-full hover:bg-slate-50 hover:border-[#0055a5] transition-all shadow-sm active:scale-95">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                Edit Personal Info
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Profile;