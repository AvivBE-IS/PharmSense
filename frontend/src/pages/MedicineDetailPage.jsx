import { useParams, Link } from "react-router-dom";

const MEDICINE_DATA = {
  "ibuprofen-400": {
    name: "Ibuprofen 400mg",
    brand: "Advil • PharmSense Labs",
    price: "$8.99",
    unit: "30 tablets",
    status: "In Stock",
    requiresPrescription: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxVmID5UWEjMlcjvVWXg7OTJuUdjTuNxS9HJu9g3rmXTBlQcGZI4BBYoMcHYviaD_sFUHIYrQsdlMeLp-b-TjmethO9VYVqPpYL1Wz-61bMJ3B7JPr17TMrEu9-dbNpB0eqcHTK3I-moeb1WRc-wlpO1D4dgzOtb34Je21H8J-e55xEyKAXgGzkeoB-y-cmNRpJJqZjgmCLGUtZADQ7njToJKqFWnOL3BkhuVy-MWBGuIH1I8UftnWy1i1WVHuqBydDBrQ0YpYytE",
    route: "Oral",
    onset: "30-60 mins",
    duration: "4-6 hours",
    storage: "20-25°C",
    activeIngredient: "Ibuprofen (NSAID) - 400mg",
    symptoms: ["Headache", "Fever", "Muscle Pain", "Inflammation"],
    dosage: [
      {
        icon: "check_circle",
        title: "How to take",
        text: "Take with food or milk to prevent stomach upset. Swallow the tablet whole with a full glass of water. Do not crush, chew, or break the tablet.",
      },
      {
        icon: "warning",
        title: "Maximum dose",
        text: "Do not exceed 3,200 mg per day for adults unless directed by a physician. The lowest effective dose should be used for the shortest duration possible.",
      },
      {
        icon: "event_busy",
        title: "Missed dose",
        text: "If you miss a dose, take it as soon as you remember. If it is near the time of the next dose, skip the missed dose. Do not double the dose to catch up.",
      },
    ],
    contraindications: [
      {
        label: "Stomach Bleeding",
        text: "May cause severe stomach bleeding. Risk is higher in patients over 60, those with stomach ulcers, or taking blood thinners.",
      },
      {
        label: "Kidney Issues",
        text: "Prolonged use may result in renal papillary necrosis and other renal injury.",
      },
      {
        label: null,
        text: "Do not use right before or after heart bypass surgery (CABG).",
      },
    ],
  },
};

const DEFAULT_MEDICINE = {
  name: "Medicine Detail",
  brand: "PharmSense",
  price: "—",
  unit: "—",
  status: "Unknown",
  requiresPrescription: false,
  img: "",
  route: "—",
  onset: "—",
  duration: "—",
  storage: "—",
  activeIngredient: "—",
  symptoms: [],
  dosage: [],
  contraindications: [],
};

const NAV_LINKS = [
  { icon: "info", label: "Overview", active: true },
  { icon: "biotech", label: "Clinical Pharmacology" },
  { icon: "medication", label: "Dosage & Administration" },
  { icon: "swap_horiz", label: "Drug Interactions" },
  { icon: "warning", label: "Adverse Reactions" },
  { icon: "groups", label: "Patient Counseling" },
];

