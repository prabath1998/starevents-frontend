import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addTicketType } from "../api/organizer";
import Button from "../components/Button";
import Card from "../components/Card";
import { Input } from "../components/Input";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function OrganizerTicketTypes() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      priceCents: 0,
      currency: "LKR",
      totalQuantity: 0,
      perOrderLimit: 2,
      salesStart: "",
      salesEnd: "",
    },
  });

  const onSubmit = async (v) => {
    try {
      const payload = {
        ...v,
        priceCents: Number(v.priceCents),
        totalQuantity: Number(v.totalQuantity),
        perOrderLimit: v.perOrderLimit ? Number(v.perOrderLimit) : null,
      };
      await addTicketType(id, payload);
      toast.success("Ticket type created successfully!");
      reset();
    } catch {
      toast.error("Failed to create ticket type. Please check your inputs.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/organizer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
            Create a New Ticket Type
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">For Event #{id}</p>
        </div>
      </div>

      <Link to={`/events/${id}/discounts`} className="btn">
        Manage discounts
      </Link>

      <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 shadow-2xl p-6 sm:p-8">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Information Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200 border-b border-gray-700 pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                label="Ticket Name"
                placeholder="e.g., General Admission, VIP, Early Bird"
                {...register("name", { required: true })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Price (cents)"
                  type="number"
                  placeholder="2500"
                  {...register("priceCents", { required: true, min: 1 })}
                />
                <Input
                  label="Currency"
                  placeholder="LKR"
                  {...register("currency", { required: true })}
                />
              </div>
            </div>
          </div>

          {/* Quantity & Limits Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200 border-b border-gray-700 pb-2">
              Quantity & Limits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Total Quantity"
                type="number"
                placeholder="100"
                {...register("totalQuantity", { required: true, min: 1 })}
              />
              <Input
                label="Per Order Limit"
                type="number"
                placeholder="2"
                {...register("perOrderLimit")}
              />
            </div>
          </div>

          {/* Sales Period Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200 border-b border-gray-700 pb-2">
              Sales Period
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                label="Sales Start"
                type="datetime-local"
                {...register("salesStart", { required: true })}
              />
              <Input
                label="Sales End"
                type="datetime-local"
                {...register("salesEnd", { required: true })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={() => reset()}
              className="px-6 py-3"
            >
              Reset Form
            </Button>
            <Button type="submit" className="px-8 py-3" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Ticket Type"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
