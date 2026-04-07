import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    collections: [
      { name: 'High Jewellery', href: '/shop' },
      { name: 'Bridal Selection', href: '/shop' },
      { name: 'Everyday Icons', href: '/shop' },
      { name: 'New Arrivals', href: '/shop' }
    ],
    house: [
      { name: 'Our Heritage', href: '/about' },
      { name: 'The Artisans', href: '/about' },
      { name: 'Responsibility', href: '/about' },
      { name: 'Press & Media', href: '/about' }
    ],
    client_care: [
      { name: 'Private Concierge', href: '/contact' },
      { name: 'Shipping & Logistics', href: '#' },
      { name: 'Jewellery Care', href: '#' },
      { name: 'Bespoke Services', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, name: 'INSTAGRAM', href: '#' },
    { icon: Facebook, name: 'FACEBOOK', href: '#' },
    { icon: Twitter, name: 'TWITTER', href: '#' },
  ];

  return (
    <footer className="bg-bg-cream border-t border-text-dark/5 font-sans pt-40 pb-16 px-6 lg:px-16 text-text-dark relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute left-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />
      <div className="absolute right-[5%] top-0 w-[1px] h-full bg-[#1A1A1A]/5 hidden lg:block" />

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 pb-40">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-12">
            <div>
               <Link to="/" className="font-serif text-5xl tracking-tight text-text-dark block mb-8">
                 Velouraz
               </Link>
               <p className="text-text-dark/40 text-[11px] tracking-[0.2em] uppercase leading-[2] max-w-sm">
                 Architecting timeless elegance for the modern visionary. A legacy of artisanal excellence and uncompromising brilliance.
               </p>
            </div>
            
            <div className="space-y-6">
               <p className="text-[10px] tracking-[0.4em] uppercase text-text-dark font-medium">Join Our Outer Circle</p>
               <form className="flex border-b border-text-dark/10 pb-4 group">
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL" 
                    className="bg-transparent text-[10px] tracking-[0.3em] uppercase w-full focus:outline-none placeholder:text-text-dark/20"
                  />
                  <button type="submit" className="text-text-dark/40 group-hover:text-accent transition-colors">
                     <ArrowRight size={18} strokeWidth={1.5} />
                  </button>
               </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-16 lg:gap-24">
            <div>
              <h4 className="text-[10px] tracking-[0.5em] uppercase text-text-dark/30 mb-10">Collections</h4>
              <ul className="space-y-6">
                {links.collections.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-[11px] tracking-[0.2em] uppercase font-light text-text-dark/60 hover:text-accent transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.5em] uppercase text-text-dark/30 mb-10">House</h4>
              <ul className="space-y-6">
                {links.house.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-[11px] tracking-[0.2em] uppercase font-light text-text-dark/60 hover:text-accent transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.5em] uppercase text-text-dark/30 mb-10">Client Care</h4>
              <ul className="space-y-6">
                {links.client_care.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-[11px] tracking-[0.2em] uppercase font-light text-text-dark/60 hover:text-accent transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end border-t border-text-dark/5 pt-16 gap-12">
            <div className="flex flex-col sm:flex-row gap-12 lg:gap-24 items-start sm:items-end">
               <div className="space-y-4">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-text-dark/20">Follow Us</p>
                  <div className="flex gap-10">
                     {socialLinks.map((social) => (
                       <Link key={social.name} to={social.href} className="text-[10px] tracking-[0.3em] uppercase text-text-dark/40 hover:text-accent transition-colors">
                          {social.name}
                       </Link>
                     ))}
                  </div>
               </div>
               <p className="text-[9px] tracking-[0.3em] uppercase text-text-dark/20">
                  © {currentYear} Velouraz Atelier. All Rights Reserved.
               </p>
            </div>

            <div className="flex gap-8 items-center border-b border-text-dark/10 pb-4">
               {['VISA', 'AMEX', 'MASTER', 'UPI'].map(pay => (
                 <span key={pay} className="text-[9px] tracking-[0.3em] text-text-dark/20 font-medium">{pay}</span>
               ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;