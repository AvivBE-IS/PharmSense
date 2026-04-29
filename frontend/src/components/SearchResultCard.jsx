import { useTranslation } from "react-i18next";

/**
 * SearchResultCard
 *
 * Props (matching ProductOut schema):
 *   name_en             {string}
 *   brand               {string}
 *   dosage_strength     {string}
 *   form                {string}
 *   price               {number}
 *   in_stock            {boolean}
 *   prescription_required {boolean}
 *   pregnancy_safe      {boolean}
 *   onViewDetails       {function=}  — optional click handler
 */
export default function SearchResultCard({
  name_en,
  brand,
  dosage_strength,
  form,
  price,
  in_stock,
  prescription_required,
  pregnancy_safe,
  onViewDetails,
}) {
  const { t } = useTranslation();

  return (
    <article
      className="
        bg-surface-container-lowest
        border border-outline-variant/40
        dark:border-outline-variant/20
        rounded-2xl
        shadow-sm hover:shadow-md
        transition-shadow duration-200
        flex flex-col
        overflow-hidden
      "
    >
      {/* ── Card body ───────────────────────────────────────────── */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        {/* Header row: name + stock pill */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="font-semibold text-base leading-snug text-on-surface truncate">
              {name_en}
            </h3>
            <p className="text-sm text-on-surface-variant truncate">{brand}</p>
          </div>

          {/* Stock indicator */}
          <span
            className={`
              shrink-0 text-xs font-medium px-2.5 py-1 rounded-full
              ${
                in_stock
                  ? "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary"
                  : "bg-error/10 text-error dark:bg-error/20 dark:text-error"
              }
            `}
          >
            {in_stock ? t("card.inStock") : t("card.outOfStock")}
          </span>
        </div>

        {/* Meta row: form + dosage */}
        <div className="flex flex-wrap gap-2">
          {form && (
            <span className="inline-flex items-center gap-1 text-xs bg-surface-container text-on-surface-variant rounded-full px-3 py-1">
              <span className="material-symbols-outlined text-[14px]">
                pill
              </span>
              {form}
            </span>
          )}
          {dosage_strength && (
            <span className="inline-flex items-center gap-1 text-xs bg-surface-container text-on-surface-variant rounded-full px-3 py-1">
              <span className="material-symbols-outlined text-[14px]">
                straighten
              </span>
              {dosage_strength}
            </span>
          )}
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-2">
          {prescription_required && (
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-full px-2.5 py-1">
              <span className="material-symbols-outlined text-[14px]">
                policy
              </span>
              {t("card.prescriptionRequired")}
            </span>
          )}
          {pregnancy_safe && (
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 rounded-full px-2.5 py-1">
              <span className="material-symbols-outlined text-[14px]">
                favorite
              </span>
              {t("card.pregnancySafe")}
            </span>
          )}
        </div>
      </div>

      {/* ── Card footer ─────────────────────────────────────────── */}
      <div
        className="
        flex items-center justify-between gap-3
        px-5 py-3
        border-t border-outline-variant/30
        bg-surface-container-low/50
      "
      >
        {/* Price */}
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] text-on-surface-variant uppercase tracking-wide">
            {t("card.price")}
          </span>
          <span className="text-lg font-bold text-primary">
            ₪{typeof price === "number" ? price.toFixed(2) : price}
          </span>
        </div>

        {/* View Details button */}
        <button
          type="button"
          onClick={onViewDetails}
          className="
            inline-flex items-center gap-1.5
            bg-primary text-on-primary
            text-sm font-medium
            px-4 py-2 rounded-xl
            hover:opacity-90 active:scale-95
            transition-all duration-150
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
          "
        >
          {t("card.viewDetails")}
          <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </button>
      </div>
    </article>
  );
}
