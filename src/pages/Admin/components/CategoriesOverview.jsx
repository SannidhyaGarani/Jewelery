import React from "react";
import { Layers, ChevronRight } from "lucide-react";

const categories = [
  { name: "Necklaces", group: "Core", count: 18, color: "bg-rose-50 text-rose-700" },
  { name: "Earrings", group: "Adornment", count: 27, color: "bg-blue-50 text-blue-700" },
  { name: "Rings", group: "Accents", count: 15, color: "bg-amber-50 text-amber-700" },
];

const CategoriesOverview = () => (
  <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers size={20} className="text-[#811331]" />
          Categories
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          High-level structure of your jewelry catalog
        </p>
      </div>
    </div>
    
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <div 
          key={cat.name}
          className="group relative rounded-2xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer"
        >
          <div className="flex justify-between items-start mb-3">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${cat.color}`}>
              {cat.group}
            </span>
            <ChevronRight size={14} className="text-slate-300 group-hover:text-[#811331] transition-colors" />
          </div>
          <p className="text-base font-bold text-slate-900">
            {cat.name}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">{cat.count} active products</p>
          
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#811331] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
        </div>
      ))}
    </div>
  </section>
);

export default CategoriesOverview;
