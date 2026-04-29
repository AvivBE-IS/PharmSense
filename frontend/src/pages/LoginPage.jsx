/**
 * LoginPage — dark themed sign-in form.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      const detail = err?.response?.data?.detail
      setError(detail || 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased">
      <div className="flex-grow flex flex-col md:flex-row h-screen">
        <div className="hidden md:block md:w-1/2 relative bg-surface-container-high overflow-hidden rounded-r-[32px] ambient-shadow z-10">
          <img
            alt="Professional pharmacist smiling warmly in a bright, modern, and sterile clinical environment with soft natural lighting"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdmxEdwqAeTTDNdU0vwzZCB-vGbwuh7DY-oMZzHLkB121p2eEsuJCuFsUn4U4aHYZrsG6dOG_x7Z2yQoNt2PYGAXqLydY0K7UoONahiv6luXiBRZ91DgW-7iYZAW3t5SFKufdoM-5ATpx6SypqzLcw2ENp63s2VKlNffrREqSaJ0QPE3owTerQMqDT9M3Tx4d8qWfJlOZIcWl_RTpzGZw8Y-zjZXaYbMJkSjTprrM-c6zVkyBHmubiMNwKcbA69nqwA4U7JUHvnxU"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-12">
            <h1 className="font-h1 text-h1 text-on-primary mb-4">Empathetic Care,<br />Clinical Precision.</h1>
            <p className="font-body-lg text-body-lg text-inverse-primary max-w-md">with pharmsense your health managed with efficiency and trust in a modern digital environment.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background relative z-0">
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            <span className="font-h3 text-h3 text-primary-container tracking-tight">PharmSense</span>
          </div>
          <div className="w-full max-w-md bg-surface-container-lowest rounded-[24px] p-8 sm:p-10 ambient-shadow border border-outline-variant/30">
            <div className="mb-10 text-center">
              <h2 className="font-h2 text-h2 text-on-surface mb-2">WELCOME</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Log in to manage your prescriptions.</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <label className="font-label-bold text-label-bold text-on-surface-variant block mb-2 uppercase" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                  <input
                    className="w-full h-[56px] pl-12 pr-4 bg-surface rounded-[16px] border border-outline-variant focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-on-surface font-body-md text-body-md transition-all outline-none"
                    id="email"
                    placeholder="patient@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-label-bold text-label-bold text-on-surface-variant uppercase" htmlFor="password">Password</label>
                  <a className="font-body-sm text-body-sm text-primary-container hover:underline transition-all" href="#">Forgot Password?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input
                    className="w-full h-[56px] pl-12 pr-4 bg-surface rounded-[16px] border border-outline-variant focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-on-surface font-body-md text-body-md transition-all outline-none"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" type="button">
                    <span className="material-symbols-outlined">visibility_off</span>
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <button
                  className="w-full h-[56px] bg-primary-container text-on-primary font-button text-button rounded-[24px] shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(to-r, #0055a5, #006e6e)' }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Logging in...' : 'Login'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </form>
            {error && (
              <div className="mt-4 text-center font-body-sm text-body-sm text-error">
                {error}
              </div>
            )}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface-container-lowest text-on-surface-variant font-body-sm text-body-sm">Or</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full h-[56px] bg-surface rounded-[24px] border border-outline-variant text-on-surface font-button text-button hover:bg-surface-dim transition-colors flex items-center justify-center gap-3" type="button">
                  <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
                  <span>Login with Bio-ID</span>
                </button>
              </div>
            </div>
            <p className="mt-8 text-center font-body-sm text-body-sm text-on-surface-variant">
              Don't have an account? <a className="text-primary-container font-semibold hover:underline" href="#">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
