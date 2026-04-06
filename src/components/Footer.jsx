import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    shop: [
      { name: 'All Pieces', href: '/shop' },
      { name: 'Bridal Collection', href: '/shop?category=Bridal' },
      { name: 'Everyday Elegance', href: '/shop?category=Everyday' },
      { name: 'New Arrivals', href: '/shop?category=New Arrivals' }
    ],
    about: [
      { name: 'Our Heritage', href: '/about' },
      { name: 'Craftsmanship', href: '/about' },
      { name: 'Sustainability', href: '/about' },
      { name: 'Contact Us', href: '/contact' }
    ],
    support: [
      { name: 'Shipping & Returns', href: '#' },
      { name: 'Jewelry Care', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Youtube, href: '#' }
  ];

  const paymentMethods = ['VISA', 'MASTERCARD', 'AMEX', 'APPLE PAY'];

  return (
    <footer className="bg-[#FAF9F6] border-t border-[#2B2B2B]/5 font-sans pt-20 pb-8 px-6 lg:px-12 text-[#2B2B2B]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Identity Column (Spans 4 columns on large screens) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="font-serif text-3xl tracking-[0.2em] text-[#2B2B2B] mb-6 block">
              Velouraz
            </Link>
            <p className="text-[#2B2B2B]/60 text-sm font-light leading-relaxed max-w-sm mb-8">
              Timeless elegance crafted for the modern visionary. Experience fine jewelry that redefines luxury, one masterpiece at a time.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index} 
                    href={social.href}
                    className="text-[#2B2B2B]/60 hover:text-[#C6A769] transition-colors duration-300"
                  >
                    <Icon strokeWidth={1.2} className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns (Span 2 to 3 columns each) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-6">Shop</h4>
            <ul className="space-y-4">
              {links.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-[#2B2B2B]/70 text-sm font-light hover:text-[#C6A769] transition-colors duration-300 relative group">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C6A769] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-6">Company</h4>
            <ul className="space-y-4">
              {links.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-[#2B2B2B]/70 text-sm font-light hover:text-[#C6A769] transition-colors duration-300 relative group">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C6A769] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-6">Support</h4>
            <ul className="space-y-4">
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-[#2B2B2B]/70 text-sm font-light hover:text-[#C6A769] transition-colors duration-300 relative group">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C6A769] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section: Separator */}
        <div className="w-full h-[1px] bg-[#2B2B2B]/10 mb-8" />

        {/* Bottom Section: Copyright & Payments */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <div className="text-[#2B2B2B]/50 text-xs font-light tracking-wider">
            &copy; {currentYear} Velouraz. All rights reserved.
          </div>

          {/* Luxury Payment Typography (Replacing bulky colored icons) */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {paymentMethods.map((method) => (
              <span 
                key={method} 
                className="text-[#2B2B2B]/40 text-[10px] tracking-[0.2em] font-medium uppercase border border-[#2B2B2B]/10 px-3 py-1 rounded-sm"
              >
                {method}
              </span>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;