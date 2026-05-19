import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "SHOP",
      links: [
        { name: "Collections", href: "/shop" },
        { name: "World Edit", href: "/world-edit" },
        { name: "The Edit", href: "/the-edit" },
        { name: "Exclusive Offers", href: "/offers" }
      ]
    },
    {
      title: "CUSTOMER CARE",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Shipping & Delivery", href: "/shipping-policy" },
        { name: "Returns & Exchanges", href: "/return-policy" },
        { name: "FAQs", href: "/faqs" }
      ]
    },
    {
      title: "ABOUT",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Craftsmanship", href: "/craftsmanship" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Care Guide", href: "/care-guide" }
      ]
    },
    {
      title: "POLICIES",
      links: [
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Refund Policy", href: "/refund-policy" },
        { name: "Shipping Policy", href: "/shipping-policy" }
      ]
    }
  ];

  return (
    <footer className="bg-[#F8F4EF] border-t border-[#D8CBBE]/30 pt-20 pb-10 px-4 lg:px-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
              <img src="/img/logo.png" alt="Velouraz" className="h-16 lg:h-20 object-contain brightness-0" />
            </Link>
            <p className="text-[#7B6D63] font-serif text-sm leading-relaxed max-w-sm">
              Curated jewellery inspired by cultures around the world, crafted for the modern you. 
              Discover pieces that tell a story of heritage and elegance.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <a href="#" className="w-10 h-10 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#D8CBBE] flex items-center justify-center text-[#2A2623] hover:bg-[#7A0E2E] hover:text-white hover:border-[#7A0E2E] transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-[10px] tracking-[0.2em] font-bold text-[#7A0E2E] uppercase">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-[13px] text-[#7B6D63] hover:text-[#7A0E2E] transition-colors font-serif"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-10 border-t border-[#D8CBBE]/30 text-center">
          <p className="text-[10px] tracking-[0.2em] font-bold text-[#7B6D63] uppercase">
            © {currentYear} Velouraz. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
