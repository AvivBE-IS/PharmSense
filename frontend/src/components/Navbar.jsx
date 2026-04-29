import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-20">

                {/* לוגו שחוזר לדף הבית */}
                <Link to="/" className="text-2xl font-bold text-[#0055A5]">
                    PharmSense
                </Link>

                <nav className="flex gap-8">
                    {/* מעבר לקטלוג התרופות */}
                    <Link to="/inventory" className="text-slate-600 hover:text-blue-600 font-medium">
                        INVENTORY
                    </Link>

                    <Link to="#" className="text-slate-600 hover:text-blue-600 font-medium">
                        PHARMACY FINDER
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {/* מעבר לפרופיל האישי */}
                    <Link to="/profile" className="p-2 rounded-full hover:bg-slate-100">
                        <span className="material-symbols-outlined">account_circle</span>
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Navbar;