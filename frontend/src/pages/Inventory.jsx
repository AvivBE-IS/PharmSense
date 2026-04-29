import { Link } from 'react-router-dom';

const Inventory = () => {
    return (
        <main className="flex-1 p-6 lg:p-12 min-w-0 max-w-[1440px] mx-auto w-full">
            {/* כותרת הדף */}
            <div className="mb-8">
                <h1 className="text-[32px] font-bold text-on-surface tracking-tight">PharmSense Inventory</h1>
                <div className="h-1 w-12 bg-[#0055A5] mt-2 rounded-full" />
            </div>

            {/* הגריד שמכיל את הכרטיסיות */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* כרטיסיית Ibuprofen הקיימת */}
                <Link to="/inventory/ibuprofen" className="group">
                    <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-all">
                        <div className="w-full aspect-square rounded-[16px] bg-slate-50 mb-6 flex items-center justify-center p-8">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2CLzostZK8wEuqOFQIHZnxBeT-ZONtrk6QdhnaWYunoEdHi-qpXmp7dck04QxAI1flgcZ2Ss_AVSX2iDj0UcZm3yZND5pc7ppf_68OfUtKFU5GHkYdB57waZdNJaR-XxIxdxLT4a7euiKsospgLuTLPHGuJAOfNqohstdXtFqmnpj7XZP2-R_xAcgaCzETUv89l0fZL7EnlToztarxhzjudA7tUMfH_SPMjnHSDpHwzEPH8hRoD_tWP3Jg-TH6DHqyaknMoFYn84" alt="Ibuprofen" className="object-contain" />
                        </div>
                        <h3 className="text-xl font-bold">Ibuprofen</h3>
                        <p className="text-slate-500">400mg • 50 Tablets</p>
                    </article>
                </Link>

                {/* הוספת כרטיסייה חדשה: Acetaminophen */}
                <Link to="/inventory/acetaminophen" className="group">
                    <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-all">
                        <div className="absolute top-6 left-6 z-10">
                            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">
                                Prescription Required
                            </span>
                        </div>
                        <div className="w-full aspect-square rounded-[16px] bg-slate-50 mb-6 flex items-center justify-center p-8">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnkMrG8Oxx_8a366-hc7Plmr-yxBxB0pz3bHPz0g697kYPDs6gCtpmf5MAC4gw7qRuPp1jKi4UOkv0ml4g8vLzTJ-v1bKRKJK_A4c76CdxRdrEhCygIhnnvesrkQ7guyuck0s1bpPoPgmOx7sdhiu-dNJbSdciM4IIhbxdq-TnmdShEeWkpIHKfHtJyFK16Qc2XNyJpd5mKe7K-uWzVzKNq1CGLnylhhrP5e1mIEUgKtEz8nEr7KIWukLBYlrXW1NArXCZNLYtb9c" alt="Acetaminophen" className="object-contain" />
                        </div>
                        <h3 className="text-xl font-bold">Acetaminophen</h3>
                        <p className="text-slate-500">500mg • 100 Caplets</p>
                    </article>
                </Link>

                {/* הוספת כרטיסייה חדשה: Aspirin */}
                <Link to="/inventory/aspirin" className="group">
                    <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-all">
                        <div className="w-full aspect-square rounded-[16px] bg-slate-50 mb-6 flex items-center justify-center p-8">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC23sLwBALnJ35KGyb5QrAjESVe-8IcLW4HRLQBTAdPLGTgerByyc3w-hk9ALOLvG6SSoQh692tThK2ksoEO0CK7tPQD5OdMuvjEnN_7qdMuAq199VBzeEYzyLLOdn2m1KK_fSpp5HUjneLQduEpwiuld837_N6kVStitVsucMItn2A0gK4Iyh3w9avs242Yc2YSO2msmzX_5iIDVaLP1qGJl4w0uTOFHmwoUxxZ19o-hmr8dAQhqJaUiB16YTXcRORh3Mzkl5e1aM" alt="Aspirin" className="object-contain" />
                        </div>
                        <h3 className="text-xl font-bold">Aspirin</h3>
                        <p className="text-slate-500">81mg • 120 Tablets</p>
                    </article>
                </Link>

            </div>
        </main>
    );
};

export default Inventory; 