export default function MedicineDetailPage() {
  const { id } = useParams();
  const med = MEDICINE_DATA[id] || DEFAULT_MEDICINE;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
      <div className="flex flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 gap-8">
        {/* Sidebar reference nav */}
        <aside className="hidden lg:flex bg-slate-50 font-manrope text-[13px] font-medium h-[calc(100vh-8rem)] sticky top-24 w-72 rounded-lg border border-slate-200 shadow-sm flex-col py-6 overflow-y-auto">
          <div className="px-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-fixed flex items-center justify-center rounded-lg text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  medical_information
                </span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 leading-tight">
                  Reference Library
                </h2>
                <p className="text-xs text-slate-500">V2.4.0-Clinical</p>
              </div>
            </div>
          </div>
          <nav className="flex-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                className={`cursor-pointer flex items-center gap-3 px-4 py-3 mb-1 mx-2 rounded-md hover:translate-x-1 transition-all duration-200 ${
                  link.active
                    ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700 rounded-l-none rounded-r-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {link.icon}
                </span>
                {link.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col gap-10 pb-20">
          {/* Hero / Product Header */}
          <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 shadow-[0_20px_20px_rgba(0,85,165,0.04)] p-8 flex flex-col md:flex-row gap-10 items-start">
            {med.img && (
              <div className="w-full md:w-1/3 aspect-square rounded-[24px] bg-surface-container overflow-hidden flex items-center justify-center p-6 border border-outline-variant/20">
                <img
                  alt={med.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                  src={med.img}
                />
              </div>
            )}
            <div className="flex-1 flex flex-col gap-6 w-full">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-label-bold text-label-bold rounded-full">
                    {med.status}
                  </span>
                  {med.requiresPrescription && (
                    <span className="px-3 py-1 bg-surface-variant text-on-surface-variant font-label-bold text-label-bold rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        prescriptions
                      </span>
                      Prescription Required
                    </span>
                  )}
                </div>
                <h1 className="font-h1 text-h1 text-on-surface mb-2">
                  {med.name}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  {med.brand}
                </p>
              </div>
              <div className="flex items-end gap-4">
                <span className="font-h2 text-h2 text-primary">
                  {med.price}
                </span>
                <span className="text-body-sm text-on-surface-variant pb-1">
                  / {med.unit}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-6 border-t border-outline-variant/30">
                <button className="bg-primary hover:bg-primary/90 text-on-primary font-button text-button px-8 py-4 rounded-[24px] transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none shadow-md active:translate-y-[1px]">
                  <span className="material-symbols-outlined">description</span>
                  Request Prescription
                </button>
                <button className="bg-secondary hover:bg-secondary/90 text-on-secondary font-button text-button px-8 py-4 rounded-[24px] transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none active:translate-y-[1px]">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Clinical Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "pill", label: "Route", value: med.route },
              { icon: "timer", label: "Onset", value: med.onset },
              { icon: "schedule", label: "Duration", value: med.duration },
              {
                icon: "device_thermostat",
                label: "Storage",
                value: med.storage,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-surface-container-lowest p-6 rounded-[24px] border border-outline-variant/30 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <p className="text-label-bold font-label-bold text-on-surface-variant mb-1 uppercase">
                    {item.label}
                  </p>
                  <p className="font-h3 text-[18px] text-on-surface">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Content split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Dosage & Safety */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-8">
                <h3 className="font-h3 text-h3 text-on-surface mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    medication
                  </span>
                  Dosage &amp; Administration
                </h3>
                <div className="space-y-6">
                  {med.dosage.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant shrink-0">
                        <span className="material-symbols-outlined text-[18px]">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-button text-button text-on-surface mb-2">
                          {item.title}
                        </h4>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contraindications */}
              {med.contraindications.length > 0 && (
                <div className="bg-[#FFF4F2] border-l-4 border-error rounded-[16px] p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span
                      className="material-symbols-outlined text-error text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      error
                    </span>
                    <div>
                      <h3 className="font-h3 text-[20px] text-error mb-2">
                        Contraindications &amp; Warnings
                      </h3>
                      <p className="font-body-md text-on-surface-variant mb-4">
                        This medication contains NSAIDs which may cause severe
                        risks if not monitored.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 font-body-md text-on-surface-variant">
                        {med.contraindications.map((c, i) => (
                          <li key={i}>
                            {c.label && (
                              <strong className="text-on-surface">
                                {c.label}:{" "}
                              </strong>
                            )}
                            {c.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Classification sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 p-6">
                <h3 className="font-button text-[18px] text-on-surface mb-4 border-b border-outline-variant/30 pb-3">
                  Classification &amp; Ingredients
                </h3>
                <div className="mb-5">
                  <p className="text-label-bold font-label-bold text-on-surface-variant mb-2 uppercase">
                    Active Ingredients
                  </p>
                  <div className="bg-surface-variant rounded-lg p-3 text-on-surface font-body-md">
                    {med.activeIngredient}
                  </div>
                </div>
                {med.symptoms.length > 0 && (
                  <div>
                    <p className="text-label-bold font-label-bold text-on-surface-variant mb-3 uppercase">
                      Symptoms Treated
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {med.symptoms.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1.5 bg-primary-fixed text-on-primary-fixed-variant text-[13px] font-medium rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/catalog"
                className="flex items-center gap-2 text-primary-container hover:underline text-sm font-medium"
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_back
                </span>
                Back to Catalog
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
