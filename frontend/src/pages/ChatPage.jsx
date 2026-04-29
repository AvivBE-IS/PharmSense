import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api/chatApi";

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mr-2 mt-1 shadow">
          AI
        </div>
      )}

      <div className={`max-w-[72%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
          }`}
        >
          {message.content}
        </div>
        <span className="text-[10px] text-slate-400 mt-1 px-1">{message.timestamp}</span>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center ml-2 mt-1 shadow">
          You
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mr-2 mt-1 shadow flex-shrink-0">
        AI
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const WELCOME_MESSAGE = {
  id: 0,
  role: "assistant",
  content: "Hello! I'm your PharmSense AI assistant.\n\nType a medication name and I'll find it for you.",
  timestamp: now(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { id: Date.now(), role: "user", content: text, timestamp: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(text);
      const results = response.results ?? [];

      const content =
        results.length > 0
          ? `Found ${results.length} medication(s):\n${results
              .map((p) => `• ${p.name_en} ${p.dosage_strength} (${p.brand})`)
              .join("\n")}`
          : "No medications found for your search.";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content, timestamp: now() },
      ]);
    } catch {
      setError("Failed to reach the assistant. Please try again.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
        <div>
          <h1 className="text-base font-semibold text-slate-800 leading-none">PharmSense AI Assistant</h1>
          <p className="text-xs text-slate-400 mt-0.5">Search medications by name</p>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          {error && (
            <div className="text-center text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="flex-shrink-0 bg-white border-t border-slate-200 px-4 md:px-8 py-4">
        <div className="max-w-3xl mx-auto flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type a medication name…"
            disabled={isLoading}
            className="flex-1 resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed max-h-36 overflow-y-auto leading-relaxed"
            style={{ height: "46px" }}
            onInput={(e) => {
              e.target.style.height = "46px";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 144)}px`;
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 h-[46px] px-5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoading ? "…" : "Send"}
          </button>
        </div>
        <p className="max-w-3xl mx-auto text-[11px] text-slate-400 mt-2 pl-1">
          Press <kbd className="px-1 py-0.5 rounded bg-slate-100 border border-slate-300 text-[10px]">Enter</kbd> to send ·{" "}
          <kbd className="px-1 py-0.5 rounded bg-slate-100 border border-slate-300 text-[10px]">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}