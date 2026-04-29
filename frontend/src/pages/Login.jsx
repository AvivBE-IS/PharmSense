<>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>PharmaCare - Login</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Manrope:wght@400;600;700;800&display=swap"
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
        "\n        .ambient-shadow {\n            box-shadow: 0 10px 20px -5px rgba(0, 85, 165, 0.04), 0 8px 16px -8px rgba(0, 85, 165, 0.04);\n        }\n    "
    }}
  />
  <div className="flex-grow flex flex-col md:flex-row h-screen">
    <div className="hidden md:block md:w-1/2 relative bg-surface-container-high overflow-hidden rounded-r-[32px] ambient-shadow z-10">
      <img
        alt="Professional pharmacist smiling warmly in a bright, modern, and sterile clinical environment with soft natural lighting"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        data-alt="Professional pharmacist smiling warmly in a bright, modern, and sterile clinical environment with soft natural lighting"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdmxEdwqAeTTDNdU0vwzZCB-vGbwuh7DY-oMZzHLkB121p2eEsuJCuFsUn4U4aHYZrsG6dOG_x7Z2yQoNt2PYGAXqLydY0K7UoONahiv6luXiBRZ91DgW-7iYZAW3t5SFKufdoM-5ATpx6SypqzLcw2ENp63s2VKlNffrREqSaJ0QPE3owTerQMqDT9M3Tx4d8qWfJlOZIcWl_RTpzGZw8Y-zjZXaYbMJkSjTprrM-c6zVkyBHmubiMNwKcbA69nqwA4U7JUHvnxU"
        style={{}}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-12">
        <h1
          className="font-h1 text-5xl md:text-[56px] leading-tight text-on-primary mb-4 font-extrabold"
          style={{}}
        >
          Empathetic Care,
          <br />
          Clinical Precision.
        </h1>
        <p
          className="font-body-lg text-2xl text-inverse-primary max-w-lg leading-relaxed"
          style={{}}
        >
          with pharmsense your health managed with efficiency and trust in a
          modern digital environment.
        </p>
      </div>
    </div>
    <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background relative z-0">
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <span
          className="material-symbols-outlined text-primary-container text-4xl"
          data-weight="fill"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          medical_services
        </span>
        <span
          className="font-h3 text-4xl text-primary-container tracking-tight font-bold"
          style={{}}
        >
          PharmSense
        </span>
      </div>
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-[32px] p-8 sm:p-12 ambient-shadow border border-outline-variant/30">
        <div className="mb-10 text-center">
          <h2
            className="font-h2 text-4xl sm:text-5xl font-extrabold text-on-surface mb-4"
            style={{}}
          >
            Welcome&nbsp;
          </h2>
          <p
            className="font-body-md text-xl text-on-surface-variant"
            style={{}}
          >
            Log in to manage your prescriptions.
          </p>
        </div>
        <form className="space-y-8">
          <div className="relative">
            <label
              className="font-label-bold text-lg font-bold tracking-wide text-on-surface-variant block mb-3 uppercase"
              htmlFor="email"
              style={{}}
            >
              Email Address
            </label>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline text-2xl"
                style={{}}
              >
                mail
              </span>
              <input
                className="w-full h-[64px] pl-14 pr-6 bg-surface rounded-[20px] border-2 border-outline-variant focus:border-primary-container focus:ring-4 focus:ring-primary-container/20 text-on-surface font-body-md text-xl transition-all outline-none"
                id="email"
                placeholder="patient@example.com"
                type="email"
              />
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <label
                className="font-label-bold text-lg font-bold tracking-wide text-on-surface-variant uppercase"
                htmlFor="password"
                style={{}}
              >
                Password
              </label>
              <a
                className="font-body-sm text-lg font-semibold text-primary-container hover:underline transition-all"
                href="#"
                style={{}}
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline text-2xl"
                style={{}}
              >
                lock
              </span>
              <input
                className="w-full h-[64px] pl-14 pr-6 bg-surface rounded-[20px] border-2 border-outline-variant focus:border-primary-container focus:ring-4 focus:ring-primary-container/20 text-on-surface font-body-md text-xl transition-all outline-none"
                id="password"
                placeholder="••••••••"
                type="password"
              />
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                style={{}}
                type="button"
              >
                <span className="material-symbols-outlined text-2xl" style={{}}>
                  visibility_off
                </span>
              </button>
            </div>
          </div>
          <div className="pt-6">
            <button
              className="w-full h-[72px] bg-primary-container text-on-primary font-button text-2xl font-bold rounded-[36px] shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 bg-gradient-to-r from-primary-container to-[#006e6e]"
              style={{}}
              type="button"
            >
              <span className="" style={{}}>
                Login
              </span>
              <span
                className="material-symbols-outlined text-2xl font-bold"
                style={{}}
              >
                arrow_forward
              </span>
            </button>
          </div>
        </form>
        <p
          className="mt-10 text-center font-body-sm text-xl text-on-surface-variant"
          style={{}}
        >
          Don't have an account?{" "}
          <a
            className="text-primary-container font-bold hover:underline"
            href="#"
            style={{}}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  </div>
</>
