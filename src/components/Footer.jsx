import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Collections",
      links: ["High Jewellery", "Bridal Selection", "Everyday Icons", "Timepieces", "New Arrivals"]
    },
    {
      title: "The House",
      links: ["Our Heritage", "The Artisans", "Responsibility", "Sustainability", "Press & Media"]
    },
    {
      title: "Services",
      links: ["Private Concierge", "Bespoke Commissions", "Jewellery Care", "Shipping & Returns", "Book an Appointment"]
    }
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 font-sans pt-32 pb-12 px-6 lg:px-20 text-white relative">
      
      <div className="max-w-[1800px] mx-auto">
        
        {/* 01. GRAND BRAND HEADER */}
        <div className="border-b border-white/5 pb-20 mb-20">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div>
              <Link to="/" className="block -ml-2 mb-8">
                <img src="/img/logo.png" alt="Velouraz" className="h-20 lg:h-28 object-contain" />
              </Link>
              <p className="text-white/40 text-[11px] tracking-[0.4em] uppercase max-w-xl leading-relaxed">
                Defining the pinnacle of artisanal brilliance. From our atelier to the modern visionary, we architect legacies in gold and light.
              </p>
            </div>
            
            {/* Newsletter as an 'Invitation' */}
            <div className="w-full lg:w-96 space-y-6">
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold">Join the Inner Circle</p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent border-b border-white/10 py-4 text-[10px] tracking-[0.3em] w-full focus:border-white transition-all duration-700 outline-none placeholder:text-white/10"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-white transition-colors">
                  <ArrowRight size={20} strokeWidth={1} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 02. ARCHITECTURAL NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          {sections.map((section) => (
            <div key={section.title} className="space-y-10">
              <h4 className="text-[10px] tracking-[0.5em] uppercase text-white/30 font-bold">
                {section.title}
              </h4>
              <ul className="space-y-5">
                {section.links.map((item) => (
                  <li key={item}>
                    <Link to="#" className="text-[12px] tracking-[0.2em] uppercase font-light text-white/60 hover:text-accent transition-all duration-500 hover:pl-2">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Boutique Locator / Contact Info */}
          <div className="space-y-10 border-l border-white/5 pl-0 lg:pl-10">
            <h4 className="text-[10px] tracking-[0.5em] uppercase text-white/30 font-bold">Inquiries</h4>
            <div className="space-y-8">
              <div>
                <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase mb-2">Global Flagship</p>
                <p className="text-[12px] tracking-[0.1em] font-light leading-relaxed">
                  24 Place Vendôme, Paris<br />
                  <a href="mailto:info@velouraz.in" className="hover:text-accent transition-colors">info@velouraz.in</a><br />
                  Care: +91 695035916
                </p>
              </div>
              <Link to="/contact" className="inline-block text-[11px] tracking-[0.3em] uppercase border-b border-accent pb-1 text-accent hover:text-white hover:border-white transition-all">
                Find a Boutique
              </Link>
            </div>
          </div>
        </div>

        {/* 03. THE MASTER FOOTER BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10">
          
          {/* Socials with vertical separators */}
          <div className="flex items-center gap-8">
            {['Instagram', 'Youtube', 'Pinterest'].map((social, i) => (
              <div key={social} className="flex items-center gap-8">
                <Link to="#" className="text-[9px] tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors">
                  {social}
                </Link>
                {i !== 2 && <div className="w-[1px] h-3 bg-white/10" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 text-white/20">
                <Globe size={12} strokeWidth={1} />
                <span className="text-[9px] tracking-[0.3em] uppercase font-medium">International / English</span>
             </div>
             <p className="text-[8px] tracking-[0.5em] uppercase text-white/10">
               © {currentYear} Velouraz Atelier. All rights reserved.
             </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="text-[9px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-[9px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;