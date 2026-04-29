import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// מאגר תרופות לחיפוש מהיר (תואם לשאר המערכת)
const MEDICATIONS_LIST = [
  { id: 'acetaminophen', name: 'Acetaminophen', info: '500mg • 100 Caplets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnkMrG8Oxx_8a366-hc7Plmr-yxBxB0pz3bHPz0g697kYPDs6gCtpmf5MAC4gw7qRuPp1jKi4UOkv0ml4g8vLzTJ-v1bKRKJK_A4c76CdxRdrEhCygIhnnvesrkQ7guyuck0s1bpPoPgmOx7sdhiu-dNJbSdciM4IIhbxdq-TnmdShEeWkpIHKfHtJyFK16Qc2XNyJpd5mKe7K-uWzVzKNq1CGLnylhhrP5e1mIEUgKtEz8nEr7KIWukLBYlrXW1NArXCZNLYtb9c' },
  { id: 'lisinopril', name: 'Lisinopril', info: '10mg • 30 Tablets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhLqiv-U2MLRf7U7BvdXMaSce_Sse-ZvpxGb1TVxVtrHCdx_BvXW6t9ZEsLAqozrVUQTNPzXG11M0oVi9MMQ-XsN6xexk4w2_GHx2y5VrRj_0TPV_EGDDJ3fREflml3kYACmG0D19DXp0SeDrgUxlZWLNVbjY0dpac_RPDp9z77pQT70yUgHYSFAdSrrIAosYPTKT0XqVbYvhj6K2HlE8tRJyVG0jc2-g1B9xGl746eQ-Apdd2yBNwmqnDDTXC67cK46g2MFEQTJ0' },
  { id: 'aspirin', name: 'Aspirin', info: '81mg • 120 Tablets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC23sLwBALnJ35KGyb5QrAjESVe-8IcLW4HRLQBTAdPLGTgerByyc3w-hk9ALOLvG6SSoQh692tThK2ksoEO0CK7tPQD5OdMuvjEnN_7qdMuAq199VBzeEYzyLLOdn2m1KK_fSpp5HUjneLQduEpwiuld837_N6kVStitVsucMItn2A0gK4Iyh3w9avs242Yc2YSO2msmzX_5iIDVaLP1qGJl4w0uTOFHmwoUxxZ19o-hmr8dAQhqJaUiB16YTXcRORh3Mzkl5e1aM' },
  { id: 'ibuprofen', name: 'Ibuprofen', info: '400mg • 50 Tablets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2CLzostZK8wEuqOFQIHZnxBeT-ZONtrk6QdhnaWYunoEdHi-qpXmp7dck04QxAI1flgcZ2Ss_AVSX2iDj0UcZm3yZND5pc7ppf_68OfUtKFU5GHkYdB57waZdNJaR-XxIxdxLT4a7euiKsospgLuTLPHGuJAOfNqohstdXtFqmnpj7XZP2-R_xAcgaCzETUv89l0fZL7EnlToztarxhzjudA7tUMfH_SPMjnHSDpHwzEPH8hRoD_tWP3Jg-TH6DHqyaknMoFYn84' }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  // סגירת החלון הקופץ בלחיצה מחוץ לאזור החיפוש
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim()) {
      const filtered = MEDICATIONS_LIST.filter(med =>
        med.name.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    navigate('/chat', { state: { initialQuestion: query } });
  };

  const handleSuggestionClick = (id) => {
    navigate(`/inventory/${id}`);
  };

  return (
    <main className="flex-grow p-6 lg:p-12 max-w-[1440px] mx-auto w-full space-y-12 font-body-md antialiased text-[#111c2d]">

      {/* Search & Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 pt-8">
        <h1 className="text-5xl font-black text-[#003e7b] tracking-tighter leading-[1.1]">
          How can we help with<br /> your health today?
        </h1>

        {/* עטיפה עם z-index מתוקן ומרווח עליון כדי למנוע הצפה מעל ה-Navbar */}
        <div ref={searchContainerRef} className="w-full max-w-2xl relative group z-30 mt-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute -inset-1.5 bg-blue-100 rounded-[28px] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000" />
            <div className="relative flex items-center bg-white rounded-[24px] p-2.5 shadow-sm border border-slate-100">
              <span className="material-symbols-outlined text-[#0055a5] ml-4 text-3xl">search</span>
              <input
                value={query}
                onChange={handleInputChange}
                onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
                className="w-full bg-transparent border-none focus:ring-0 text-xl h-14 px-2 outline-none"
                placeholder="Ask about medications..."
                autoComplete="off"
              />
              <button type="submit" className="bg-[#0055a5] text-white rounded-2xl px-10 py-4 font-bold hover:bg-[#003e7b] transition-all shadow-lg active:scale-95">
                Ask AI
              </button>
            </div>
          </form>

          {/* כרטיסיות מרחפות (Floating Bento Cards) */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 w-max max-w-[90vw] flex flex-wrap justify-center gap-4 z-50">
              {suggestions.map((med, index) => (
                <div
                  key={med.id}
                  onClick={() => handleSuggestionClick(med.id)}
                  className="animate-in slide-in-from-top-8 fade-in fill-mode-both duration-500 bg-white/95 backdrop-blur-xl rounded-[28px] border-2 border-[#0055a5]/10 p-4 flex items-center gap-4 shadow-[0_20px_40px_-15px_rgba(0,85,165,0.15)] cursor-pointer hover:border-[#0055a5] hover:-translate-y-2 hover:shadow-2xl transition-all w-72"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex-shrink-0">
                    <img src={med.img} alt={med.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="overflow-hidden text-left flex-grow">
                    <h4 className="font-bold text-[#111c2d] truncate">{med.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{med.info}</p>
                    <div className="mt-2 flex items-center text-[10px] text-[#0055a5] font-bold">
                      View Details
                      <span className="material-symbols-outlined text-[14px] ml-1">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modern Bento Grid - ממוקם ב-z-10 כדי שיהיה מתחת לחיפוש */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">

        {/* Next Dose Highlight */}
        <div className="md:col-span-2 bg-[#0055a5] text-white rounded-[40px] p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-60">Upcoming Dose</span>
            <h3 className="text-6xl font-black mt-4 leading-none">14:00</h3>
            <p className="text-2xl font-bold mt-2 opacity-90">Lisinopril • 10mg</p>
          </div>
          <div className="relative z-10 mt-10 flex gap-4">
            <button className="px-8 py-4 bg-white text-[#0055a5] rounded-2xl font-black text-sm shadow-xl hover:bg-slate-50 transition-all active:scale-95">Took it</button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-2xl font-black text-sm hover:bg-white/20 border border-white/10 transition-all">Snooze</button>
          </div>
          <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[240px] opacity-[0.07] rotate-12 group-hover:rotate-0 transition-transform duration-700">timer</span>
        </div>

        {/* Health Score Circular */}
        <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="#f1f5f9" strokeWidth="12" fill="none" />
              <circle cx="64" cy="64" r="56" stroke="#0055a5" strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset="70" strokeLinecap="round" />
            </svg>
            <span className="absolute text-3xl font-black text-[#003e7b]">80%</span>
          </div>
          <h4 className="font-black mt-6 text-[#111c2d] text-xl">Health Score</h4>
          <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-widest">On Track</p>
        </div>

        {/* Inventory Quick View */}
        <Link to="/inventory" className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-teal-50 rounded-2xl text-teal-600">
              <span className="material-symbols-outlined text-4xl">pill</span>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-[#0055a5] group-hover:translate-x-1 transition-all">arrow_forward</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#111c2d]">Inventory</h3>
            <p className="text-sm text-slate-400 font-bold mt-1">3 ACTIVE MEDS</p>
          </div>
        </Link>

        {/* AI Insight Bar */}
        <div className="md:col-span-4 bg-blue-50 rounded-[40px] p-10 border border-blue-100 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[#0055a5] text-4xl animate-pulse">lightbulb</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#003e7b]">Clinical Insight</h3>
            <p className="text-[#0055a5]/80 text-lg leading-relaxed max-w-3xl">
              Based on your **Lisinopril** dosage, staying hydrated is essential for optimal efficacy. We've updated your water intake goal in Profile.
            </p>
          </div>
          <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-[#0055a5]/5 rounded-full blur-3xl pointer-events-none" />
        </div>

      </div>
    </main>
  );
};

export default Dashboard;