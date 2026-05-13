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
      links: [
        { name: "Private Concierge", href: "#" },
        { name: "Bespoke Commissions", href: "#" },
        { name: "Jewellery Care", href: "#" },
        { name: "Shipping & Returns", href: "/return-policy" },
        { name: "Book an Appointment", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-[#FDFAF5] border-t border-[#640D14]/10 font-sans pt-32 pb-12 px-6 lg:px-20 text-[#2C1A0E] relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.02] pointer-events-none">
        <span className="text-[500px] font-serif italic text-[#640D14]">V</span>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* 01. GRAND BRAND HEADER */}
        <div className="border-b border-[#640D14]/10 pb-20 mb-20">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div>
              <Link to="/" className="block -ml-2 mb-8">
                <img src="/img/logo.png" alt="Velouraz" className="h-20 lg:h-28 object-contain brightness-[0.2]" />
              </Link>
              <p className="text-[#5C3D1E]/60 text-[11px] tracking-[0.4em] uppercase max-w-xl leading-relaxed font-medium">
                Defining the pinnacle of artisanal brilliance. From our atelier to the modern visionary, we architect legacies in gold and light.
              </p>
            </div>
            
            {/* Newsletter as an 'Invitation' */}
            <div className="w-full lg:w-96 space-y-6">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#640D14] font-bold">Join the Inner Circle</p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent border-b border-[#640D14]/20 py-4 text-[10px] tracking-[0.3em] w-full focus:border-[#640D14] transition-all duration-700 outline-none placeholder:text-[#640D14]/20 text-[#2C1A0E] font-bold"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#640D14]/30 group-hover:text-[#640D14] transition-colors">
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 02. ARCHITECTURAL NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          {sections.map((section) => (
            <div key={section.title} className="space-y-10">
              <h4 className="text-[10px] tracking-[0.5em] uppercase text-[#640D14]/40 font-bold">
                {section.title}
              </h4>
              <ul className="space-y-5">
                {section.links.map((item) => (
                  <li key={typeof item === 'string' ? item : item.name}>
                    <Link to={typeof item === 'string' ? "#" : item.href} className="text-[12px] tracking-[0.2em] uppercase font-bold text-[#5C3D1E]/60 hover:text-[#640D14] transition-all duration-500 hover:pl-2">
                      {typeof item === 'string' ? item : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Boutique Locator / Contact Info */}
          <div className="space-y-10 border-l border-[#640D14]/10 pl-0 lg:pl-10">
            <h4 className="text-[10px] tracking-[0.5em] uppercase text-[#640D14]/40 font-bold">Inquiries</h4>
            <div className="space-y-8">
              <div>
                <p className="text-[11px] tracking-[0.2em] text-[#640D14]/60 uppercase mb-2 font-bold">Global Flagship</p>
                <p className="text-[12px] tracking-[0.1em] font-medium leading-relaxed text-[#2C1A0E]/80">
                  24 Place Vendôme, Paris<br />
                  <a href="mailto:info@velouraz.in" className="hover:text-[#640D14] transition-colors">info@velouraz.in</a><br />
                  Care: +91 695035916
                </p>
              </div>
              <Link to="/contact" className="inline-block text-[11px] tracking-[0.3em] uppercase border-b border-[#640D14]/30 pb-1 text-[#640D14] hover:text-[#2C1A0E] hover:border-[#2C1A0E] transition-all font-bold">
                Find a Boutique
              </Link>
            </div>
          </div>
        </div>

        {/* 03. THE MASTER FOOTER BAR */}
        <div className="pt-12 border-t border-[#640D14]/10 flex flex-col lg:flex-row justify-between items-center gap-10">
          
          {/* Socials with vertical separators */}
          <div className="flex items-center gap-8">
            {['Instagram', 'Youtube', 'Pinterest'].map((social, i) => (
              <div key={social} className="flex items-center gap-8">
                <Link to="#" className="text-[9px] tracking-[0.4em] uppercase text-[#5C3D1E]/40 hover:text-[#640D14] transition-colors font-bold">
                  {social}
                </Link>
                {i !== 2 && <div className="w-[1px] h-3 bg-[#640D14]/10" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 text-[#640D14]/30">
                <Globe size={12} strokeWidth={1.5} />
                <span className="text-[9px] tracking-[0.3em] uppercase font-bold">International / English</span>
             </div>
             <p className="text-[8px] tracking-[0.5em] uppercase text-[#640D14]/20 font-bold">
               © {currentYear} Velouraz Atelier. All rights reserved.
             </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-8">
            <Link to="/return-policy" className="text-[9px] tracking-[0.3em] uppercase text-[#5C3D1E]/40 hover:text-[#640D14] transition-colors font-bold">
              Return Policy
            </Link>
            <Link to="/privacy-policy" className="text-[9px] tracking-[0.3em] uppercase text-[#5C3D1E]/40 hover:text-[#640D14] transition-colors font-bold">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-[9px] tracking-[0.3em] uppercase text-[#5C3D1E]/40 hover:text-[#640D14] transition-colors font-bold">
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};


export default Footer;