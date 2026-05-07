import React from "react";

const MetricCards = ({ cards }) => (
  <section className="grid gap-5 md:grid-cols-3 mb-10">
    {cards.map((card) => (
      <article
        key={card.label}
        className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-150"
      >
        <div className="p-5">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            {card.label}
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">
            {card.value}
          </p>
          <p className="mt-2 text-xs font-medium text-slate-500">
            {card.hint || card.trend}
          </p>
        </div>
        <div className="h-1.5 w-full rounded-b-xl bg-gradient-to-r from-[#811331] via-rose-400 to-amber-300" />
      </article>
    ))}
  </section>
);

export default MetricCards;
