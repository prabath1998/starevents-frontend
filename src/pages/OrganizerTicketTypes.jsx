import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addTicketType } from "../api/organizer";
import Button from "../components/Button";
import Card from "../components/Card";
import { Input } from "../components/Input";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, TicketIcon, TagIcon } from '@heroicons/react/24/outline'; // Importing Heroicons


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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-neutral-700 pb-6">
      <div className="flex items-center gap-4">
        <Link
          to="/organizer"
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-neutral-700 transition-colors duration-200"
          aria-label="Back to organizer dashboard"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1 flex items-center gap-2">
            <TicketIcon className="h-8 w-8 text-indigo-400" />
            Create a New Ticket Type
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">For Event #<span className="font-mono text-neutral-300">{id}</span></p>
        </div>
      </div>
      
      <Link 
        to={`/events/${id}/discounts`} 
        className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-indigo-500 transition-colors duration-200"
      >
        <TagIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Manage Discounts
      </Link>
    </div>

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
