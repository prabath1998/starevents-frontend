import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ShoppingBagIcon,
  TagIcon,
  CreditCardIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Card from "../components/Card";
import Button from "../components/Button";
import PromoCodeBox from "../components/PromoCodeBox";
import { initiatePayment, getOrderSummary } from "../api/orders";

const money = (cents, currency = "LKR") =>
  `${currency} ${(Number(cents) || 0).toFixed(2)}`;

export default function Checkout() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    subtotalCents: 0,
    discountCents: 0,
    totalCents: 0,
    currency: "LKR",
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!orderId) return;
      try {
        const res = await getOrderSummary(orderId);

        const s = res?.data ?? res ?? {};
        const normalized = {
          subtotalCents: Number(s.subtotalCents ?? 0),
          discountCents: Number(s.discountCents ?? 0),
          totalCents: Number(s.totalCents ?? 0),
          currency: s.currency ?? "LKR",
        };
        if (alive) setSummary(normalized);
      } catch (e) {
        console.error("getOrderSummary failed", e);
        toast.error("Couldn’t load order summary");
      }
    })();
    return () => {
      alive = false;
    };
  }, [orderId]);

  const handlePriceChange = (res) => {
    setSummary((s) => ({
      ...s,
      subtotalCents: Number(res.subtotalCents ?? s.subtotalCents),
      discountCents: Number(res.discountCents ?? s.discountCents),
      totalCents: Number(res.totalCents ?? s.totalCents),
    }));
  };

  const pay = async () => {
    if (!orderId) return toast.error("Missing order id");
    setLoading(true);
    try {
      const res = await initiatePayment(orderId);
      if (res.redirectUrl) {
        window.location.href = res.redirectUrl;
        return;
      }
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data ?? "Payment init failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <Card className="max-w-xl w-full bg-neutral-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-neutral-800">
       
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-indigo-500 rounded-full">
            <ShoppingBagIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-50 tracking-tight">Checkout</h2>
        </div>
       
        <div className="space-y-6">
          <div className="p-4 bg-neutral-800 rounded-xl">
            <p className="text-gray-400 text-sm font-mono">
              Order ID: <span className="text-neutral-300">{orderId ?? "—"}</span>
            </p>
          </div>

          <div className="space-y-4 text-sm font-medium">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Subtotal</span>
              <span className="text-neutral-50 font-semibold">{money(summary.subtotalCents)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-neutral-400">
                <TagIcon className="w-4 h-4" />
                <span>Discount</span>
              </div>
              <span className="text-green-400 font-semibold">
                -{money(summary.discountCents, summary.currency)}
              </span>
            </div>
            
            <div className="border-t border-neutral-700 pt-4 mt-4" />
            
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-neutral-100">Total</span>
              <span className="text-indigo-400">
                {money(summary.totalCents, summary.currency)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <PromoCodeBox orderId={orderId} onPriceChange={handlePriceChange} />
          
          <Button
            onClick={pay}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 transform hover:scale-105"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Redirecting…</span>
              </>
            ) : (
              <>
                <CreditCardIcon className="w-5 h-5" />
                <span>Pay with Stripe</span>
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}