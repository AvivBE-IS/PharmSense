<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>PharmSense - AI Dashboard</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Manrope:wght@400;600;700;800&display=swap"
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
  {/* TopNavBar component generated from JSON */}
  <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-[0_20px_40px_-15px_rgba(0,85,165,0.04)] w-full">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-20 w-full">
      <div
        className="text-2xl font-black tracking-tighter text-blue-800 dark:text-blue-300"
        style={{}}
      >
        PharmSense
      </div>
      <nav className="hidden md:flex space-x-6 font-manrope text-sm font-medium tracking-wide">
        <a
          className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 px-3 py-2 uppercase tracking-wide"
          href="#"
        >
          Inventory
        </a>
        <a
          className="dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300 px-3 py-2 uppercase tracking-wide text-[#0055A5] border-b-2 border-[#0055A5] rounded-t-lg"
          href="#"
        >
          Pharmacy Finder
        </a>
      </nav>
      <div className="flex items-center space-x-4 text-blue-700 dark:text-blue-400">
        <button
          className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 p-2"
          style={{}}
        >
          <span
            className="material-symbols-outlined"
            data-icon="notifications"
            style={{}}
          >
            notifications
          </span>
        </button>
        <button
          className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 p-2"
          style={{}}
        >
          <span
            className="material-symbols-outlined"
            data-icon="account_circle"
            style={{}}
          >
            account_circle
          </span>
        </button>
      </div>
    </div>
  </header>
  <main className="flex-grow flex flex-col items-center justify-center p-8 max-w-7xl mx-auto w-full gap-16">
    {/* Central AI Search */}
    <section className="w-full max-w-3xl flex flex-col items-center text-center space-y-8 mt-24">
      <h1 className="font-h1 text-h1 text-primary" style={{}}>
        How can I help you with your medication today?
      </h1>
      <div className="relative w-full group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-[24px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative flex items-center bg-surface-container-lowest rounded-[24px] p-2 shadow-sm border border-[#E2E8F0]">
          <span
            className="material-symbols-outlined text-primary-container ml-4"
            data-icon="temp_preferences_custom"
            style={{}}
          >
            temp_preferences_custom
          </span>
          <input
            className="w-full bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface placeholder:text-outline h-[56px] px-4"
            placeholder="Ask PharmSense AI..."
            type="text"
          />
          <button
            className="bg-primary text-on-primary rounded-xl px-6 py-3 font-button text-button hover:-translate-y-0.5 transition-transform shadow-md ml-2 flex items-center gap-2"
            style={{}}
          >
            <span className="" style={{}}>
              Ask AI
            </span>
            <span
              className="material-symbols-outlined text-[20px]"
              data-icon="arrow_forward"
              style={{}}
            >
              arrow_forward
            </span>
          </button>
        </div>
      </div>
      <p className="font-body-sm text-body-sm text-outline" style={{}}>
        Powered by advanced clinical intelligence.
      </p>
    </section>
    {/* Quick Actions */}
    {/* Trending Topics */}
    <section className="w-full max-w-4xl text-center space-y-6">
      <h4
        className="font-label-bold text-label-bold text-outline uppercase tracking-widest"
        style={{}}
      >
        Trending Health Topics
      </h4>
      <div className="flex flex-wrap justify-center gap-3">
        <span
          className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm rounded-full cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/30 shadow-sm"
          style={{}}
        >
          Allergy Season Prep
        </span>
        <span
          className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm rounded-full cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/30 shadow-sm"
          style={{}}
        >
          Managing Hypertension
        </span>
        <span
          className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm rounded-full cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/30 shadow-sm"
          style={{}}
        >
          Vitamin D Supplements
        </span>
        <span
          className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm rounded-full cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/30 shadow-sm"
          style={{}}
        >
          Medication Interactions
        </span>
      </div>
    </section>
  </main>
  {/* Footer component generated from JSON */}
  <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 w-full mt-auto">
    <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-8 w-full">
      <div
        className="font-bold text-slate-900 dark:text-slate-100 font-manrope text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500"
        style={{}}
      >
        © 2024 PharmSense Digital Healthcare. Clinical Excellence Guaranteed.
      </div>
      <nav className="flex space-x-6 font-manrope text-xs uppercase tracking-widest">
        <a
          className="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          href="#"
          style={{}}
        >
          Terms of Care
        </a>
        <a
          className="dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-[#0055A5] border-b-2 border-[#0055A5] rounded-t-lg"
          href="#"
          style={{}}
        >
          Privacy Shield
        </a>
        <a
          className="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          href="#"
          style={{}}
        >
          HIPAA Compliance
        </a>
        <a
          className="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          href="#"
          style={{}}
        >
          Pharmacist Login
        </a>
      </nav>
    </div>
  </footer>
</>
