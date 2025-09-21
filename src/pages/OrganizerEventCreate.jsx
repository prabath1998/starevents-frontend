import { useForm } from "react-hook-form";
import { createEvent } from "../api/organizer";
import Button from "../components/Button";
import Card from "../components/Card";
import { Input, Textarea } from "../components/Input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listCategories } from "../api/events";

export default function OrganizerEventCreate() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await listCategories();
        setCategories(data);
      } catch {
        toast.error("Failed to load categories");
      }
    })();
  }, []);

  const toggleCat = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const onSubmit = async (v) => {
    try {
      const payload = {
        title: v.title,
        venueName: v.venueName,
        description: v.description || null,
        locationCity: v.locationCity || null,
        locationAddress: v.locationAddress || null,
        startTime: new Date(v.startTime).toISOString(),
        endTime: new Date(v.endTime).toISOString(),
        categoryIds: selected, 
      };
      const res = await createEvent(payload);
      toast.success("Event created successfully!");
      navigate(`/organizer/${res.id}/ticket-types`);
    } catch {
      toast.error("Failed to create event. Please check your inputs.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center">
          Create a New Event
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Fill out the details below to create your event.
        </p>
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Event Title"
              {...register("title", { required: true })}
              placeholder="e.g., Summer Music Festival"
            />
            <Input
              label="Venue Name"
              {...register("venueName", { required: true })}
              placeholder="e.g., Grand Exhibition Hall"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              {...register("locationCity")}
              placeholder="e.g., New York City"
            />
            <Input
              label="Address"
              {...register("locationAddress")}
              placeholder="e.g., 123 Main Street"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Time (UTC)"
              type="datetime-local"
              {...register("startTime", { required: true })}
            />
            <Input
              label="End Time (UTC)"
              type="datetime-local"
              {...register("endTime", { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Categories (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => toggleCat(c.id)}
                  className={`px-3 py-1 rounded-full border transition
                    ${
                      selected.includes(c.id)
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                    }`}
                >
                  {c.name}
                </button>
              ))}
              {categories.length === 0 && (
                <span className="text-gray-400 text-sm">
                  No categories available
                </span>
              )}
            </div>
          </div>
          <Textarea
            label="Description"
            rows={6}
            {...register("description")}
            placeholder="Provide a detailed description of your event..."
          />
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
