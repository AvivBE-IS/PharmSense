import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white mt-12 border-t border-slate-100 py-12 pb-24 md:pb-12 w-full">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* לוגו ותיאור קצר - מבוסס על temp4.html */}
                    <div className="space-y-4 text-center md:text-left">
                        <h2 className="text-xl font-bold text-[#0055A5]">PharmSense</h2>
                        <p className="text-sm text-slate-500 max-w-sm">
                            Simplifying your pharmacy experience with clinical precision and empathetic digital care.
                        </p>
                    </div>

                    {/* קישורי ניווט - כאן אנחנו משתמשים ב-Link במקום ב-a */}
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link to="#" className="text-sm text-slate-600 hover:text-[#0055A5] transition-colors">Privacy Policy</Link>
                        <Link to="#" className="text-sm text-slate-600 hover:text-[#0055A5] transition-colors">Terms of Service</Link>
                        <Link to="#" className="text-sm text-slate-600 hover:text-[#0055A5] transition-colors">Help Center</Link>
                    </div>
                </div>

                {/* שורת זכויות יוצרים - מבוסס על temp2.html ו-temp4.html */}
                <div className="mt-12 pt-8 border-t border-slate-50 text-center">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        © 2024 PHARMSENSE MEDICAL GROUP. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;