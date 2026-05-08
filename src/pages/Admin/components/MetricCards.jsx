import React from "react";
import { motion } from "framer-motion";

const MetricCards = ({ cards }) => (
  <section className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
    {cards.map((card, index) => {
      const Icon = card.icon;
      return (
        <motion.article
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group p-6"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                {card.label}
              </p>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {card.value}
              </p>
              <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                {card.hint || card.trend}
              </p>
            </div>
            {Icon && (
              <div className="p-3 rounded-xl bg-slate-50 text-[#811331] group-hover:bg-[#811331] group-hover:text-white transition-all duration-300">
                <Icon size={24} strokeWidth={2.5} />
              </div>
            )}
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out -z-0" />
        </motion.article>
      );
    })}
  </section>
);

export default MetricCards;
