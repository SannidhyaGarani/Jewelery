import React from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2, Package, Search, Plus, MoreHorizontal } from "lucide-react";
import { statusBadgeClasses } from "./AdminUtils";
import CSVUpload from "./CSVUpload";

const ProductsTable = ({ products, onAddProduct, onEditProduct, onDeleteProduct, onRefresh }) => (
  <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="px-6 py-6 sm:px-8 border-b border-slate-100 bg-slate-50/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Package size={20} className="text-[#811331]" />
            Products
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage your store's inventory and catalog
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CSVUpload onComplete={onRefresh} />
          <button
            type="button"
            onClick={onAddProduct}
            className="flex items-center gap-2 px-4 py-2 bg-[#811331] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#811331]/10 hover:bg-[#650f27] transition-all active:scale-95"
          >
            <Plus size={14} />
            <span>New Product</span>
          </button>
          <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />
          <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
            {products.length} Items
          </span>
        </div>
      </div>
    </div>

    {/* Table View - Desktop */}
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] border-b border-slate-100 bg-slate-50/50">
            <th className="px-8 py-5">Product Info</th>
            <th className="px-6 py-5">Category</th>
            <th className="px-6 py-5">Price</th>
            <th className="px-6 py-5">Inventory</th>
            <th className="px-6 py-5">Material</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-8 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {products.map((row) => (
            <motion.tr 
              key={row.id} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="hover:bg-slate-50/80 transition-colors group"
            >
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                    {row.images?.[0] ? (
                      <img src={row.images[0]} alt={row.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Package size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 line-clamp-1">{row.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">ID: {row.id.substring(0, 8)}...</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {row.category || "Uncategorized"}
                </span>
              </td>
              <td className="px-6 py-5">
                <p className="text-sm font-bold text-slate-900">₹{Number(row.price || 0).toLocaleString()}</p>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${row.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-sm font-bold text-slate-700">{row.stock || 0}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-xs font-medium text-slate-500">
                {row.material || "-"}
              </td>
              <td className="px-6 py-5">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadgeClasses(row.stock_status || "In Stock")}`}>
                  {row.stock_status || "In Stock"}
                </span>
              </td>
              <td className="px-8 py-5">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onEditProduct && (
                    <button
                      type="button"
                      onClick={() => onEditProduct(row)}
                      className="p-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-[#811331] hover:text-white transition-all shadow-sm"
                      title="Edit Product"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDeleteProduct(row.id)}
                    className="p-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    title="Delete Product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Card View - Mobile/Tablet */}
    <div className="lg:hidden divide-y divide-slate-100">
      {products.map((row) => (
        <div key={row.id} className="p-6 space-y-4 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
              {row.images?.[0] ? (
                <img src={row.images[0]} alt={row.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Package size={24} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{row.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{row.category}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-sm font-bold text-[#811331]">₹{Number(row.price || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-3 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Inventory</p>
              <p className="text-sm font-bold text-slate-900">{row.stock || 0} units</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
              <span className={`text-[10px] font-bold uppercase ${row.stock_status === 'Out of Stock' ? 'text-red-500' : 'text-emerald-600'}`}>
                {row.stock_status || "In Stock"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            {onEditProduct && (
              <button
                onClick={() => onEditProduct(row)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
              >
                <Edit2 size={14} />
                Edit
              </button>
            )}
            <button
              onClick={() => onDeleteProduct(row.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 transition-all active:scale-95"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

    {products.length === 0 && (
      <div className="px-8 py-20 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
          <Package size={32} className="text-slate-300" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">No products found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">Your inventory is currently empty. Start adding products to see them here.</p>
        <button
          onClick={onAddProduct}
          className="mt-6 px-6 py-2.5 bg-[#811331] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#811331]/10"
        >
          Add Your First Product
        </button>
      </div>
    )}
  </section>
);

export default ProductsTable;
