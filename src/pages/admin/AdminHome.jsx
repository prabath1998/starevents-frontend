"use client"

import { useEffect, useState } from "react"
import { adminOverview } from "../../api/admin"
import Card from "../../components/Card"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import {
  UserIcon,
  UsersIcon,
  CalendarDaysIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  TicketIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline"

export default function AdminHome() {
  const [kpi, setKpi] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminOverview({})
      .then((data) => {
        setKpi(data)
        setLoading(false)
      })
      .catch(() => {
        toast.error("Failed to load dashboard data.")
        setLoading(false)
      })
  }, [])

  const kpiMetrics = kpi
    ? [
        {
          name: "Total Users",
          value: kpi.totalUsers,
          icon: UsersIcon,
          subtext: `+${kpi.newUsersLast30Days || 0} this month`,
          gradient: "from-blue-500 to-cyan-400",
          bgGradient: "from-blue-500/10 to-cyan-400/10",
          iconColor: "text-blue-400",
        },
        {
          name: "Active Users",
          value: kpi.activeUsers,
          icon: UserIcon,
          subtext: `${(kpi.activeUserRate * 100).toFixed(1)}% of total`,
          gradient: "from-emerald-500 to-teal-400",
          bgGradient: "from-emerald-500/10 to-teal-400/10",
          iconColor: "text-emerald-400",
        },
        {
          name: "Total Events",
          value: kpi.totalEvents,
          icon: CalendarDaysIcon,
          subtext: `${kpi.publishedEvents || 0} published`,
          gradient: "from-purple-500 to-pink-400",
          bgGradient: "from-purple-500/10 to-pink-400/10",
          iconColor: "text-purple-400",
        },
        {
          name: "Tickets Sold",
          value: kpi.totalTicketsIssued,
          icon: TicketIcon,
          subtext: `+${kpi.ticketsSoldLast30Days || 0} last month`,
          gradient: "from-orange-500 to-red-400",
          bgGradient: "from-orange-500/10 to-red-400/10",
          iconColor: "text-orange-400",
        },
        {
          name: "Total Revenue",
          value: `Rs.${kpi.revenueCents.toFixed(2)}`,
          icon: CurrencyDollarIcon,
          subtext: `+${kpi.revenueCentsLast30Days ? kpi.revenueCentsLast30Days.toFixed(2) : 0} this month`,
          gradient: "from-green-500 to-emerald-400",
          bgGradient: "from-green-500/10 to-emerald-400/10",
          iconColor: "text-green-400",
        },
        {
          name: "Total Orders",
          value: kpi.totalOrders,
          icon: ShoppingCartIcon,
          subtext: `${kpi.paidOrders || 0} paid`,
          gradient: "from-indigo-500 to-blue-400",
          bgGradient: "from-indigo-500/10 to-blue-400/10",
          iconColor: "text-indigo-400",
        },
      ]
    : []

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 space-y-12">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 animate-pulse">
                <ChartBarIcon className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-300 text-lg">Loading key metrics...</p>
            </div>
          ) : (
            kpiMetrics.map((item, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-white/20 shadow-2xl hover:shadow-3xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex items-start space-x-6">
                  <div
                    className={`flex-shrink-0 p-4 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-grow">
                    <div className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </div>
                    <div
                      className={`mt-2 text-4xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
                    >
                      {item.value}
                    </div>
                    <div className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {item.subtext}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <section>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8 text-center">
            Management & Tools
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/admin/events" className="group">
              <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-2xl transition-all duration-500 hover:scale-105 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                      Manage Events
                    </h3>
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <CalendarDaysIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    View, edit, and publish all events on the platform.
                  </p>
                  <span className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300 font-semibold">
                    Go to Events{" "}
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </Card>
            </Link>

            <Link to="/admin/users" className="group">
              <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-emerald-500/10 to-teal-400/10 border border-emerald-500/20 rounded-2xl transition-all duration-500 hover:scale-105 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-200 transition-colors duration-300">
                      Manage Users
                    </h3>
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <UsersIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    Oversee user accounts, roles, and permissions.
                  </p>
                  <span className="flex items-center text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 font-semibold">
                    Go to Users{" "}
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </Card>
            </Link>

            <Link to="/admin/reports" className="group">
              <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-purple-500/10 to-pink-400/10 border border-purple-500/20 rounded-2xl transition-all duration-500 hover:scale-105 hover:border-purple-400/40 hover:shadow-2xl hover:shadow-purple-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                      Download Reports
                    </h3>
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <ShoppingCartIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    Track and audit all orders placed on the platform.
                  </p>
                  <span className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300 font-semibold">
                    Go to Reports{" "}
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </Card>
            </Link>

            <Link to="/admin/audit-logs" className="group">
              <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-orange-500/10 to-red-400/10 border border-orange-500/20 rounded-2xl transition-all duration-500 hover:scale-105 hover:border-orange-400/40 hover:shadow-2xl hover:shadow-orange-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-200 transition-colors duration-300">
                      Audit Logs
                    </h3>
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <ChartBarIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    Inspect a detailed log of all system activities.
                  </p>
                  <span className="flex items-center text-orange-400 group-hover:text-orange-300 transition-colors duration-300 font-semibold">
                    Go to Logs{" "}
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
