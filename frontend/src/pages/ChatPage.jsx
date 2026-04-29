/**
 * ChatPage — AI-powered chat dashboard for PharmSense.
 *
 * Developer note (Dev 1 — UI team):
 *   - All styling uses Tailwind CSS utility classes.
 *   - API calls go through chatApi.js — do not import apiClient directly.
 *   - To add conversation history, pass a `history` array to sendMessage().
 */

import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../api/chatApi'

// ── Sub-components ────────────────────────────────────────────────────────────

function DataSourceBadge({ label, active }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pharma-50 border border-pharma-200 text-pharma-700 text-xs font-medium select-none">
      <span
        className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}
      />
      {label}
    </div>
  )
}

function SourceCard({ source, snippet, relevance_score }) {
  return (
    <div className="mt-2 rounded-lg border border-pharma-100 bg-pharma-50 px-3 py-2 text-xs text-slate-600">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-pharma-700 uppercase tracking-wide">{source}</span>
        <span className="text-slate-400">{Math.round(relevance_score * 100)}% match</span>
      </div>
      <p className="leading-relaxed line-clamp-2">{snippet}</p>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {/* Avatar — bot only */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pharma-600 text-white text-xs font-bold flex items-center justify-center mr-2 mt-1 shadow">
          AI
        </div>
      )}

      <div className={`max-w-[72%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-pharma-600 text-white rounded-br-sm'
              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
          }`}
        >
          {message.content}
        </div>

        {/* Source cards — bot messages only */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="w-full mt-1">
            {message.sources.map((s, i) => (
              <SourceCard key={i} {...s} />
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-slate-400 mt-1 px-1">
          {message.timestamp}
        </span>
      </div>

      {/* Avatar — user only */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center ml-2 mt-1 shadow">
          You
        </div>
      )}
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="w-8 h-8 rounded-full bg-pharma-600 text-white text-xs font-bold flex items-center justify-center mr-2 mt-1 shadow flex-shrink-0">
        AI
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          <span className="w-2 h-2 bg-pharma-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-pharma-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-pharma-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const WELCOME_MESSAGE = {
  id: 0,
  role: 'assistant',
  content:
    'Hello! I\'m your PharmSense AI assistant.\n\n' +
    'Ask me about drug interactions, medications, adverse reactions, or pharmaceutical calculations. ' +
    'I\'ll search the local knowledge base and show you the relevant sources.',
  sources: [],
  timestamp: now(),
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState('Local Context')
  const [error, setError] = useState(null)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: now(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendMessage(text)

      const botMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.reply,
        sources: response.sources ?? [],
        timestamp: now(),
      }

      setDataSource(response.data_source ?? 'Local Context')
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      setError('Failed to reach the assistant. Please try again.')
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col">
      <header className="bg-white dark:bg-slate-900 font-manrope antialiased w-full top-0 border-b border-slate-200 dark:border-slate-800 shadow-sm z-50 sticky">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-black text-blue-700 dark:text-blue-400 tracking-tight">PharmSense</div>
            <div className="hidden md:flex items-center bg-surface-container rounded-full px-4 py-2 border border-outline-variant focus-within:border-primary-container transition-colors w-96">
              <span className="material-symbols-outlined text-outline mr-2">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-body-md text-on-surface w-full placeholder-outline" placeholder="Search medications, health products..." type="text" />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">Prescriptions</a>
            <a className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">Refills</a>
            <a className="text-blue-700 dark:text-blue-400 font-bold border-b-2 border-blue-700 pb-1 opacity-80 scale-95 transition-all" href="#">Health Hub</a>
            <a className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">Consultation</a>
          </nav>
          <div className="flex items-center gap-4 text-blue-700 dark:text-blue-400">
            <button className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-surface-container"><span className="material-symbols-outlined">shopping_cart</span></button>
            <button className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-surface-container"><span className="material-symbols-outlined">notifications</span></button>
            <button className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-surface-container"><span className="material-symbols-outlined">account_circle</span></button>
          </div>
        </div>
      </header>
      <div className="flex flex-1 max-w-[1440px] mx-auto w-full relative">
        <aside className="bg-slate-50 dark:bg-slate-950 font-manrope text-sm font-medium h-[calc(100vh-80px)] w-72 border-r border-slate-200 dark:border-slate-800 sticky top-[80px] hidden lg:flex flex-col">
          <div className="p-6 pb-2 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-h3 text-on-surface">Catalog</h2>
            <p className="text-body-sm text-on-surface-variant mt-1">Browse by Category</p>
          </div>
          <nav className="flex flex-col gap-2 p-6 flex-1 overflow-y-auto">
            <a className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-bold flex items-center gap-3 p-3 scale-98" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medication</span>
              Pain Relief
            </a>
            <a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg flex items-center gap-3 p-3 hover:translate-x-1 transition-transform duration-200" href="#">
              <span className="material-symbols-outlined">pill</span>
              Vitamins
            </a>
            <a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg flex items-center gap-3 p-3 hover:translate-x-1 transition-transform duration-200" href="#">
              <span className="material-symbols-outlined">medical_services</span>
              First Aid
            </a>
            <a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg flex items-center gap-3 p-3 hover:translate-x-1 transition-transform duration-200" href="#">
              <span className="material-symbols-outlined">thermostat</span>
              Cold & Flu
            </a>
            <a className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg flex items-center gap-3 p-3 hover:translate-x-1 transition-transform duration-200" href="#">
              <span className="material-symbols-outlined">vital_signs</span>
              Chronic Care
            </a>
          </nav>
          <div className="p-6 border-t border-slate-200 dark:border-slate-800">
            <button className="w-full bg-primary-container text-on-primary font-button py-3 px-4 rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,85,165,0.2)]">
              <span className="material-symbols-outlined">upload_file</span>
              Upload Prescription
            </button>
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-12 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="font-h2 text-on-surface">Pain Relief</h1>
              <p className="text-body-md text-on-surface-variant mt-2">Showing 24 products in Pain Relief</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-surface-container rounded-lg p-1 border border-outline-variant">
                <button className="p-2 bg-white rounded shadow-sm text-primary-container"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span></button>
                <button className="p-2 text-outline hover:text-on-surface"><span className="material-symbols-outlined">view_list</span></button>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border border-outline-variant rounded-lg py-2.5 pl-4 pr-10 text-body-md text-on-surface focus:border-primary-container focus:ring-0">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Alphabetical: A-Z</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-[0_8px_24px_rgba(0,85,165,0.04)] hover:shadow-[0_12px_32px_rgba(0,85,165,0.08)] transition-shadow duration-300 relative group">
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-secondary/10 text-secondary font-label-bold px-3 py-1.5 rounded-full uppercase">Over the Counter</span>
              </div>
              <div className="w-full aspect-square rounded-[16px] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                <img alt="Ibuprofen 400mg bottle" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2CLzostZK8wEuqOFQIHZnxBeT-ZONtrk6QdhnaWYunoEdHi-qpXmp7dck04QxAI1flgcZ2Ss_AVSX2iDj0UcZm3yZND5pc7ppf_68OfUtKFU5GHkYdB57waZdNJaR-XxIxdxLT4a7euiKsospgLuTLPHGuJAOfNqohstdXtFqmnpj7XZP2-R_xAcgaCzETUv89l0fZL7EnlToztarxhzjudA7tUMfH_SPMjnHSDpHwzEPH8hRoD_tWP3Jg-TH6DHqyaknMoFYn84" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-h3 text-on-surface">Ibuprofen</h3>
                  <span className="font-h3 text-primary-container">$8.99</span>
                </div>
                <p className="text-body-md text-on-surface-variant mb-4">400mg • 50 Tablets</p>
                <div className="mt-auto">
                  <button className="w-full bg-secondary text-on-secondary font-button py-3 px-4 rounded-[24px] hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-[0_4px_12px_rgba(0,106,106,0.15)] hover:shadow-[0_6px_16px_rgba(0,106,106,0.25)] flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-[0_8px_24px_rgba(0,85,165,0.04)] hover:shadow-[0_12px_32px_rgba(0,85,165,0.08)] transition-shadow duration-300 relative group">
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-error/10 text-error font-label-bold px-3 py-1.5 rounded-full uppercase">Prescription Required</span>
              </div>
              <div className="w-full aspect-square rounded-[16px] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                <img alt="Acetaminophen generic box" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnkMrG8Oxx_8a366-hc7Plmr-yxBxB0pz3bHPz0g697kYPDs6gCtpmf5MAC4gw7qRuPp1jKi4UOkv0ml4g8vLzTJ-v1bKRKJK_A4c76CdxRdrEhCygIhnnvesrkQ7guyuck0s1bpPoPgmOx7sdhiu-dNJbSdciM4IIhbxdq-TnmdShEeWkpIHKfHtJyFK16Qc2XNyJpd5mKe7K-uWzVzKNq1CGLnylhhrP5e1mIEUgKtEz8nEr7KIWukLBYlrXW1NArXCZNLYtb9c" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-h3 text-on-surface">Acetaminophen</h3>
                  <span className="font-h3 text-primary-container">$12.50</span>
                </div>
                <p className="text-body-md text-on-surface-variant mb-4">Extra Strength 500mg • 100 Caplets</p>
                <div className="mt-auto">
                  <button className="w-full bg-primary-container text-on-primary font-button py-3 px-4 rounded-[24px] hover:bg-primary transition-colors shadow-[0_4px_12px_rgba(0,85,165,0.15)] hover:shadow-[0_6px_16px_rgba(0,85,165,0.25)] flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                    Upload Rx to Add
                  </button>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-[0_8px_24px_rgba(0,85,165,0.04)] hover:shadow-[0_12px_32px_rgba(0,85,165,0.08)] transition-shadow duration-300 relative group">
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-secondary/10 text-secondary font-label-bold px-3 py-1.5 rounded-full uppercase">Over the Counter</span>
              </div>
              <div className="w-full aspect-square rounded-[16px] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                <img alt="Aspirin bottle" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC23sLwBALnJ35KGyb5QrAjESVe-8IcLW4HRLQBTAdPLGTgerByyc3w-hk9ALOLvG6SSoQh692tThK2ksoEO0CK7tPQD5OdMuvjEnN_7qdMuAq199VBzeEYzyLLOdn2m1KK_fSpp5HUjneLQduEpwiuld837_N6kVStitVsucMItn2A0gK4Iyh3w9avs242Yc2YSO2msmzX_5iIDVaLP1qGJl4w0uTOFHmwoUxxZ19o-hmr8dAQhqJaUiB16YTXcRORh3Mzkl5e1aM" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-h3 text-on-surface">Aspirin</h3>
                  <span className="font-h3 text-primary-container">$6.25</span>
                </div>
                <p className="text-body-md text-on-surface-variant mb-4">Low Dose 81mg • 120 Tablets</p>
                <div className="mt-auto">
                  <button className="w-full bg-secondary text-on-secondary font-button py-3 px-4 rounded-[24px] hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-[0_4px_12px_rgba(0,106,106,0.15)] hover:shadow-[0_6px_16px_rgba(0,106,106,0.25)] flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-[0_8px_24px_rgba(0,85,165,0.04)] hover:shadow-[0_12px_32px_rgba(0,85,165,0.08)] transition-shadow duration-300 relative group">
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-error/10 text-error font-label-bold px-3 py-1.5 rounded-full uppercase">Prescription Required</span>
              </div>
              <div className="w-full aspect-square rounded-[16px] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-8 relative">
                <img alt="Naproxen prescription bottle" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl5o5o-Ed4Ybsfwh7lR_PLqIy7Z92I-TBt0B_D-UnBOwe5qPHKyBwtQHXyyCvhiCSsP-y_ZKOlhcliobwykTTbZjOMtILYIcsGz54KhgFB6bhuTaHPBComSkJ4kvYRqxaPWnGspSKnS6zYsgQ-PVSocuA95M1_GH42TUqpqTuYpdEDOOBxt3VU9ZZ2IUmZK6ar7R4TTwE6YiVWl8WEzi5r2YrbL66nuc1Hg-VSUuK-Bu8F_owfmt2LKwbjrFrpQqrXxMClTgG6Oc0" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-h3 text-on-surface">Naproxen</h3>
                  <span className="font-h3 text-primary-container">$18.00</span>
                </div>
                <p className="text-body-md text-on-surface-variant mb-4">500mg • 60 Tablets</p>
                <div className="mt-auto">
                  <button className="w-full bg-primary-container text-on-primary font-button py-3 px-4 rounded-[24px] hover:bg-primary transition-colors shadow-[0_4px_12px_rgba(0,85,165,0.15)] hover:shadow-[0_6px_16px_rgba(0,85,165,0.25)] flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                    Upload Rx to Add
                  </button>
                </div>
              </div>
            </article>
          </div>
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-outline hover:bg-surface-container transition-colors disabled:opacity-50"><span className="material-symbols-outlined">chevron_left</span></button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-container text-on-primary font-label-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container font-label-bold transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container font-label-bold transition-colors">3</button>
              <span className="text-on-surface-variant mx-1">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-outline hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
            </nav>
          </div>
        </main>
      </div>
      <footer className="bg-white dark:bg-slate-900 font-manrope text-xs text-slate-500 full-width border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full mt-auto">
        <div className="text-lg font-bold text-slate-400 mb-4 md:mb-0">PharmSense</div>
        <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
          <a className="text-slate-500 hover:text-blue-600 transition-colors" href="#">Privacy Policy</a>
          <a className="text-slate-500 hover:text-blue-600 transition-colors" href="#">Terms of Service</a>
          <a className="text-slate-500 hover:text-blue-600 transition-colors" href="#">Pharmacist Chat</a>
          <a className="text-slate-500 hover:text-blue-600 transition-colors" href="#">Contact Support</a>
        </nav>
        <div className="text-center md:text-right">
          © 2024 PharmSense Digital Pharmacy. All rights reserved. Licensed Healthcare Provider.
        </div>
      </footer>
    </div>
  )
}
