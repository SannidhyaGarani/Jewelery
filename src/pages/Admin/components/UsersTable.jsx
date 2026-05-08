import React from "react";
import { Users, Mail, Phone, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const UsersTable = ({ users }) => (
  <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="px-6 py-6 sm:px-8 border-b border-slate-100 bg-slate-50/30">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users size={20} className="text-[#811331]" />
            Users
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Registered customer accounts
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#811331]/5 text-[10px] font-bold text-[#811331] uppercase tracking-wider">
          {users.length} Total
        </span>
      </div>
    </div>

    {/* Table View - Desktop */}
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] border-b border-slate-100 bg-slate-50/50">
            <th className="px-8 py-5">User</th>
            <th className="px-6 py-5">Contact</th>
            <th className="px-6 py-5">Address</th>
            <th className="px-6 py-5">Joined</th>
            <th className="px-8 py-5 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
              <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-[#811331] font-bold text-sm border border-slate-200">
                    {(user.displayName || user.name || "?").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {user.displayName || user.name || "Anonymous User"}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 truncate max-w-[150px]">
                      ID: {user.id.substring(0, 8)}...
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Mail size={12} className="text-slate-400" />
                  {user.email || "-"}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                  <Phone size={12} className="text-slate-400" />
                  {user.phone || "-"}
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-start gap-1.5 text-xs text-slate-600 font-medium max-w-[200px]">
                  <MapPin size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{user.address || "No address provided"}</span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar size={12} className="text-slate-400" />
                  {user.createdAt 
                    ? new Date(user.createdAt.toDate?.() || user.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
                    : "-"
                  }
                </div>
              </td>
              <td className="px-8 py-5 text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <CheckCircle2 size={10} />
                  Active
                </span>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-8 py-16 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 text-slate-300">
                  <Users size={32} />
                </div>
                <h3 className="text-sm font-bold text-slate-900">No users found</h3>
                <p className="text-xs text-slate-500 mt-1">When users register, they will appear here.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Card View - Mobile */}
    <div className="lg:hidden divide-y divide-slate-100">
      {users.map((user) => (
        <div key={user.id} className="p-6 space-y-4 hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-[#811331] font-bold border border-slate-200">
                {(user.displayName || user.name || "?").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{user.displayName || user.name || "Anonymous"}</p>
                <p className="text-[10px] font-medium text-slate-500 mt-0.5">{user.email}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase border border-emerald-100">
              Active
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</p>
              <p className="text-xs font-semibold text-slate-700">{user.phone || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Joined</p>
              <p className="text-xs font-semibold text-slate-700">
                {user.createdAt 
                  ? new Date(user.createdAt.toDate?.() || user.createdAt).toLocaleDateString()
                  : "-"
                }
              </p>
            </div>
          </div>
          
          {user.address && (
            <div className="bg-slate-50 p-3 rounded-xl flex gap-2">
              <MapPin size={14} className="text-slate-400 flex-shrink-0" />
              <p className="text-[11px] font-medium text-slate-600 line-clamp-2">{user.address}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default UsersTable;
