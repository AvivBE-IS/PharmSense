import { useState } from "react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { icon: "medication", label: "Medications", active: true },
  { icon: "pill", label: "Vitamins & Supplements" },
  { icon: "medical_services", label: "Medical Devices" },
  { icon: "thermostat", label: "Health Monitoring" },
  { icon: "vital_signs", label: "First Aid" },
];

const PRODUCTS = [
  {
    id: "ibuprofen-400",
    name: "Ibuprofen",
    description: "400mg • 50 Tablets",
    price: "$8.99",
    type: "otc",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2CLzostZK8wEuqOFQIHZnxBeT-ZONtrk6QdhnaWYunoEdHi-qpXmp7dck04QxAI1flgcZ2Ss_AVSX2iDj0UcZm3yZND5pc7ppf_68OfUtKFU5GHkYdB57waZdNJaR-XxIxdxLT4a7euiKsospgLuTLPHGuJAOfNqohstdXtFqmnpj7XZP2-R_xAcgaCzETUv89l0fZL7EnlToztarxhzjudA7tUMfH_SPMjnHSDpHwzEPH8hRoD_tWP3Jg-TH6DHqyaknMoFYn84",
  },
  {
    id: "acetaminophen-500",
    name: "Acetaminophen",
    description: "Extra Strength 500mg • 100 Caplets",
    price: "$12.50",
    type: "rx",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnkMrG8Oxx_8a366-hc7Plmr-yxBxB0pz3bHPz0g697kYPDs6gCtpmf5MAC4gw7qRuPp1jKi4UOkv0ml4g8vLzTJ-v1bKRKJK_A4c76CdxRdrEhCygIhnnvesrkQ7guyuck0s1bpPoPgmOx7sdhiu-dNJbSdciM4IIhbxdq-TnmdShEeWkpIHKfHtJyFK16Qc2XNyJpd5mKe7K-uWzVzKNq1CGLnylhhrP5e1mIEUgKtEz8nEr7KIWukLBYlrXW1NArXCZNLYtb9c",
  },
  {
    id: "aspirin-81",
    name: "Aspirin",
    description: "Low Dose 81mg • 120 Tablets",
    price: "$6.25",
    type: "otc",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC23sLwBALnJ35KGyb5QrAjESVe-8IcLW4HRLQBTAdPLGTgerByyc3w-hk9ALOLvG6SSoQh692tThK2ksoEO0CK7tPQD5OdMuvjEnN_7qdMuAq199VBzeEYzyLLOdn2m1KK_fSpp5HUjneLQduEpwiuld837_N6kVStitVsucMItn2A0gK4Iyh3w9avs242Yc2YSO2msmzX_5iIDVaLP1qGJl4w0uTOFHmwoUxxZ19o-hmr8dAQhqJaUiB16YTXcRORh3Mzkl5e1aM",
  },
  {
    id: "naproxen-500",
    name: "Naproxen",
    description: "500mg • 60 Tablets",
    price: "$18.00",
    type: "rx",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl5o5o-Ed4Ybsfwh7lR_PLqIy7Z92I-TBt0B_D-UnBOwe5qPHKyBwtQHXyyCvhiCSsP-y_ZKOlhcliobwykTTbZjOMtILYIcsGz54KhgFB6bhuTaHPBComSkJ4kvYRqxaPWnGspSKnS6zYsgQ-PVSocuA95M1_GH42TUqpqTuYpdEDOOBxt3VU9ZZ2IUmZK6ar7R4TTwE6YiVWl8WEzi5r2YrbL66nuc1Hg-VSUuK-Bu8F_owfmt2LKwbjrFrpQqrXxMClTgG6Oc0",
  },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col">
      <div className="flex flex-1 max-w-[1440px] mx-auto w-full relative">
        {/* Sidebar */}
        <aside className="bg-slate-50 h-[calc(100vh-80px)] w-72 border-r border-slate-200 sticky top-20 hidden lg:flex flex-col">
          <div className="p-6 pb-4 border-b border-slate-200">
            <h2 className="font-h3 text-on-surface">Catalog</h2>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Browse by Category
            </p>
          </div>
          <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.label}
                href="#"
                className={`rounded-lg flex items-center gap-3 p-3 transition-all duration-200 ${
                  cat.active
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-600 hover:bg-slate-100 hover:translate-x-1"
                }`}
              >
                <span className="material-symbols-outlined">{cat.icon}</span>
                {cat.label}
              </a>
            ))}
          </nav>
          <div className="p-6 border-t border-slate-200">
            <button className="w-full bg-primary-container text-on-primary font-button py-3 px-4 rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,85,165,0.2)]">
              <span className="material-symbols-outlined">upload_file</span>
              Upload Prescription
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-12 min-w-0">
          {/* Content header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="font-h2 text-on-surface">Pain Relief</h1>
              <p className="text-body-md text-on-surface-variant mt-2">
                Showing {filtered.length} products
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-surface-container rounded-full px-4 py-2 border border-outline-variant w-64">
                <span className="material-symbols-outlined text-outline mr-2">
                  search
                </span>
                <input
                  className="bg-transparent border-none focus:ring-0 text-body-md text-on-surface w-full outline-none placeholder:text-outline"
                  placeholder="Search..."
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <Link key={product.id} to={`/medicine/${product.id}`}>
                <article className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col shadow-[0_8px_24px_rgba(0,85,165,0.04)] hover:shadow-[0_12px_32px_rgba(0,85,165,0.08)] transition-shadow duration-300 relative group cursor-pointer h-full">
                  <div className="absolute top-6 left-6 z-10">
                    {product.type === "otc" ? (
                      <span className="bg-secondary/10 text-secondary font-label-bold px-3 py-1.5 rounded-full uppercase text-[11px]">
                        Over the Counter
                      </span>
                    ) : (
                      <span className="bg-error/10 text-error font-label-bold px-3 py-1.5 rounded-full uppercase text-[11px]">
                        Prescription Required
                      </span>
                    )}
                  </div>
                  <div className="w-full aspect-square rounded-[16px] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-8">
                    <img
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                      src={product.img}
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-h3 text-on-surface">
                        {product.name}
                      </h3>
                      <span className="font-h3 text-primary-container">
                        {product.price}
                      </span>
                    </div>
                    <p className="text-body-md text-on-surface-variant mb-4">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      {product.type === "otc" ? (
                        <button className="w-full bg-secondary text-on-secondary font-button py-3 px-4 rounded-[24px] hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">
                            shopping_cart
                          </span>
                          Add to Cart
                        </button>
                      ) : (
                        <button className="w-full bg-primary-container text-on-primary font-button py-3 px-4 rounded-[24px] hover:bg-primary transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">
                            upload_file
                          </span>
                          Upload Prescription
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-outline hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-container text-on-primary font-label-bold">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container font-label-bold transition-colors">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container font-label-bold transition-colors">
                3
              </button>
              <span className="text-on-surface-variant mx-1">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-outline hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}
