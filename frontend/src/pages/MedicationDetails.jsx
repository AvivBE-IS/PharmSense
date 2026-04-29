<>
    <meta charSet="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap"
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
                "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .tab-active {\n            border-bottom: 2px solid #0055a5;\n            color: #003e7b;\n        }\n    "
        }}
    />
    {/* TopAppBar */}
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-[0_20px_40px_-15px_rgba(0,85,165,0.04)] w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-20 w-full">
            <div
                className="text-2xl font-black tracking-tighter text-[#0055A5] dark:text-blue-300 font-display"
                style={{}}
            >
                PharmSense
            </div>
            <nav className="hidden md:flex space-x-6 font-manrope text-sm font-medium tracking-wide">
                <a
                    className="text-[#0055A5] border-b-2 border-[#0055A5] rounded-t-lg transition-all duration-300 px-3 py-2 uppercase tracking-wide"
                    href="#"
                    style={{}}
                >
                    inventory
                </a>
                <a
                    className="text-slate-500 dark:text-slate-400 hover:text-[#0055A5] dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 px-3 py-2 uppercase tracking-wide"
                    href="#"
                    style={{}}
                >
                    pharmacy finder
                </a>
            </nav>
            <div className="flex items-center space-x-4 text-[#0055A5] dark:text-blue-400">
                <button
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 p-2"
                    style={{}}
                >
                    <span className="material-symbols-outlined" style={{}}>
                        search
                    </span>
                </button>
                <button
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 p-2"
                    style={{}}
                >
                    <span className="material-symbols-outlined" style={{}}>
                        account_circle
                    </span>
                </button>
            </div>
        </div>
    </header>
    <main className="mt-24 mb-12 flex-grow container mx-auto px-gutter max-w-container-max">
        <div className="flex flex-col gap-gutter">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-label-bold text-outline uppercase">
                <a className="" href="#" style={{}}>
                    Home
                </a>
                <span className="material-symbols-outlined text-[14px]" style={{}}>
                    chevron_right
                </span>
                <a className="" href="#" style={{}}>
                    inventory
                </a>
                <span className="material-symbols-outlined text-[14px]" style={{}}>
                    chevron_right
                </span>
                <span className="text-primary font-bold" style={{}}>
                    Lisinopril Details
                </span>
            </nav>
            {/* Main Medication Card (Bento Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                {/* Left Column: Primary Info */}
                <div className="lg:col-span-8 flex flex-col gap-gutter">
                    <section className="bg-surface-container-lowest rounded-[24px] p-8 border border-outline-variant shadow-[0_20px_40px_-15px_rgba(0,62,123,0.04)]">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-32 h-32 rounded-full border-4 border-surface-container overflow-hidden flex-shrink-0">
                                <img
                                    className="w-full h-full object-cover"
                                    data-alt="Close-up photograph of a white round pharmaceutical pill with clinical lighting on a soft blue reflective surface"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhLqiv-U2MLRf7U7BvdXMaSce_Sse-ZvpxGb1TVxVtrHCdx_BvXW6t9ZEsLAqozrVUQTNPzXG11M0oVi9MMQ-XsN6xexk4w2_GHx2y5VrRj_0TPV_EGDDJ3fREflml3kYACmG0D19DXp0SeDrgUxlZWLNVbjY0dpac_RPDp9z77pQT70yUgHYSFAdSrrIAosYPTKT0XqVbYvhj6K2HlE8tRJyVG0jc2-g1B9xGl746eQ-Apdd2yBNwmqnDDTXC67cK46g2MFEQTJ0"
                                    style={{}}
                                />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1
                                            className="font-h1 text-h1 text-primary-container leading-none"
                                            style={{}}
                                        >
                                            Lisinopril
                                        </h1>
                                        <p
                                            className="font-body-lg text-body-lg text-on-surface-variant mt-2"
                                            style={{}}
                                        >
                                            Generic for{" "}
                                            <span className="font-semibold" style={{}}>
                                                Prinivil®, Zestril®
                                            </span>
                                        </p>
                                    </div>
                                    <div
                                        className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full flex items-center gap-2 font-label-bold"
                                        style={{}}
                                    >
                                        <span
                                            className="material-symbols-outlined text-[18px]"
                                            style={{}}
                                        >
                                            check_circle
                                        </span>
                                        IN STOCK
                                    </div>
                                </div>
                                {/* Highlight Bar */}
                                <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-surface-container-low rounded-[16px]">
                                    <div className="flex flex-col">
                                        <span className="font-label-bold text-outline" style={{}}>
                                            DOSAGE STRENGTH
                                        </span>
                                        <span
                                            className="font-h3 text-h3 text-on-background"
                                            style={{}}
                                        >
                                            10 mg
                                        </span>
                                    </div>
                                    <div className="flex flex-col border-l border-outline-variant pl-4">
                                        <span className="font-label-bold text-outline" style={{}}>
                                            QUANTITY
                                        </span>
                                        <span
                                            className="font-h3 text-h3 text-on-background"
                                            style={{}}
                                        >
                                            30 Tablets
                                        </span>
                                    </div>
                                    <div className="flex flex-col border-l border-outline-variant pl-4">
                                        <span className="font-label-bold text-outline" style={{}}>
                                            PRICE
                                        </span>
                                        <span
                                            className="font-h3 text-h3 text-primary-container"
                                            style={{}}
                                        >
                                            $12.50
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Tabs Section for Technical Data */}
                    <section className="bg-surface-container-lowest rounded-[24px] overflow-hidden border border-outline-variant">
                        <div className="flex border-b border-outline-variant">
                            <button
                                className="flex-1 py-4 font-button text-button tab-active bg-surface-container-low"
                                style={{}}
                            >
                                Administration
                            </button>
                            <button
                                className="flex-1 py-4 font-button text-button text-outline hover:bg-surface-container-low transition-colors"
                                style={{}}
                            >
                                Interactions
                            </button>
                            <button
                                className="flex-1 py-4 font-button text-button text-outline hover:bg-surface-container-low transition-colors"
                                style={{}}
                            >
                                Safety Specs
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3
                                        className="font-h3 text-h3 text-on-background mb-4"
                                        style={{}}
                                    >
                                        How to Take
                                    </h3>
                                    <ul className="space-y-3">
                                        <li
                                            className="flex items-start gap-3 text-body-lg"
                                            style={{}}
                                        >
                                            <span
                                                className="material-symbols-outlined text-primary mt-1"
                                                style={{}}
                                            >
                                                fiber_manual_record
                                            </span>
                                            Take once daily at the same time each day.
                                        </li>
                                        <li
                                            className="flex items-start gap-3 text-body-lg"
                                            style={{}}
                                        >
                                            <span
                                                className="material-symbols-outlined text-primary mt-1"
                                                style={{}}
                                            >
                                                fiber_manual_record
                                            </span>
                                            Can be taken with or without food.
                                        </li>
                                        <li
                                            className="flex items-start gap-3 text-body-lg"
                                            style={{}}
                                        >
                                            <span
                                                className="material-symbols-outlined text-primary mt-1"
                                                style={{}}
                                            >
                                                fiber_manual_record
                                            </span>
                                            Swallow whole with a full glass of water.
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-surface-container rounded-[16px] p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className="material-symbols-outlined text-primary"
                                            style={{}}
                                        >
                                            schedule
                                        </span>
                                        <h4 className="font-label-bold text-primary" style={{}}>
                                            DURATION OF ACTION
                                        </h4>
                                    </div>
                                    <p className="text-body-lg" style={{}}>
                                        Effective for approximately 24 hours per dose.
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-outline-variant">
                                        <h4
                                            className="font-label-bold text-primary mb-2"
                                            style={{}}
                                        >
                                            STORAGE
                                        </h4>
                                        <p className="text-body-lg" style={{}}>
                                            Room temperature (20-25°C). Keep away from moisture.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Warnings & Side Effects */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                        <div className="bg-surface-container-lowest rounded-[24px] p-8 border border-outline-variant">
                            <div className="flex items-center gap-3 mb-6">
                                <span
                                    className="material-symbols-outlined text-error"
                                    style={{ fontVariationSettings: '"FILL" 1' }}
                                >
                                    warning
                                </span>
                                <h3 className="font-h3 text-h3 text-on-background" style={{}}>
                                    Side Effects
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-body-sm font-semibold"
                                    style={{}}
                                >
                                    Dry Cough
                                </span>
                                <span
                                    className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-body-sm font-semibold"
                                    style={{}}
                                >
                                    Dizziness
                                </span>
                                <span
                                    className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-body-sm font-semibold"
                                    style={{}}
                                >
                                    Headache
                                </span>
                                <span
                                    className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-body-sm font-semibold"
                                    style={{}}
                                >
                                    Fatigue
                                </span>
                            </div>
                            <p className="mt-4 text-body-sm text-outline" style={{}}>
                                Consult your doctor if symptoms persist or worsen.
                            </p>
                        </div>
                        <div className="bg-error-container/30 rounded-[24px] p-8 border border-error/10">
                            <div className="flex items-center gap-3 mb-4">
                                <span
                                    className="material-symbols-outlined text-error"
                                    style={{ fontVariationSettings: '"FILL" 1' }}
                                >
                                    emergency_home
                                </span>
                                <h3
                                    className="font-h3 text-h3 text-on-error-container"
                                    style={{}}
                                >
                                    Overdose Alert
                                </h3>
                            </div>
                            <p
                                className="text-body-lg text-on-error-container font-semibold"
                                style={{}}
                            >
                                Seek emergency medical attention immediately.
                            </p>
                            <p
                                className="mt-2 text-body-md text-on-error-container opacity-80"
                                style={{}}
                            >
                                Severe hypotension (very low blood pressure) and electrolyte
                                disturbances can occur. Do not wait for symptoms to appear.
                            </p>
                        </div>
                    </section>
                </div>
                {/* Right Column: Safety & Compliance */}
                <div className="lg:col-span-4 flex flex-col gap-gutter">
                    {/* Safety Badges */}
                    <div className="bg-surface-container-lowest rounded-[24px] p-8 border border-outline-variant flex flex-col gap-6">
                        <h3 className="font-h3 text-h3 text-on-background" style={{}}>
                            Safety Profile
                        </h3>
                        <div className="flex items-center justify-between p-4 bg-secondary-container/20 rounded-[16px]">
                            <div className="flex items-center gap-3">
                                <span
                                    className="material-symbols-outlined text-secondary"
                                    style={{ fontVariationSettings: '"FILL" 1' }}
                                >
                                    pregnant_woman
                                </span>
                                <span className="font-body-lg font-semibold" style={{}}>
                                    Pregnancy Safe
                                </span>
                            </div>
                            <span
                                className="material-symbols-outlined text-secondary"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                                check_circle
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-secondary-container/20 rounded-[16px]">
                            <div className="flex items-center gap-3">
                                <span
                                    className="material-symbols-outlined text-secondary"
                                    style={{ fontVariationSettings: '"FILL" 1' }}
                                >
                                    breastfeeding
                                </span>
                                <span className="font-body-lg font-semibold" style={{}}>
                                    Breastfeeding Safe
                                </span>
                            </div>
                            <span
                                className="material-symbols-outlined text-secondary"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                                check_circle
                            </span>
                        </div>
                        <div className="flex items-center gap-3 p-4 border border-outline-variant rounded-[16px]">
                            <span
                                className="material-symbols-outlined text-primary"
                                style={{}}
                            >
                                child_care
                            </span>
                            <div>
                                <span className="font-label-bold text-outline block" style={{}}>
                                    MINIMUM AGE
                                </span>
                                <span className="font-body-lg font-bold" style={{}}>
                                    72 Months (6 Years)
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Missed Dose Action */}
                    <div className="bg-primary-container text-on-primary-container rounded-[24px] p-8 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-white" style={{}}>
                                notification_important
                            </span>
                            <h3 className="font-h3 text-h3 text-white" style={{}}>
                                Missed Dose?
                            </h3>
                        </div>
                        <p
                            className="text-body-lg text-on-primary-container mb-6 leading-relaxed"
                            style={{}}
                        >
                            Take it as soon as you remember. If it is almost time for your
                            next dose, skip the missed dose.
                            <span className="font-bold underline" style={{}}>
                                Do NOT take two doses at once.
                            </span>
                        </p>
                        <button
                            className="w-full bg-white text-primary-container font-button py-4 rounded-full hover:bg-primary-fixed-dim transition-colors"
                            style={{}}
                        >
                            Set Reminder Alert
                        </button>
                    </div>
                    {/* Contraindications */}
                    <div className="bg-surface-container-lowest rounded-[24px] p-8 border border-outline-variant">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-error" style={{}}>
                                cancel
                            </span>
                            <h3 className="font-h3 text-h3 text-on-background" style={{}}>
                                Contraindications
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            <li
                                className="p-3 border-l-4 border-error bg-error/5 text-body-md"
                                style={{}}
                            >
                                History of angioedema related to previous ACE inhibitor
                                treatment.
                            </li>
                            <li
                                className="p-3 border-l-4 border-error bg-error/5 text-body-md"
                                style={{}}
                            >
                                Concomitant use with aliskiren in patients with diabetes.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>
    {/* Footer */}
    <footer className="w-full py-8 px-6 mt-auto flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center md:items-start">
            <span className="font-bold text-blue-700 font-manrope" style={{}}>
                PharmSense Clinical Excellence System
            </span>
            <p
                className="text-xs font-medium font-manrope text-gray-500 dark:text-gray-400 mt-1"
                style={{}}
            >
                © 2024 All rights reserved. High-accessibility mode active.
            </p>
        </div>
        <div className="flex gap-6">
            <a
                className="text-xs font-medium font-manrope text-gray-500 dark:text-gray-400 hover:text-blue-800 transition-colors"
                href="#"
                style={{}}
            >
                Accessibility Statement
            </a>
            <a
                className="text-xs font-medium font-manrope text-gray-500 dark:text-gray-400 hover:text-blue-800 transition-colors"
                href="#"
                style={{}}
            >
                Privacy Policy
            </a>
            <a
                className="text-xs font-medium font-manrope text-gray-500 dark:text-gray-400 hover:text-blue-800 transition-colors"
                href="#"
                style={{}}
            >
                Emergency Contact
            </a>
        </div>
    </footer>
</>
