import React from "react";

const UsersTable = ({ users }) => (
  <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">Users</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          All registered users in the system
        </p>
      </div>
      <span className="px-3 py-1 rounded-full bg-[#811331]/5 text-xs font-medium text-[#811331]">
        {users.length} users
      </span>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50/60">
          <tr className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Phone</th>
            <th className="px-5 py-3">Address</th>
            <th className="px-5 py-3">Joined</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50/60">
              <td className="px-5 py-3 text-slate-900 font-medium">
                {user.displayName || user.name || "-"}
              </td>
              <td className="px-5 py-3 text-slate-600">
                {user.email || "-"}
              </td>
              <td className="px-5 py-3 text-slate-600">
                {user.phone || "-"}
              </td>
              <td className="px-5 py-3 text-slate-600">
                {user.address || "-"}
              </td>
              <td className="px-5 py-3 text-slate-600 text-xs">
                {user.createdAt 
                  ? new Date(user.createdAt.toDate?.() || user.createdAt).toLocaleDateString()
                  : "-"
                }
              </td>
              <td className="px-5 py-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium bg-emerald-50 text-emerald-700 border-emerald-100">
                  Active
                </span>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-5 py-6 text-center text-xs text-slate-500"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
);

export default UsersTable;
