import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(detail || t("login.loginFailed"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    /* Outer wrapper always LTR — prevents the split layout from flipping */
    <div
      dir="ltr"
      className="bg-background text-on-background min-h-screen flex flex-col antialiased"
    >
      <div className="flex-grow flex flex-col md:flex-row h-screen">
        {/* Left panel — pharmacist image, shrink-0 prevents reflow */}
        <div className="hidden md:block md:w-1/2 shrink-0 relative bg-surface-container-high overflow-hidden rounded-r-[32px] ambient-shadow z-10">
          <img
            alt="Professional pharmacist smiling warmly in a bright, modern clinical environment"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdmxEdwqAeTTDNdU0vwzZCB-vGbwuh7DY-oMZzHLkB121p2eEsuJCuFsUn4U4aHYZrsG6dOG_x7Z2yQoNt2PYGAXqLydY0K7UoONahiv6luXiBRZ91DgW-7iYZAW3t5SFKufdoM-5ATpx6SypqzLcw2ENp63s2VKlNffrREqSaJ0QPE3owTerQMqDT9M3Tx4d8qWfJlOZIcWl_RTpzGZw8Y-zjZXaYbMJkSjTprrM-c6zVkyBHmubiMNwKcbA69nqwA4U7JUHvnxU"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-12">
            <h1 className="font-h1 text-h1 text-on-primary mb-4 whitespace-pre-line">
              {t("login.tagline")}
            </h1>
            <p className="font-body-lg text-body-lg text-inverse-primary max-w-md">
              {t("login.taglineSub")}
            </p>
          </div>
        </div>

        {/* Right panel — login form; dir scoped here so text/icons follow language */}
        <div
          dir={dir}
          className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background relative z-0"
        >
          {/* Logo — always top-left regardless of language */}
          <div
            dir="ltr"
            className="absolute top-8 start-8 flex items-center gap-2"
          >
            <span
              className="material-symbols-outlined text-primary-container text-3xl"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              medical_services
            </span>
            <span className="font-h3 text-h3 text-primary-container tracking-tight">
              PharmSense
            </span>
          </div>
          {/* Switcher — always top-right regardless of language */}
          <div dir="ltr" className="absolute top-8 end-8">
            <LanguageSwitcher />
          </div>

          {/* Card */}
          <div className="w-full max-w-md bg-surface-container-lowest rounded-[24px] p-8 sm:p-10 ambient-shadow border border-outline-variant/30">
            <div className="mb-10 text-center">
              <h2 className="font-h2 text-h2 text-on-surface mb-2">
                {t("login.welcome")}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t("login.subtitle")}
              </p>
            </div>

            {error && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-error-container text-on-error-container text-sm font-medium">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  className="font-label-bold text-label-bold text-on-surface-variant block mb-2 uppercase"
                  htmlFor="email"
                >
                  {t("login.emailLabel")}
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute start-4 top-1/2 -translate-y-1/2 text-outline select-none">
                    mail
                  </span>
                  <input
                    className="w-full h-[56px] ps-12 pe-4 bg-surface rounded-[16px] border border-outline-variant focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-on-surface font-body-md text-body-md transition-all outline-none"
                    id="email"
                    placeholder={t("login.emailPlaceholder")}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="font-label-bold text-label-bold text-on-surface-variant uppercase"
                    htmlFor="password"
                  >
                    {t("login.passwordLabel")}
                  </label>
                  <a
                    className="font-body-sm text-body-sm text-primary-container hover:underline transition-all"
                    href="#"
                  >
                    {t("login.forgotPassword")}
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute start-4 top-1/2 -translate-y-1/2 text-outline select-none">
                    lock
                  </span>
                  <input
                    className="w-full h-[56px] ps-12 pe-12 bg-surface rounded-[16px] border border-outline-variant focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-on-surface font-body-md text-body-md transition-all outline-none"
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="absolute end-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  className="w-full h-[56px] text-on-primary font-button text-button rounded-[24px] shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(to right, #0055a5, #006e6e)",
                  }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting ? t("login.loggingIn") : t("login.loginBtn")}
                  </span>
                  {!isSubmitting && (
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center font-body-sm text-body-sm text-on-surface-variant">
              {t("login.noAccount")}{" "}
              <a
                className="text-primary-container font-semibold hover:underline"
                href="#"
              >
                {t("login.register")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
