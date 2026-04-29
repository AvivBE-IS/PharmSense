import React from 'react';
import { useParams, Link } from 'react-router-dom';

// מאגר הנתונים המעודכן עם כל השדות שביקשת
const medicationsData = {
    lisinopril: {
        name_en: "Lisinopril",
        generic_name: "Prinivil®, Zestril®",
        active_ingredient: "Lisinopril Anhydrous",
        brand: "PharmSense Clinical",
        form: "Tablet",
        dosage_strength: "10 mg",
        quantity_per_pack: "30 Tablets",
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhLqiv-U2MLRf7U7BvdXMaSce_Sse-ZvpxGb1TVxVtrHCdx_BvXW6t9ZEsLAqozrVUQTNPzXG11M0oVi9MMQ-XsN6xexk4w2_GHx2y5VrRj_0TPV_EGDDJ3fREflml3kYACmG0D19DXp0SeDrgUxlZWLNVbjY0dpac_RPDp9z77pQT70yUgHYSFAdSrrIAosYPTKT0XqVbYvhj6K2HlE8tRJyVG0jc2-g1B9xGl746eQ-Apdd2yBNwmqnDDTXC67cK46g2MFEQTJ0",
        prescription_required: true,
        age_min_months: 72,
        age_max_months: 1200,
        pregnancy_safe: false,
        breastfeeding_safe: true,
        tags: ["Hypertension", "Heart Health"],
        in_stock: true,
        stock_count: 45,
        price: "$12.50",
        details: "Used to treat high blood pressure and heart failure.",
        how_to_take: "Take once daily with water.",
        side_effects: ["Dizziness", "Cough"],
        storage: "Store at room temperature.",
        missed_dose: "Take as soon as remembered, but don't double dose.",
        overdose: "Seek immediate medical help.",
        duration_of_action: "24 Hours",
        contraindications: "History of angioedema.",
        interactions: "Diuretics, NSAIDs.",
        is_active: true
    },
    // הוספת Acetaminophen למאגר
    acetaminophen: {
        name_en: "Acetaminophen",
        generic_name: "Tylenol®, Paracetamol",
        active_ingredient: "Acetaminophen",
        brand: "PharmSense Basic",
        form: "Caplet",
        dosage_strength: "500 mg",
        quantity_per_pack: "100 Caplets",
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnkMrG8Oxx_8a366-hc7Plmr-yxBxB0pz3bHPz0g697kYPDs6gCtpmf5MAC4gw7qRuPp1jKi4UOkv0ml4g8vLzTJ-v1bKRKJK_A4c76CdxRdrEhCygIhnnvesrkQ7guyuck0s1bpPoPgmOx7sdhiu-dNJbSdciM4IIhbxdq-TnmdShEeWkpIHKfHtJyFK16Qc2XNyJpd5mKe7K-uWzVzKNq1CGLnylhhrP5e1mIEUgKtEz8nEr7KIWukLBYlrXW1NArXCZNLYtb9c",
        prescription_required: false,
        age_min_months: 24,
        age_max_months: 1200,
        pregnancy_safe: true,
        breastfeeding_safe: true,
        tags: ["Pain Relief", "Fever Reducer"],
        in_stock: true,
        stock_count: 120,
        price: "$15.99",
        details: "Pain reliever and fever reducer used for headaches and muscle aches.",
        how_to_take: "Take every 4-6 hours as needed. Do not exceed 4000mg per day.",
        side_effects: ["Nausea", "Upper stomach pain", "Loss of appetite"],
        storage: "Store in a cool, dry place.",
        missed_dose: "Since it's taken as needed, missed doses are not an issue.",
        overdose: "Severe liver damage can occur. Call poison control immediately.",
        duration_of_action: "4-6 Hours",
        contraindications: "Severe liver disease.",
        interactions: "Alcohol, Warfarin, other cold/flu meds.",
        is_active: true
    }
};

