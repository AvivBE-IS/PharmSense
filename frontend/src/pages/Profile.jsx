<>
    <meta charSet="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>User Profile | PharmSense</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Manrope:wght@600;700;800&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
    />
    <style
        dangerouslySetInnerHTML={{
            __html:
                "\n    body {\n      background-color: #f9f9ff;\n      color: #111c2d;\n    }\n    .material-symbols-outlined {\n      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n    }\n    .shadow-soft {\n      box-shadow: 0 20px 40px -15px rgba(0, 85, 165, 0.04);\n    }\n  "
        }}
    />
    {/* TopNavBar from JSON */}
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,85,165,0.04)]">
        <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between relative">
            <div className="flex items-center gap-12">
                <h1 className="text-2xl font-black tracking-tighter text-[#0055A5] dark:text-blue-300 font-display">
                    PharmSense
                </h1>
                <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8 font-manrope text-sm font-medium tracking-wide">
                    <a
                        className="text-slate-500 dark:text-slate-400 hover:text-[#0055A5] dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 px-3 py-2 uppercase tracking-widest"
                        href="#"
                    >
                        Inventory
                    </a>
                    <a
                        className="text-slate-500 dark:text-slate-400 hover:text-[#0055A5] dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 px-3 py-2 uppercase tracking-widest"
                        href="#"
                    >
                        Pharmacy Finder
                    </a>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-600 hover:text-blue-700 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined" data-icon="notifications">
                        notifications
                    </span>
                </button>
                <button className="flex items-center gap-2 p-1 pl-3 pr-1 rounded-full bg-primary-container text-white cursor-pointer active:opacity-70 transition-all">
                    <span className="font-button text-body-sm">My Account</span>
                    <span
                        className="material-symbols-outlined text-[32px]"
                        data-icon="account_circle"
                    >
                        account_circle
                    </span>
                </button>
            </div>
        </div>
    </header>
    <main className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="flex flex-col gap-2">
                <a
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-container text-white font-semibold transition-all shadow-soft font-button"
                    href="#"
                >
                    <span className="material-symbols-outlined" data-icon="person">
                        person
                    </span>
                    Personal Info
                </a>
                <a
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-white hover:shadow-sm transition-all font-button"
                    href="#"
                >
                    <span className="material-symbols-outlined" data-icon="medication">
                        medication
                    </span>
                    My Prescriptions
                </a>
                <a
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-white hover:shadow-sm transition-all font-button"
                    href="#"
                >
                    <span className="material-symbols-outlined" data-icon="package_2">
                        package_2
                    </span>
                    Order History
                </a>
                <a
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-white hover:shadow-sm transition-all font-button"
                    href="#"
                >
                    <span
                        className="material-symbols-outlined"
                        data-icon="clinical_notes"
                    >
                        clinical_notes
                    </span>
                    Health Records
                </a>
                <a
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-white hover:shadow-sm transition-all font-button"
                    href="#"
                >
                    <span className="material-symbols-outlined" data-icon="shield">
                        shield
                    </span>
                    Security
                </a>
            </nav>
            <div className="mt-12 p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
                <span className="text-label-bold text-primary mb-2 block uppercase tracking-wider">
                    Health Tip
                </span>
                <p className="text-body-sm text-on-surface-variant italic">
                    "Keep your allergy information updated to ensure safe prescription
                    dispensing."
                </p>
            </div>
        </aside>
        {/* Main Content Area */}
        <section className="flex-grow space-y-8">
            {/* Profile Header */}
            <div className="bg-white p-8 rounded-[24px] shadow-soft border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <img
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/5"
                            data-alt="professional headshot of a woman named Sarah Jenkins in a bright minimalist setting with soft natural light"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxfF4Shwu43LKFspAM86bRW1IXLnt1l5oQbU5jfvmukcrLRoZfPs_0kzVJGyA2jczZFdPPh8TUo8odQCZiZh7KrkEkLjy89Gm2RHa2pJJmk88v5KTgdcocn6GUdRYFK7cz-7StmFSnedECdiSGl1Ix-DEh4oT_HZLlcrZXfAJsZWRO9fP6i5NfMTngeZc5BiLt8Z4iJDmc6jwOpAObNWA_LoAfSJg3P9UmyTQ8RWjkSkVG8wyQoSzF2IaZD03eBWAVRptFtJeSCh8"
                        />
                        <span className="absolute bottom-1 right-1 bg-teal-500 w-5 h-5 rounded-full border-4 border-white" />
                    </div>
                    <div>
                        <h2 className="font-h2 text-h2 text-on-surface">Sarah Jenkins</h2>
                        <p className="font-body-md text-slate-500">
                            sarah.jenkins@healthcare.me
                        </p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-primary font-button rounded-full hover:bg-slate-50 transition-colors shadow-sm">
                    <span
                        className="material-symbols-outlined text-[20px]"
                        data-icon="edit"
                    >
                        edit
                    </span>
                    Edit Profile
                </button>
            </div>
            {/* Information Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Personal Details */}
                <div className="bg-white p-8 rounded-[24px] shadow-soft border border-slate-100 space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined" data-icon="contacts">
                            contacts
                        </span>
                        <h3 className="font-h3 text-h3">Personal Details</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <span className="text-label-bold text-slate-400 block mb-1">
                                PHONE NUMBER
                            </span>
                            <p className="font-body-md font-semibold text-on-surface">
                                +1 (555) 012-3456
                            </p>
                        </div>
                        <div>
                            <span className="text-label-bold text-slate-400 block mb-1">
                                HOME ADDRESS
                            </span>
                            <p className="font-body-md font-semibold text-on-surface">
                                1248 Oakwood Ave,
                                <br />
                                Los Angeles, CA 90024
                            </p>
                        </div>
                    </div>
                </div>
                {/* Health Summary */}
                <div className="bg-white p-8 rounded-[24px] shadow-soft border border-slate-100 space-y-6">
                    <div className="flex items-center gap-3 text-secondary">
                        <span
                            className="material-symbols-outlined"
                            data-icon="monitor_heart"
                        >
                            monitor_heart
                        </span>
                        <h3 className="font-h3 text-h3">Health Summary</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <span className="text-label-bold text-slate-400 block mb-1">
                                ALLERGIES
                            </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-3 py-1 bg-red-50 text-red-700 text-[11px] font-bold rounded-full border border-red-100">
                                    Penicillin
                                </span>
                                <span className="px-3 py-1 bg-red-50 text-red-700 text-[11px] font-bold rounded-full border border-red-100">
                                    Peanuts
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-label-bold text-slate-400 block mb-1">
                                BLOOD TYPE
                            </span>
                            <p className="font-body-md font-semibold text-on-surface">
                                O Negative (Universal)
                            </p>
                        </div>
                    </div>
                </div>
                {/* Emergency Contact */}
                <div className="bg-white p-8 rounded-[24px] shadow-soft border border-slate-100 space-y-6">
                    <div className="flex items-center gap-3 text-tertiary">
                        <span className="material-symbols-outlined" data-icon="emergency">
                            emergency
                        </span>
                        <h3 className="font-h3 text-h3">Emergency Contact</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <span className="text-label-bold text-slate-400 block mb-1">
                                NAME &amp; RELATION
                            </span>
                            <p className="font-body-md font-semibold text-on-surface">
                                Robert Jenkins (Spouse)
                            </p>
                        </div>
                        <div>
                            <span className="text-label-bold text-slate-400 block mb-1">
                                CONTACT
                            </span>
                            <p className="font-body-md font-semibold text-on-surface">
                                +1 (555) 012-7890
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Recent Prescriptions Preview */}
            <div className="bg-white p-8 rounded-[24px] shadow-soft border border-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined" data-icon="history">
                            history
                        </span>
                        <h3 className="font-h3 text-h3">Recent Prescriptions</h3>
                    </div>
                    <a
                        className="text-primary font-button text-body-sm hover:underline"
                        href="#"
                    >
                        View All
                    </a>
                </div>
                <div className="divide-y divide-slate-100">
                    {/* Medication Item 1 */}
                    <div className="py-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined" data-icon="pill">
                                    pill
                                </span>
                            </div>
                            <div>
                                <h4 className="font-body-md font-bold text-on-surface">
                                    Aspirin (81mg)
                                </h4>
                                <p className="text-body-sm text-slate-500">
                                    Daily heart health maintenance
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-label-bold rounded-full">
                                ACTIVE
                            </span>
                            <button className="p-2 text-slate-400 hover:text-primary">
                                <span
                                    className="material-symbols-outlined"
                                    data-icon="chevron_right"
                                >
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* Medication Item 2 */}
                    <div className="py-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                <span
                                    className="material-symbols-outlined"
                                    data-icon="vaccines"
                                >
                                    vaccines
                                </span>
                            </div>
                            <div>
                                <h4 className="font-body-md font-bold text-on-surface">
                                    Amoxicillin (500mg)
                                </h4>
                                <p className="text-body-sm text-slate-500">
                                    Antibiotic course (7 days remaining)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-label-bold rounded-full">
                                REFILL DUE
                            </span>
                            <button className="p-2 text-slate-400 hover:text-primary">
                                <span
                                    className="material-symbols-outlined"
                                    data-icon="chevron_right"
                                >
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    {/* BottomNavBar from JSON (Visible on mobile only) */}
    <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-2xl bg-white border-t border-slate-100 shadow-[0_-4px_20px_0px_rgba(0,85,165,0.06)] flex justify-around items-center h-16 px-4 pb-safe">
        <div className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 active:scale-95 transition-transform">
            <span className="material-symbols-outlined" data-icon="home">
                home
            </span>
            <span className="text-[11px] font-semibold font-manrope">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 active:scale-95 transition-transform">
            <span className="material-symbols-outlined" data-icon="medication">
                medication
            </span>
            <span className="text-[11px] font-semibold font-manrope">
                Prescriptions
            </span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 active:scale-95 transition-transform">
            <span className="material-symbols-outlined" data-icon="package_2">
                package_2
            </span>
            <span className="text-[11px] font-semibold font-manrope">Orders</span>
        </div>
        <div className="flex flex-col items-center justify-center text-blue-700 bg-blue-50/50 rounded-xl px-4 py-1 active:scale-95 transition-transform">
            <span className="material-symbols-outlined" data-icon="person">
                person
            </span>
            <span className="text-[11px] font-semibold font-manrope">Profile</span>
        </div>
    </nav>
    {/* Footer Section */}
    <footer className="bg-white mt-12 border-t border-slate-100 py-12 pb-24 md:pb-12">
        <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-xl font-bold text-primary font-h2">PharmSense</h2>
                    <p className="text-body-sm text-slate-500 max-w-sm">
                        Simplifying your pharmacy experience with clinical precision and
                        empathetic digital care.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <a
                        className="text-body-sm text-slate-600 hover:text-primary transition-colors"
                        href="#"
                    >
                        Privacy Policy
                    </a>
                    <a
                        className="text-body-sm text-slate-600 hover:text-primary transition-colors"
                        href="#"
                    >
                        Terms of Service
                    </a>
                    <a
                        className="text-body-sm text-slate-600 hover:text-primary transition-colors"
                        href="#"
                    >
                        Cookie Settings
                    </a>
                    <a
                        className="text-body-sm text-slate-600 hover:text-primary transition-colors"
                        href="#"
                    >
                        Help Center
                    </a>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-50 text-center">
                <p className="text-label-bold text-slate-400 uppercase">
                    © 2024 PHARMSENSE MEDICAL GROUP. ALL RIGHTS RESERVED.
                </p>
            </div>
        </div>
    </footer>
</>
