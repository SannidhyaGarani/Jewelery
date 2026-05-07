import React from "react";

const CategoriesOverview = () => (
  <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
    <h2 className="text-sm font-semibold text-slate-900 mb-1.5">
      Categories Overview
    </h2>
    <p className="text-xs text-slate-500 mb-4">
      Manage high-level structure of your product catalog.
    </p>
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3">
        <p className="text-xs font-medium text-slate-500 uppercase">
          Core
        </p>
        <p className="text-sm font-semibold text-slate-900">
          Necklaces
        </p>
        <p className="mt-1 text-xs text-slate-500">18 products</p>
      </div>
      <div className="rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3">
        <p className="text-xs font-medium text-slate-500 uppercase">
          Adornment
        </p>
        <p className="text-sm font-semibold text-slate-900">
          Earrings
        </p>
        <p className="mt-1 text-xs text-slate-500">27 products</p>
      </div>
      <div className="rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3">
        <p className="text-xs font-medium text-slate-500 uppercase">
          Accents
        </p>
        <p className="text-sm font-semibold text-slate-900">
          Rings
        </p>
        <p className="mt-1 text-xs text-slate-500">15 products</p>
      </div>
    </div>
  </section>
);

export default CategoriesOverview;