const MedicationDetails = () => {
    const { id } = useParams();

    // המרת ה-ID לאותיות קטנות כדי למנוע שגיאות הקלדה
    const normalizedId = id ? id.toLowerCase() : "";
    const med = medicationsData[normalizedId];

    if (!med) {
        return (
            <div className="p-20 text-center">
                <h2 className="text-2xl font-bold text-red-600">Medication Not Found</h2>
                <p className="text-slate-500 mt-2">The ID "{id}" was not found in our data.</p>
                <Link to="/inventory" className="text-[#0055a5] underline mt-4 block">Back to Inventory</Link>
            </div>
        );
    }

    return (
        <main className="mt-24 mb-12 container mx-auto px-6 max-w-[1280px] font-body-md">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase mb-8">
                <Link to="/">Home</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <Link to="/inventory">Inventory</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-[#0055a5]">{med.name_en}</span>
            </nav>

            {/* פריסת המידע (Bento Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* עמודה ראשית - פרטים טכניים */}
                <div className="lg:col-span-8 space-y-8">

                    {/* כרטיסייה 1: מידע בסיסי */}
                    <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-40 h-40 bg-slate-50 rounded-3xl p-4 flex-shrink-0">
                                <img src={med.image_url} alt={med.name_en} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-4xl font-black text-[#003e7b]">{med.name_en}</h1>
                                        <p className="text-slate-500 mt-1">Generic: <span className="font-semibold">{med.generic_name}</span></p>
                                        <div className="flex gap-2 mt-3">
                                            {med.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-blue-50 text-[#0055a5] text-[10px] font-bold rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-xs font-bold ${med.in_stock ? 'bg-teal-50 text-teal-700' : 'bg-red-50 text-red-700'}`}>
                                        {med.in_stock ? `IN STOCK (${med.stock_count})` : 'OUT OF STOCK'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-6 bg-slate-50 rounded-2xl">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Strength</span>
                                        <span className="font-bold">{med.dosage_strength}</span>
                                    </div>
                                    <div className="border-l border-slate-200 pl-4">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Pack</span>
                                        <span className="font-bold">{med.quantity_per_pack}</span>
                                    </div>
                                    <div className="border-l border-slate-200 pl-4">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Price</span>
                                        <span className="font-bold text-[#0055a5]">{med.price}</span>
                                    </div>
                                    <div className="border-l border-slate-200 pl-4">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Req. Rx</span>
                                        <span className="font-bold">{med.prescription_required ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* כרטיסייה 2: אופן השימוש ופרטים נוספים */}
                    <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#0055a5]">description</span>
                                Clinical Details
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">{med.details}</p>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <span className="text-[10px] font-bold text-slate-400 block mb-1">ACTIVE INGREDIENT</span>
                                <span className="font-bold text-[#003e7b]">{med.active_ingredient}</span>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl">
                            <h3 className="font-bold mb-4">How to Take</h3>
                            <p className="text-sm text-slate-600">{med.how_to_take}</p>
                            <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                                <div className="text-xs font-bold flex justify-between">
                                    <span>Duration:</span>
                                    <span className="text-[#0055a5]">{med.duration_of_action}</span>
                                </div>
                                <div className="text-xs font-bold flex justify-between">
                                    <span>Storage:</span>
                                    <span className="text-[#0055a5]">{med.storage}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* עמודה ימנית - בטיחות ואזהרות */}
                <div className="lg:col-span-4 space-y-8">

                    <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold">Safety Profile</h3>
                        <div className="space-y-4">
                            <div className={`p-4 rounded-2xl flex justify-between items-center ${med.pregnancy_safe ? 'bg-teal-50 text-teal-800' : 'bg-red-50 text-red-800'}`}>
                                <span className="font-bold">Pregnancy Safe</span>
                                <span className="material-symbols-outlined">{med.pregnancy_safe ? 'check_circle' : 'cancel'}</span>
                            </div>
                            <div className={`p-4 rounded-2xl flex justify-between items-center ${med.breastfeeding_safe ? 'bg-teal-50 text-teal-800' : 'bg-red-50 text-red-800'}`}>
                                <span className="font-bold">Breastfeeding Safe</span>
                                <span className="material-symbols-outlined">{med.breastfeeding_safe ? 'check_circle' : 'cancel'}</span>
                            </div>
                                                        <div className="p-4 border border-slate-100 rounded-2xl">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Recommended Age</span>
                                                            <span className="font-bold">{med.age_min_months} - {med.age_max_months} months</span>
                                                        </div>
                                                    </div>
                                                </section>
                            
                                                <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                                                    <h3 className="text-xl font-bold mb-4">Side Effects</h3>
                                                    <ul className="space-y-2">
                                                        {med.side_effects.map(effect => (
                                                            <li key={effect} className="text-sm text-slate-600 flex gap-2">
                                                                <span className="material-symbols-outlined text-[16px] text-red-500">warning</span>
                                                                {effect}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>
                            
                                                <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                                                    <h3 className="text-xl font-bold mb-4">Important Information</h3>
                                                    <div className="space-y-3 text-sm">
                                                        <div>
                                                            <span className="font-bold text-slate-700">Contraindications:</span>
                                                            <p className="text-slate-600">{med.contraindications}</p>
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-slate-700">Drug Interactions:</span>
                                                            <p className="text-slate-600">{med.interactions}</p>
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-slate-700">Missed Dose:</span>
                                                            <p className="text-slate-600">{med.missed_dose}</p>
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-slate-700">Overdose:</span>
                                                            <p className="text-slate-600">{med.overdose}</p>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </main>
                                );
                            };
                            
                            export default MedicationDetails;