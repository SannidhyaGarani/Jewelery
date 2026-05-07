import React from "react";
import { db } from "../../../components/Firebase";
import { deleteDoc, doc } from "firebase/firestore";

const AdminsTable = ({ adminsList, onAddAdmin, onLoadAdmins }) => {
  const handleDeleteAdmin = async (firestoreId) => {
    await deleteDoc(doc(db, "admins", firestoreId));
    onLoadAdmins();
  };

  return (
    <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Admins</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage admin panel access
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onAddAdmin}
            className="px-3 py-1.5 rounded-lg bg-[#811331] text-white text-xs font-medium shadow-sm hover:bg-[#650f27]"
          >
            Add Admin
          </button>
          <span className="px-3 py-1 rounded-full bg-[#811331]/5 text-xs font-medium text-[#811331]">
            {adminsList.length} admins
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50/60">
            <tr className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              <th className="px-5 py-3">Admin ID</th>
              <th className="px-5 py-3">Password</th>
              <th className="px-5 py-3">Created</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {adminsList.map((admin) => (
              <tr key={admin.firestoreId} className="hover:bg-slate-50/60">
                <td className="px-5 py-3 text-slate-900 font-medium">
                  {admin.adminId}
                </td>
                <td className="px-5 py-3 text-slate-600 font-mono text-xs">
                  {admin.password}
                </td>
                <td className="px-5 py-3 text-slate-600 text-xs">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDeleteAdmin(admin.firestoreId)}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {adminsList.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-6 text-center text-xs text-slate-500"
                >
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminsTable;
