'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ChevronRight, HardHat, Phone, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { sluzby } from '@/src/data/sluzby';

// Split sluzby into categories for the dropdown matching the styling requested
const topServices: Array<{ name: string; href: string; highlight?: boolean }> = [
  { name: 'Všetky služby', href: '/sluzby', highlight: true },
  ...sluzby.slice(0, 5).map(s => ({ name: s.name, href: `/sluzby/${s.id}` }))
];
const secondaryServices = sluzby.slice(5).map(s => ({ name: s.name, href: `/sluzby/${s.id}` }));

const mainLinks = [
  { name: 'Domov', href: '/' },
  { name: 'Portfólio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'O nás', href: '/o-nas' },
  { name: 'Kontakt', href: '/kontakt' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const pathname = usePathname();
  let currentPage = 'other';
  if (pathname === '/') currentPage = 'home';
  else if (pathname === '/portfolio') currentPage = 'portfolio';
  else if (pathname === '/o-nas') currentPage = 'about';
  else if (pathname === '/blog') currentPage = 'blog';
  else if (pathname === '/kontakt') currentPage = 'contact';
  else if (pathname.startsWith('/sluzby')) currentPage = 'services';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = isScrolled || currentPage !== 'home';

  const handleNavClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <nav
      id="navbar-root"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isSolid
          ? 'bg-white text-zinc-900 border-zinc-100 shadow-sm py-1'
          : 'bg-transparent text-white border-white/10 py-1'
      }`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO LINK */}
        <Link
          href="/"
          onClick={handleNavClick}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className=" text-amber-500  font-bold group-hover:scale-105 transition-transform">
            <img
                src={isSolid ? "/mnsp-logo-mark-light.png" : "/mnsp-logo-mark-dark.png"}
                alt="MNSP Logo"
                style={{
                  height: "60px",
                  width: "auto",
                  maxWidth: "none",
                }}
            />
          </div>

        </Link>

        {/* DESKTOP NAVIGATION MENU */}
        <div className="hidden min-[850px]:flex items-center gap-4 lg:gap-7">
          {/* Main Home link */}
          <Link
            href="/"
            onClick={handleNavClick}
            className={`text-sm font-medium tracking-wide hover:text-amber-500 transition-colors cursor-pointer ${
              currentPage === 'home' ? 'text-amber-500 font-semibold' : ''
            }`}
          >
            Domov
          </Link>

          {/* Subpages / Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              href="/sluzby"
              onClick={handleNavClick}
              className={`flex items-center gap-1 text-sm font-medium tracking-wide hover:text-amber-500 transition-colors cursor-pointer ${
                currentPage === 'services' ? 'text-amber-500 font-semibold' : ''
              }`}
            >
              Služby
              <ChevronDown className="w-4 h-4" />
            </Link>

            {/* Premium dropdown block */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-64  bg-white border border-zinc-150 shadow-xl py-2 z-50 text-zinc-800"
                >
                  {topServices.map((srv) => (
                    <Link
                      key={srv.href}
                      href={srv.href}
                      onClick={() => {
                        handleNavClick();
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-50 hover:text-amber-600 transition-colors cursor-pointer block ${
                        srv.highlight ? 'text-amber-600 border-b border-zinc-100 font-extrabold pb-3 mb-1' : ''
                      } ${
                        pathname === srv.href ? 'text-amber-600 bg-amber-50/40' : ''
                      }`}
                    >
                      {srv.name}
                    </Link>
                  ))}
                  
                  <div className="border-t border-zinc-100 my-1"></div>
                  
                  {/* SECONDARY DROPDOWN HOVER */}
                  <div 
                    className="relative group/trades px-4 py-2.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider hover:bg-neutral-50 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    <span>Remeslá & Špeciálne práce</span>
                    <ChevronRight className="w-3.5 h-3.5" />

                    <div className="absolute left-full top-[-10px] ml-1 opacity-0 shadow-none pointer-events-none group-hover/trades:opacity-100 group-hover/trades:pointer-events-auto transition-opacity duration-200">
                      <div className="w-64  bg-white border border-zinc-150 shadow-xl py-2 z-50 text-zinc-800">
                        {secondaryServices.map((sec) => (
                          <Link 
                            key={sec.href}
                            href={sec.href}
                            onClick={() => {
                              handleNavClick();
                              setIsDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-neutral-50 hover:text-amber-600 transition-colors cursor-pointer block"
                          >
                            {sec.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Main Pages Links */}
          {mainLinks.slice(1).map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={`text-sm font-medium tracking-wide hover:text-amber-500 transition-colors cursor-pointer ${
                  isActive ? 'text-amber-500 font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* TOP RIGHT TELEPHONE BUTTON */}
        <div className="hidden min-[1100px]:flex items-center gap-5">
          <div className="hidden min-[1100px]:block text-right">
            <span className={`block text-[9px] font-mono tracking-wider ${
              isSolid ? 'text-zinc-400' : 'text-zinc-300'
            }`}>
              KONTAKTNÁ LINKA
            </span>
            <a href="tel:+421950699585" className="text-sm font-bold tracking-tight hover:text-amber-500 transition-colors">
              +421 950 699 585
            </a>
          </div>

          <Link
            href="/kalkulacka"
            onClick={handleNavClick}
            className={`flex items-center gap-1.5 px-4 py-2.5  text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              isSolid
                ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm'
                : 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-md'
            }`}
          >
            Kalkulačka
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* MOBILE BURGER TRIGGER */}
        <div className="min-[850px]:hidden flex items-center gap-3">
          <Link
            href="/kalkulacka"
            onClick={handleNavClick}
            className="p-2 bg-amber-500 text-zinc-950  hover:bg-amber-400 transition-colors cursor-pointer inline-flex items-center"
            title="Kalkulácia"
          >
            <Phone className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`p-2  border transition-colors cursor-pointer ${
              isSolid ? 'border-zinc-200 hover:bg-zinc-50 text-zinc-900' : 'border-white/20 hover:bg-white/10 text-white'
            }`}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE POPUP DRAWER NAVIGATION */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="min-[850px]:hidden bg-white border-b border-zinc-150 text-zinc-900 overflow-hidden shadow-lg absolute top-full left-0 right-0 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="px-6 py-6 space-y-6">
              
              {/* Main Links */}
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  onClick={handleNavClick}
                  className={`text-left text-base font-semibold ${currentPage === 'home' ? 'text-amber-600' : ''}`}
                >
                  Domov
                </Link>

                {/* Services Section Header (Collapsible inside drawer) */}
                <div className="border-t border-zinc-100 pt-3">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Naše služby</p>
                  <div className="grid grid-cols-1 gap-2.5 pl-2">
                    {topServices.map((srv) => (
                      <Link
                        key={srv.href}
                        href={srv.href}
                        onClick={handleNavClick}
                        className={`text-left text-sm font-medium hover:text-amber-600 transition-colors block ${
                          srv.highlight ? 'text-amber-600 border-b border-zinc-50 pb-2 mb-1.5 font-bold' : 'text-zinc-600'
                        } ${
                          pathname === srv.href ? 'text-amber-600 font-semibold' : ''
                        }`}
                      >
                        {srv.name}
                      </Link>
                    ))}
                    <div className="border-t border-zinc-50 my-1"></div>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mt-2 mb-1">Remeslá & Špeciálne práce</p>
                    {secondaryServices.map((sec) => (
                      <Link
                         key={sec.href}
                         href={sec.href}
                         onClick={handleNavClick}
                         className="text-left text-sm font-medium text-zinc-600 hover:text-amber-600 transition-colors block"
                      >
                         {sec.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-3 flex flex-col gap-4">
                  {mainLinks.slice(1).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleNavClick}
                      className={`text-left text-base font-semibold ${pathname.startsWith(link.href) ? 'text-amber-600' : ''}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Direct Telephone Access */}
              <div className="bg-neutral-50  p-4 space-y-3.5 border border-zinc-100 text-center">
                <p className="text-xs font-medium text-zinc-500">Potrebujete poradiť s projektom?</p>
                <a href="tel:+421900000000" className="block text-lg font-bold text-zinc-900 hover:text-amber-600">
                  +421 900 000 000
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

