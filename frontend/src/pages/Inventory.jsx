<>
    <meta charSet="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>PharmSense - Catalog</title>
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Manrope:wght@600;700;800&display=swap"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
    />
    <style
        dangerouslySetInnerHTML={{
            __html:
                "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .material-symbols-outlined[data-weight=\"fill\"] {\n            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n    "
        }}
    />
    {/* TopNavBar */}
    <header className="bg-white dark:bg-slate-900 font-manrope antialiased w-full top-0 border-b border-slate-200 dark:border-slate-800 shadow-sm z-50 sticky">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1440px] mx-auto">
            <div className="flex items-center gap-8">
                <div
                    className="text-2xl font-black tracking-tight"
                    style={{ color: "#0055A5" }}
                >
                    PharmSense
                </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
                <a
                    className="font-bold border-b-2 pb-1 transition-all"
                    href="#"
                    style={{ color: "#0055A5", borderColor: "#0055A5" }}
                >
                    INVENTORY
                </a>
                <a
                    className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                    href="#"
                >
                    PHARMACY FINDER
                </a>
            </nav>
            <div className="flex items-center gap-4 text-blue-700 dark:text-blue-400">
                <button className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-surface-container">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-surface-container">
                    <span className="material-symbols-outlined">account_circle</span>
                </button>
            </div>
        </div>
    </header>
    <div className="flex flex-1 max-w-[1440px] mx-auto w-full relative">
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12 min-w-0">
            {/* Content Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1
                        className="font-display text-[32px] font-bold text-on-surface tracking-tight"
                        style={{ fontFamily: '"Manrope", sans-serif' }}
                    >
                        PharmSense Inventory
                    </h1>
                    <div
                        className="h-1 w-12 bg-primary mt-2 rounded-full"
                        style={{ backgroundColor: "#0055A5" }}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-surface-container rounded-lg p-1 border border-outline-variant">
                        <button
                            className="p-2 bg-white rounded shadow-sm"
                            style={{ color: "#0055A5" }}
                        >
                            <span className="material-symbols-outlined" data-weight="fill">
                                grid_view
                            </span>
                        </button>
                        <button className="p-2 text-outline hover:text-on-surface">
                            <span className="material-symbols-outlined">view_list</span>
                        </button>
                    </div>
                    <div className="relative">
                        <select className="appearance-none bg-white border border-outline-variant rounded-lg py-2.5 pl-4 pr-10 text-body-md text-on-surface focus:border-primary-container focus:ring-0">
                            <option>Sort by: Relevance</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Alphabetical: A-Z</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                            expand_more
                        </span>
                    </div>
                </div>
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Product Card 1 */}
                <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-[0_8px_24px_rgba(0,85,165,0.04)] hover:shadow-[0_12px_32px_rgba(0,85,165,0.08)] transition-shadow duration-300 relative group">
                    <div className="w-full aspect-square rounded-[16px] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                        <img
                            alt="Ibuprofen 400mg bottle"
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            data-alt="clean studio shot of ibuprofen bottle on white background soft lighting"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2CLzostZK8wEuqOFQIHZnxBeT-ZONtrk6QdhnaWYunoEdHi-qpXmp7dck04QxAI1flgcZ2Ss_AVSX2iDj0UcZm3yZND5pc7ppf_68OfUtKFU5GHkYdB57waZdNJaR-XxIxdxLT4a7euiKsospgLuTLPHGuJAOfNqohstdXtFqmnpj7XZP2-R_xAcgaCzETUv89l0fZL7EnlToztarxhzjudA7tUMfH_SPMjnHSDpHwzEPH8hRoD_tWP3Jg-TH6DHqyaknMoFYn84"
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-h3 text-on-surface">Ibuprofen</h3>
                        </div>
                        <p className="text-body-md text-on-surface-variant">
                            400mg • 50 Tablets
                        </p>
                    </div>
                </article>
                {/* Product Card 2 */}
                <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-[0_8px_24px_rgba(0,85,165,0.04)] hover:shadow-[0_12px_32px_rgba(0,85,165,0.08)] transition-shadow duration-300 relative group">
                    <div className="absolute top-6 left-6 z-10">
                        <span className="bg-error/10 text-error font-label-bold px-3 py-1.5 rounded-full uppercase">
                            Prescription Required
                        </span>
                    </div>
                    <div className="w-full aspect-square rounded-[16px] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                        <img
                            alt="Acetaminophen generic box"
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            data-alt="clinical studio shot of acetaminophen medication box crisp lighting"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnkMrG8Oxx_8a366-hc7Plmr-yxBxB0pz3bHPz0g697kYPDs6gCtpmf5MAC4gw7qRuPp1jKi4UOkv0ml4g8vLzTJ-v1bKRKJK_A4c76CdxRdrEhCygIhnnvesrkQ7guyuck0s1bpPoPgmOx7sdhiu-dNJbSdciM4IIhbxdq-TnmdShEeWkpIHKfHtJyFK16Qc2XNyJpd5mKe7K-uWzVzKNq1CGLnylhhrP5e1mIEUgKtEz8nEr7KIWukLBYlrXW1NArXCZNLYtb9c"
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-h3 text-on-surface">Acetaminophen</h3>
                        </div>
                        <p className="text-body-md text-on-surface-variant">
                            Extra Strength 500mg • 100 Caplets
                        </p>
                    </div>
                </article>
                {/* Product Card 3 */}
                <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-[0_8px_24px_rgba(0,85,165,0.04)] hover:shadow-[0_12px_32px_rgba(0,85,165,0.08)] transition-shadow duration-300 relative group">
                    <div className="w-full aspect-square rounded-[16px] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                        <img
                            alt="Aspirin bottle"
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            data-alt="minimalist studio photography of aspirin bottle soft shadows white background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC23sLwBALnJ35KGyb5QrAjESVe-8IcLW4HRLQBTAdPLGTgerByyc3w-hk9ALOLvG6SSoQh692tThK2ksoEO0CK7tPQD5OdMuvjEnN_7qdMuAq199VBzeEYzyLLOdn2m1KK_fSpp5HUjneLQduEpwiuld837_N6kVStitVsucMItn2A0gK4Iyh3w9avs242Yc2YSO2msmzX_5iIDVaLP1qGJl4w0uTOFHmwoUxxZ19o-hmr8dAQhqJaUiB16YTXcRORh3Mzkl5e1aM"
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-h3 text-on-surface">Aspirin</h3>
                        </div>
                        <p className="text-body-md text-on-surface-variant">
                            Low Dose 81mg • 120 Tablets
                        </p>
                    </div>
                </article>
                {/* Product Card 4 */}
                <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-[0_8px_24px_rgba(0,85,165,0.04)] hover:shadow-[0_12px_32px_rgba(0,85,165,0.08)] transition-shadow duration-300 relative group">
                    <div className="absolute top-6 left-6 z-10">
                        <span className="bg-error/10 text-error font-label-bold px-3 py-1.5 rounded-full uppercase">
                            Prescription Required
                        </span>
                    </div>
                    <div className="w-full aspect-square rounded-[16px] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                        <img
                            alt="Naproxen prescription bottle"
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            data-alt="orange prescription bottle with generic naproxen label clinical white background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl5o5o-Ed4Ybsfwh7lR_PLqIy7Z92I-TBt0B_D-UnBOwe5qPHKyBwtQHXyyCvhiCSsP-y_ZKOlhcliobwykTTbZjOMtILYIcsGz54KhgFB6bhuTaHPBComSkJ4kvYRqxaPWnGspSKnS6zYsgQ-PVSocuA95M1_GH42TUqpqTuYpdEDOOBxt3VU9ZZ2IUmZK6ar7R4TTwE6YiVWl8WEzi5r2YrbL66nuc1Hg-VSUuK-Bu8F_owfmt2LKwbjrFrpQqrXxMClTgG6Oc0"
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-h3 text-on-surface">Naproxen</h3>
                        </div>
                        <p className="text-body-md text-on-surface-variant">
                            500mg • 60 Tablets
                        </p>
                    </div>
                </article>
            </div>
            {/* Pagination */}
            <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full text-outline hover:bg-surface-container transition-colors disabled:opacity-50">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full text-on-primary font-label-bold"
                        style={{ backgroundColor: "#0055A5" }}
                    >
                        1
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container font-label-bold transition-colors">
                        2
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container font-label-bold transition-colors">
                        3
                    </button>
                    <span className="text-on-surface-variant mx-1">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full text-outline hover:bg-surface-container transition-colors">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </nav>
            </div>
        </main>
    </div>
    {/* Footer */}
    <footer className="bg-white dark:bg-slate-900 font-manrope text-xs text-slate-500 full-width border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full mt-auto">
        <div
            className="text-lg font-bold mb-4 md:mb-0"
            style={{ color: "#0055A5", opacity: "0.8" }}
        >
            PharmSense
        </div>
        <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <a
                className="text-slate-500 hover:text-blue-600 transition-colors"
                href="#"
            >
                Privacy Policy
            </a>
            <a
                className="text-slate-500 hover:text-blue-600 transition-colors"
                href="#"
            >
                Terms of Service
            </a>
            <a
                className="text-slate-500 hover:text-blue-600 transition-colors"
                href="#"
            >
                Pharmacist Chat
            </a>
            <a
                className="text-slate-500 hover:text-blue-600 transition-colors"
                href="#"
            >
                Contact Support
            </a>
        </nav>
        <div className="text-center md:text-right">
            © 2024 PharmSense Digital Pharmacy. All rights reserved. Licensed
            Healthcare Provider.
        </div>
    </footer>
</>
