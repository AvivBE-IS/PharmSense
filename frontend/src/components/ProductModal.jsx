import { useEffect, useState } from "react";
import { getProduct } from "../api/productApi";

function Badge({ children, color = "slate" }) {
  const colors = {
    slate:   "bg-slate-100 text-slate-700 border-slate-200",
    green:   "bg-emerald-100 text-emerald-700 border-emerald-200",
    red:     "bg-red-100 text-red-700 border-red-200",
    blue:    "bg-blue-100 text-blue-700 border-blue-200",
    yellow:  "bg-yellow-100 text-yellow-700 border-yellow-200",
  };
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${colors[color]}`}>
      {children}
    </span>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">{title}</h4>
      {children}
    </div>
  );
}

export default function ProductModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getProduct(productId)
      .then((data) => { if (!cancelled) setProduct(data); })
      .catch(() => { if (!cancelled) setError("Failed to load product details."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [productId]);

  // close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  // close on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100">
          <div>
            {loading || error ? (
              <p className="text-slate-500 text-sm">{error ?? "Loading…"}</p>
            ) : (
              <>
                <h2 className="text-lg font-bold text-slate-800 leading-snug">{product.name_en}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{product.brand} · {product.generic_name}</p>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {loading && (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <p className="text-center text-red-500 text-sm">{error}</p>
          )}

          {product && (
            <>
              {/* Form / Dosage / Active ingredient */}
              <Section title="Product info">
                <div className="flex flex-wrap gap-2">
                  {product.form && <Badge color="blue">{product.form}</Badge>}
                  {product.dosage_strength && <Badge color="blue">{product.dosage_strength}</Badge>}
                  {product.active_ingredient && <Badge color="slate">Active: {product.active_ingredient}</Badge>}
                </div>
              </Section>

              {/* Availability & Price */}
              <Section title="Availability & Price">
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    ₪{typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                  </span>
                  <Badge color={product.in_stock ? "green" : "red"}>
                    {product.in_stock ? "In stock" : "Out of stock"}
                  </Badge>
                  {product.stock_count != null && (
                    <span className="text-xs text-slate-400">{product.stock_count} units · {product.quantity_per_pack} per pack</span>
                  )}
                </div>
              </Section>

              {/* Safety */}
              <Section title="Safety">
                <div className="flex flex-wrap gap-2">
                  {product.prescription_required
                    ? <Badge color="red">Prescription required</Badge>
                    : <Badge color="green">Over the counter</Badge>}
                  {product.pregnancy_safe && <Badge color="green">Pregnancy safe</Badge>}
                  {product.breastfeeding_safe && <Badge color="green">Breastfeeding safe</Badge>}
                  {product.age_min_months != null && (
                    <Badge color="yellow">
                      Age: {product.age_min_months}m{product.age_max_months ? `–${product.age_max_months}m` : "+"}
                    </Badge>
                  )}
                </div>
              </Section>

              {/* Tags */}
              {product.tags?.length > 0 && (
                <Section title="Tags">
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => <Badge key={tag} color="slate">{tag}</Badge>)}
                  </div>
                </Section>
              )}

              {/* How to take */}
              {product.details?.how_to_take && (
                <Section title="How to take">
                  <p className="text-sm text-slate-700 leading-relaxed">{product.details.how_to_take}</p>
                </Section>
              )}

              {/* Side effects */}
              {product.details?.side_effects?.length > 0 && (
                <Section title="Side effects">
                  <div className="flex flex-wrap gap-2">
                    {product.details.side_effects.map((se, i) => (
                      <Badge key={i} color="yellow">{se.name} ({se.frequency})</Badge>
                    ))}
                  </div>
                </Section>
              )}

              {/* Contraindications */}
              {product.details?.contraindications?.length > 0 && (
                <Section title="Contraindications">
                  <ul className="list-disc list-inside space-y-1">
                    {product.details.contraindications.map((c, i) => (
                      <li key={i} className="text-sm text-slate-700">{c}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Interactions */}
              {product.details?.interactions && (
                <Section title="Drug interactions">
                  <p className="text-sm text-slate-700 leading-relaxed">{product.details.interactions}</p>
                </Section>
              )}

              {/* Storage / Duration / Missed dose / Overdose */}
              {[
                ["Storage",          product.details?.storage],
                ["Duration of action", product.details?.duration_of_action],
                ["Missed dose",      product.details?.missed_dose],
                ["Overdose",         product.details?.overdose],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <Section key={label} title={label}>
                    <p className="text-sm text-slate-700 leading-relaxed">{value}</p>
                  </Section>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
