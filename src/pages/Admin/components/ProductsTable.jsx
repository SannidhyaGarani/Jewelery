import React from "react";
import { statusBadgeClasses } from "./AdminUtils";
import CSVUpload from "./CSVUpload";

const ProductsTable = ({ products, onAddProduct, onEditProduct, onDeleteProduct, onRefresh }) => (
  <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">Products</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Products in your Firestore catalog
        </p>
      </div>
      <div className="flex items-center gap-3">
        <CSVUpload onComplete={onRefresh} />
        <button
          type="button"
          onClick={onAddProduct}
          className="px-3 py-1.5 rounded-lg bg-[#811331] text-white text-xs font-medium shadow-sm hover:bg-[#650f27]"
        >
          Add Product
        </button>
        <span className="px-3 py-1 rounded-full bg-[#811331]/5 text-xs font-medium text-[#811331]">
          {products.length} items
        </span>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50/60">
          <tr className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Category</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3">Stock</th>
            <th className="px-5 py-3">Material</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50/60">
              <td className="px-5 py-3 text-slate-900 font-medium">
                {row.name}
              </td>
              <td className="px-5 py-3 text-slate-600">
                {row.category || "-"}
              </td>
              <td className="px-5 py-3 text-slate-900">
                ₹{Number(row.price || 0).toFixed(2)}
              </td>
              <td className="px-5 py-3 text-slate-900 font-bold">
                {row.stock || 0}
              </td>
              <td className="px-5 py-3 text-slate-600">
                {row.material || "-"}
              </td>
              <td className="px-5 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${statusBadgeClasses(
                    row.stock_status || "In Stock"
                  )}`}
                >
                  {row.stock_status || "In Stock"}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="flex justify-end gap-2">
                  {onEditProduct && (
                    <button
                      type="button"
                      onClick={() => onEditProduct(row)}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDeleteProduct(row.id)}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-5 py-6 text-center text-xs text-slate-500"
              >
                No products yet. Click &quot;Add Product&quot; to create one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
);

export default ProductsTable;
