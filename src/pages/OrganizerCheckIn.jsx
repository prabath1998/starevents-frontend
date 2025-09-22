import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { validateTicket, checkInTicket } from "../api/tickets";
import Button from "../components/Button";
import Card from "../components/Card";
import { Input } from "../components/Input";
import { Check, Search, X } from "lucide-react";

const TicketStatusBadge = ({ status }) => {
  const statusColors = {
    Valid: "bg-emerald-600 text-white",
    CheckedIn: "bg-sky-600 text-white",
    Invalid: "bg-red-600 text-white",  
  };

  return (
    <span
      className={`py-1 px-3 rounded-full text-xs font-semibold ${
        statusColors[status] || "bg-gray-500"
      }`}
    >
      {status}
    </span>
  );
};

export default function OrganizerCheckIn() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const doValidate = async () => {
    const v = value.trim();
    if (!v) return;
    setLoading(true);
    try {
      const res = await validateTicket(v);
      setResult(res);     

      if (!res.ok) {
        toast.error(res.message ?? "Invalid ticket");
      } else {
        toast.success(`Ticket #${res.ticketId} · ${res.status}`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Validation failed");
    } finally {
      setLoading(false);
    }
  };

  const doCheckIn = async () => {
    const v = value.trim();
    if (!v) return;
    setLoading(true);
    try {
      const res = await checkInTicket(v);
      setResult(res);
      if (res.ok) {
        toast.success(`Checked in · Ticket #${res.ticketId}`);
        setValue("");
        inputRef.current?.focus();
      } else {
        toast.error(res.message ?? "Unable to check in");
      }
    } catch (e) {
      console.error(e);
      toast.error("Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    doValidate();
  };

  const canCheckIn =
    result?.ok &&
    (result?.status === "Valid" || result?.status === "CheckedIn");

  return (
    <div className="bg-gradient-to-br from-gray-950/75 min-h-screen p-8 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-6 tracking-wide">
          Ticket Check-in 🎟️
        </h1>
        <p className="text-gray-400 mb-8">
          Validate and check in tickets quickly for your event.
        </p>

        <Card className="p-6 mb-6 border-2 border-slate-700/50 rounded-2xl shadow-lg bg-slate-900/60 transition-all duration-300 hover:border-slate-600/70">
          <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                ref={inputRef}
                label="Ticket code or QR payload"
                placeholder="e.g. ABCD-1234-XYZ or TICKET|{id}|{ts}|{hmac}"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={loading}
                autoFocus
              />
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                disabled={loading || !value.trim()}
                className="w-full md:w-auto px-6 py-3"
              >
                {loading ? (
                  <>Validating… </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" /> Validate
                  </>
                )}
              </Button>
            </div>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            Tip: Paste the full QR payload or just the ticket code.
          </p>
        </Card>

        {result && (
          <Card className="p-6 border-2 border-slate-700/50 rounded-2xl shadow-lg bg-slate-900/60">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">Status:</span>
                  <TicketStatusBadge status={result.status} />
                </div>
                <div className="text-sm text-gray-400 font-mono space-x-2">
                  {result.ticketId && (
                    <span className="bg-slate-800 rounded-lg px-2 py-1">
                      Ticket ID: <span className="font-bold">{result.ticketId}</span>
                    </span>
                  )}
                  {result.eventId && (
                    <span className="bg-slate-800 rounded-lg px-2 py-1">
                      Event ID: <span className="font-bold">{result.eventId}</span>
                    </span>
                  )}
                </div>
                {result.message && (
                  <div className="text-sm text-yellow-400 mt-2">
                    {result.message}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 md:ml-auto">
                <Button
                  variant="secondary"
                  disabled={
                    !canCheckIn || result.status === "CheckedIn" || loading
                  }
                  onClick={doCheckIn}
                  className="px-6 py-3"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Check in
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setResult(null);
                    setValue("");
                    inputRef.current?.focus();
                  }}
                  className="px-6 py-3"
                >
                  <X className="h-5 w-5 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}