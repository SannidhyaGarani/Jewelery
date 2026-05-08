import React from "react";
import { ShoppingBag, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { statusBadgeClasses } from "./AdminUtils";

const OrdersTable = ({ orders }) => (
  <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full">
    <div className="px-6 py-6 sm:px-8 border-b border-slate-100 bg-slate-50/30">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#811331]" />
            Recent Orders
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Latest customer transactions
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>
    </div>

    {/* Table View - Desktop */}
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] border-b border-slate-100 bg-slate-50/50">
            <th className="px-8 py-5">Order ID</th>
            <th className="px-6 py-5">Customer</th>
            <th className="px-6 py-5">Amount</th>
            <th className="px-8 py-5 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {orders.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
              <td className="px-8 py-5">
                <span className="text-sm font-bold text-slate-900">#{row.id}</span>
              </td>
              <td className="px-6 py-5">
                <p className="text-sm font-semibold text-slate-700">{row.customer}</p>
              </td>
              <td className="px-6 py-5">
                <p className="text-sm font-bold text-slate-900">₹{Number(row.total || 0).toLocaleString()}</p>
              </td>
              <td className="px-8 py-5 text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadgeClasses(row.status)}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={4} className="px-8 py-12 text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag size={24} className="text-slate-300" />
                </div>
                <p className="text-xs font-medium text-slate-400">No recent orders found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Card View - Mobile */}
    <div className="lg:hidden divide-y divide-slate-100">
      {orders.map((row) => (
        <div key={row.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">#{row.id}</p>
            <p className="text-xs font-medium text-slate-500">{row.customer}</p>
            <p className="text-sm font-bold text-[#811331] pt-1">₹{Number(row.total || 0).toLocaleString()}</p>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadgeClasses(row.status)}`}>
            {row.status}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default OrdersTable;
