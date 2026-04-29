import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// מאגר המידע לזיהוי מהיר (תואם לשאר חלקי המערכת)
const MEDICATIONS_LIST = [
    { id: 'acetaminophen', name: 'Acetaminophen', info: '500mg • 100 Caplets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnkMrG8Oxx_8a366-hc7Plmr-yxBxB0pz3bHPz0g697kYPDs6gCtpmf5MAC4gw7qRuPp1jKi4UOkv0ml4g8vLzTJ-v1bKRKJK_A4c76CdxRdrEhCygIhnnvesrkQ7guyuck0s1bpPoPgmOx7sdhiu-dNJbSdciM4IIhbxdq-TnmdShEeWkpIHKfHtJyFK16Qc2XNyJpd5mKe7K-uWzVzKNq1CGLnylhhrP5e1mIEUgKtEz8nEr7KIWukLBYlrXW1NArXCZNLYtb9c' },
    { id: 'lisinopril', name: 'Lisinopril', info: '10mg • 30 Tablets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhLqiv-U2MLRf7U7BvdXMaSce_Sse-ZvpxGb1TVxVtrHCdx_BvXW6t9ZEsLAqozrVUQTNPzXG11M0oVi9MMQ-XsN6xexk4w2_GHx2y5VrRj_0TPV_EGDDJ3fREflml3kYACmG0D19DXp0SeDrgUxlZWLNVbjY0dpac_RPDp9z77pQT70yUgHYSFAdSrrIAosYPTKT0XqVbYvhj6K2HlE8tRJyVG0jc2-g1B9xGl746eQ-Apdd2yBNwmqnDDTXC67cK46g2MFEQTJ0' },
    { id: 'aspirin', name: 'Aspirin', info: '81mg • 120 Tablets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC23sLwBALnJ35KGyb5QrAjESVe-8IcLW4HRLQBTAdPLGTgerByyc3w-hk9ALOLvG6SSoQh692tThK2ksoEO0CK7tPQD5OdMuvjEnN_7qdMuAq199VBzeEYzyLLOdn2m1KK_fSpp5HUjneLQduEpwiuld837_N6kVStitVsucMItn2A0gK4Iyh3w9avs242Yc2YSO2msmzX_5iIDVaLP1qGJl4w0uTOFHmwoUxxZ19o-hmr8dAQhqJaUiB16YTXcRORh3Mzkl5e1aM' },
    { id: 'ibuprofen', name: 'Ibuprofen', info: '400mg • 50 Tablets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2CLzostZK8wEuqOFQIHZnxBeT-ZONtrk6QdhnaWYunoEdHi-qpXmp7dck04QxAI1flgcZ2Ss_AVSX2iDj0UcZm3yZND5pc7ppf_68OfUtKFU5GHkYdB57waZdNJaR-XxIxdxLT4a7euiKsospgLuTLPHGuJAOfNqohstdXtFqmnpj7XZP2-R_xAcgaCzETUv89l0fZL7EnlToztarxhzjudA7tUMfH_SPMjnHSDpHwzEPH8hRoD_tWP3Jg-TH6DHqyaknMoFYn84' }
];

const Chat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: 'ai', content: "Hello! I'm your PharmSense AI assistant. Ask me about your medications." }
    ]);
    const [floatingMeds, setFloatingMeds] = useState([]);

    // ניהול מצב הזיהוי הקולי
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    // דגל למניעת שליחה כפולה של הודעת הפתיחה (תיקון ל-Strict Mode)
    const hasSentInitialQ = useRef(false);

    // אתחול מערכת הזיהוי הקולי (Web Speech API)
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');

                setInput(transcript);
            };

            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setInput("");
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    // פונקציית שליחת הודעה
    const handleSendMessage = (text) => {
        const userMessage = typeof text === 'string' ? text : input;
        if (!userMessage.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput("");

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        }

        const found = MEDICATIONS_LIST.filter(med =>
            userMessage.toLowerCase().includes(med.name.toLowerCase())
        );

        if (found.length > 0) {
            setFloatingMeds(found);
        }

        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: found.length > 0
                    ? `I found ${found[0].name} in your inventory. You can view the full details below.`
                    : `I'm looking into "${userMessage}" for you.`
            }]);
        }, 1000);
    };

    // טיפול בהודעה שמגיעה מה-Dashboard (עם הגנה מכפילות)
    useEffect(() => {
        const initialQ = location.state?.initialQuestion;

        if (initialQ && !hasSentInitialQ.current) {
            hasSentInitialQ.current = true; // מסמן ששלחנו כדי שלא יקרה שוב ברינדור כפול
            handleSendMessage(initialQ);

            // מנקה את ה-state של הניווט
            navigate(location.pathname, { replace: true, state: {} });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state, navigate]);

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 font-body-md antialiased relative overflow-hidden">
            {/* אזור ההודעות */}
            <div className="flex-grow overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full pb-40">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 px-6 shadow-sm leading-relaxed border ${msg.role === 'user'
                            ? 'bg-[#0055a5] text-white border-transparent rounded-[24px] rounded-tr-none'
                            : 'bg-white border-slate-100 text-slate-800 rounded-[24px] rounded-tl-none'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            {/* כרטיסיות תרופות מרחפות */}
            {floatingMeds.length > 0 && (
                <div className="absolute bottom-28 left-0 right-0 flex justify-center gap-4 px-6 z-30 animate-in slide-in-from-bottom-8 duration-500">
                    {floatingMeds.map(med => (
                        <div
                            key={med.id}
                            onClick={() => navigate(`/inventory/${med.id}`)}
                            className="bg-white rounded-[28px] border-2 border-[#0055a5]/10 p-4 flex items-center gap-4 shadow-2xl cursor-pointer hover:border-[#0055a5] hover:-translate-y-2 transition-all w-72 bg-white/90 backdrop-blur-md"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 p-2 flex-shrink-0">
                                <img src={med.img} alt={med.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="overflow-hidden text-left">
                                <h4 className="font-bold text-[#111c2d] truncate">{med.name}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{med.info}</p>
                                <span className="text-[10px] text-[#0055a5] font-bold">View Details →</span>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => setFloatingMeds([])} className="bg-white rounded-full w-10 h-10 shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors flex-shrink-0">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>
            )}

            {/* שורת הקלט התחתונה */}
            <div className="p-6 bg-white border-t border-slate-100 relative z-40">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                    className="max-w-4xl mx-auto flex items-center bg-slate-50 rounded-[24px] p-2 border border-slate-200 focus-within:border-[#0055a5] transition-all shadow-inner"
                >
                    <span className="material-symbols-outlined text-[#0055a5] ml-4 flex-shrink-0">temp_preferences_custom</span>

                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 outline-none text-slate-700 font-medium"
                        placeholder={isListening ? "Listening..." : "Type or speak a medication name..."}
                    />

                    {/* כפתור מיקרופון */}
                    <button
                        type="button"
                        onClick={toggleListening}
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all mr-1 ${isListening
                            ? 'bg-red-100 text-red-500 animate-pulse shadow-inner'
                            : 'bg-transparent text-slate-400 hover:bg-slate-200 hover:text-[#0055a5]'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[24px]">mic</span>
                    </button>

                    {/* כפתור שליחה */}
                    <button type="submit" className="flex-shrink-0 bg-[#0055a5] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#003e7b] transition-all shadow-md">
                        <span className="material-symbols-outlined text-[20px] font-bold">send</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;