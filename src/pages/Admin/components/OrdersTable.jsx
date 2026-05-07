import React from "react";
import { statusBadgeClasses } from "./AdminUtils";

const OrdersTable = ({ orders }) => (
  <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">Recent Orders</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Latest customer orders from your store
        </p>
      </div>
      <span className="px-3 py-1 rounded-full bg-slate-50 text-xs font-medium text-slate-600">
        Auto-refreshed
      </span>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50/60">
          <tr className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            <th className="px-5 py-3">Order</th>
            <th className="px-5 py-3">Customer</th>
            <th className="px-5 py-3">Total</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50/60">
              <td className="px-5 py-3 font-medium text-slate-900">
                {row.id}
              </td>
              <td className="px-5 py-3 text-slate-600">{row.customer}</td>
              <td className="px-5 py-3 text-slate-900">{row.total}</td>
              <td className="px-5 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${statusBadgeClasses(
                    row.status
                  )}`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default OrdersTable;
