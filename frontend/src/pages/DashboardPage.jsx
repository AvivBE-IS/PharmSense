/**
 * DashboardPage — Professional dark AI chat interface.
 */

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { sendMessage } from '../api/chatApi'

// ── Design tokens (inline styles for values Tailwind can't express) ────────────
const token = {
  surface:      'rgba(255,255,255,0.04)',
  surfaceHover: 'rgba(255,255,255,0.07)',
  border:       'rgba(148,163,184,0.12)',
  borderAccent: 'rgba(124,58,237,0.35)',
  gradientBtn:  'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
  gradientHero: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)',
  userBubble:   'linear-gradient(135deg, #6d28d9 0%, #1d4ed8 100%)',
  aiBubble:     '#131325',
  aiBorder:     'rgba(124,58,237,0.25)',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SourceCard({ source, snippet, relevance_score }) {
  const pct = Math.round(relevance_score * 100)
  const color = pct >= 60 ? '#34d399' : pct >= 30 ? '#fbbf24' : '#94a3b8'
  return (
    <div
      className="mt-2 rounded-xl px-3 py-2.5 text-xs"
      style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.18)' }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          <span className="font-semibold uppercase tracking-wider" style={{ color: '#34d399' }}>{source}</span>
        </div>
        <span className="font-mono" style={{ color }}>{pct}% match</span>
      </div>
      <p className="leading-relaxed line-clamp-2" style={{ color: '#94a3b8' }}>{snippet}</p>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-3 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>

      {/* AI avatar */}
      {!isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-black mt-0.5 shadow-lg"
          style={{ background: token.gradientBtn, boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}
        >
          Rx
        </div>
      )}

      <div className={`max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <div
          className="rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
          style={isUser
            ? { background: token.userBubble, color: '#fff', borderRadius: '18px 18px 4px 18px', boxShadow: '0 4px 20px rgba(109,40,217,0.3)' }
            : { background: token.aiBubble, color: '#e2e8f0', border: `1px solid ${token.aiBorder}`, borderRadius: '18px 18px 18px 4px' }
          }
        >
          {message.content}
        </div>

        {/* Sources */}
        {!isUser && message.sources?.length > 0 && (
          <div className="w-full">
            {message.sources.map((s, i) => <SourceCard key={i} {...s} />)}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] mt-1.5 px-1" style={{ color: '#475569' }}>{message.timestamp}</span>
      </div>

      {/* User avatar */}
      {isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold mt-0.5"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          You
        </div>
      )}
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      <div
        className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
        style={{ background: token.gradientBtn }}
      >
        <div className="flex gap-0.5">
          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
        </div>
      </div>
      <div className="text-sm mt-2" style={{ color: '#64748b' }}>Searching knowledge base…</div>
    </div>
  )
}

const CHIPS = [
  { label: 'Warfarin interactions', icon: '💊' },
  { label: 'Metformin contraindications', icon: '⚠️' },
  { label: 'Creatinine clearance formula', icon: '🧮' },
  { label: 'CYP3A4 inhibitors', icon: '🔬' },
]

function nowStr() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuth()

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState('Local Context')
  const [chatError, setChatError] = useState(null)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const hasMessages = messages.length > 0

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => { inputRef.current?.focus() }, [])

  async function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: text, timestamp: nowStr() }])
    setInput('')
    setIsLoading(true)
    setChatError(null)
    try {
      const res = await sendMessage(text)
      setDataSource(res.data_source ?? 'Local Context')
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'assistant',
        content: res.reply, sources: res.sources ?? [], timestamp: nowStr(),
      }])
    } catch {
      setChatError('Failed to reach the assistant. Please try again.')
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased">
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-[0_20px_40px_-15px_rgba(0,85,165,0.04)] w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-20 w-full">
          <div className="text-2xl font-black tracking-tighter text-blue-800 dark:text-blue-300">
            PharmSense
          </div>
          <nav className="hidden md:flex space-x-6 font-manrope text-sm font-medium tracking-wide">
            <a className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 px-3 py-2" href="#">Prescriptions</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 px-3 py-2" href="#">Refills</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 px-3 py-2" href="#">Pharmacy Finder</a>
            <a className="text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1 px-3 py-2" href="#">Health AI</a>
          </nav>
          <div className="flex items-center space-x-4 text-blue-700 dark:text-blue-400">
            <button className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 p-2">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 p-2">
              <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-8 max-w-7xl mx-auto w-full gap-16">
        <section className="w-full max-w-3xl flex flex-col items-center text-center space-y-8 mt-12">
          <h1 className="font-h1 text-h1 text-primary">How can I help you with your medication today?</h1>
          <div className="relative w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-[24px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-surface-container-lowest rounded-[24px] p-2 shadow-sm border border-[#E2E8F0]">
              <span className="material-symbols-outlined text-primary-container ml-4" data-icon="temp_preferences_custom">temp_preferences_custom</span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface placeholder:text-outline h-[56px] px-4"
                placeholder="Ask PharmSense AI..."
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="bg-primary text-on-primary rounded-xl px-6 py-3 font-button text-button hover:-translate-y-0.5 transition-transform shadow-md ml-2 flex items-center gap-2"
                onClick={handleSend}
                disabled={isLoading}
              >
                <span>{isLoading ? 'Asking...' : 'Ask AI'}</span>
                <span className="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
              </button>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-outline">Powered by advanced clinical intelligence.</p>
        </section>
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <a className="bg-surface-container-lowest rounded-[24px] p-8 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,62,123,0.04)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start gap-4 cursor-pointer" href="#">
            <div className="bg-primary-fixed-dim/20 p-4 rounded-full text-primary-container group-hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-3xl" data-icon="upload_file">upload_file</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface mt-2">Upload Prescription</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">Quickly scan or upload your new prescriptions for processing.</p>
            <div className="mt-4 font-label-bold text-label-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              START <span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
            </div>
          </a>
          <a className="bg-surface-container-lowest rounded-[24px] p-8 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,62,123,0.04)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start gap-4 cursor-pointer" href="#">
            <div className="bg-secondary-fixed-dim/20 p-4 rounded-full text-secondary group-hover:bg-secondary-fixed transition-colors">
              <span className="material-symbols-outlined text-3xl" data-icon="medical_information">medical_information</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface mt-2">Consult a Pharmacist</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">Connect with our clinical team for dosage or side-effect inquiries.</p>
            <div className="mt-4 font-label-bold text-label-bold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all">
              CONNECT <span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
            </div>
          </a>
          <a className="bg-surface-container-lowest rounded-[24px] p-8 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,62,123,0.04)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start gap-4 cursor-pointer" href="#">
            <div className="bg-tertiary-fixed-dim/20 p-4 rounded-full text-tertiary group-hover:bg-tertiary-fixed transition-colors">
              <span className="material-symbols-outlined text-3xl" data-icon="inventory_2">inventory_2</span>
            </div>
            <h3 className="font-h3 text-h3 text-on-surface mt-2">My Regular Orders</h3>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">Manage and track your recurring medication deliveries.</p>
            <div className="mt-4 font-label-bold text-label-bold text-tertiary flex items-center gap-1 group-hover:gap-2 transition-all">
              MANAGE <span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
            </div>
          </a>
        </section>
        <section className="w-full max-w-4xl text-center space-y-6">
          <h4 className="font-label-bold text-label-bold text-outline uppercase tracking-widest">Trending Health Topics</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm rounded-full cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/30 shadow-sm">Allergy Season Prep</span>
            <span className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm rounded-full cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/30 shadow-sm">Managing Hypertension</span>
            <span className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm rounded-full cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/30 shadow-sm">Vitamin D Supplements</span>
            <span className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-body-sm text-body-sm rounded-full cursor-pointer hover:bg-surface-variant transition-colors border border-outline-variant/30 shadow-sm">Medication Interactions</span>
          </div>
        </section>
      </main>
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          <div className="font-bold text-slate-900 dark:text-slate-100 font-manrope text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
            © 2024 PharmSense Digital Healthcare. Clinical Excellence Guaranteed.
          </div>
          <nav className="flex space-x-6 font-manrope text-xs uppercase tracking-widest">
            <a className="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors" href="#">Terms of Care</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors" href="#">Privacy Shield</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors" href="#">HIPAA Compliance</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors" href="#">Pharmacist Login</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

// ── Chat sub-components ───────────────────────────────────────────────────────
