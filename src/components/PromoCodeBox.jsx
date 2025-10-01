import { useState } from "react";
import toast from "react-hot-toast";
import { applyDiscount, removeDiscount } from "../api/discounts";

export default function PromoCodeBox({ orderId, onPriceChange, disabled }) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null);
  const [loading, setLoading] = useState(false);

  const onApply = async () => {
    if (!code) return;
    setLoading(true);
    try {
      const res = await applyDiscount(orderId, code); 
    
      if (res?.discountCents > 0) {
        setApplied(code.trim().toUpperCase());
        onPriceChange?.(res);
        toast.success("Discount applied");
      } else {
        toast.error("Promo code is not applicable to this order.");
      }
    } catch (e) {
      const msg = e?.response?.data ?? "Invalid promo code";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onRemove = async () => {
    setLoading(true);
    try {
      const res = await removeDiscount(orderId);
      setApplied(null);
      setCode("");
      onPriceChange?.(res);
      toast.success("Discount removed");
    } catch {
      toast.error("Could not remove discount");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={applied ? applied : "Enter promo code"}
          disabled={!!applied || !!disabled || loading}
          className="flex-1 bg-neutral-800 px-3 py-2 rounded"
        />
        {!applied ? (
          <button
            onClick={onApply}
            disabled={!code || disabled || loading}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading ? "Applying…" : "Apply"}
          </button>
        ) : (
          <button
            onClick={onRemove}
            disabled={disabled || loading}
            className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50"
          >
            {loading ? "Removing…" : "Remove"}
          </button>
        )}
      </div>
      {applied && (
        <p className="text-sm text-green-400">
          Applied: <span className="font-mono">{applied}</span>
        </p>
      )}
    </div>
  );
}
