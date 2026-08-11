'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight, HardHat, Phone, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BUILDING_SERVICES, TRADE_SERVICES } from '@/src/data/services';

// Split sluzby into categories for the dropdown matching the styling requested
const topServices: Array<{ name: string; href: string; highlight?: boolean }> = [
  { name: 'Všetky služby', href: '/sluzby', highlight: true },
  ...BUILDING_SERVICES.map(s => ({ name: s.name, href: `/sluzby/${s.slug}` }))
];
const secondaryServices = TRADE_SERVICES.map(s => ({ name: s.name, href: `/sluzby/${s.slug}` }));

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
            {/*
              Was a raw <img> pointing at a 2172x724 PNG (388 KB) rendered at
              315x105 — the single largest image on the site. Now a 720x240
              WebP through next/image, which also emits width/height and
              prevents layout shift.

              Both variants render and are toggled with CSS so switching on
              scroll doesn't trigger a new network request.
            */}
            <Image
                src="/mnsp-logo-mark-dark.webp"
                alt="MNSP | Stavby a rekonštrukcie"
                width={315}
                height={105}
                priority
                className={`h-[60px] w-auto max-w-none ${isSolid ? "hidden" : "block"}`}
            />
            <Image
                src="/mnsp-logo-mark-light.webp"
                alt="MNSP | Stavby a rekonštrukcie"
                width={315}
                height={105}
                priority
                className={`h-[60px] w-auto max-w-none ${isSolid ? "block" : "hidden"}`}
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

            {/* Premium dropdown block.
                Was a framer-motion AnimatePresence — that pulled motion/react
                into the Header, which renders on all 285 pages, for two enter
                transitions. CSS handles these; motion now only loads where it
                actually earns its place. */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-zinc-200 shadow-xl py-2 z-50 text-zinc-800 origin-top transition-all duration-150 ease-out ${
                isDropdownOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2.5 pointer-events-none invisible'
              }`}
              aria-hidden={!isDropdownOpen}
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
                      <div className="w-64  bg-white border border-zinc-200 shadow-xl py-2 z-50 text-zinc-800">
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
            </div>
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
      <div
        className={`min-[850px]:hidden bg-white border-b border-zinc-200 text-zinc-900 overflow-hidden shadow-lg absolute top-full left-0 right-0 overflow-y-auto transition-all duration-200 ease-out ${
          isMobileOpen
            ? 'max-h-[calc(100vh-80px)] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
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
                <a href="tel:+421950699585" className="block text-lg font-bold text-zinc-900 hover:text-amber-600">
                  +421 950 699 585
                </a>
              </div>

            </div>
      </div>
    </nav>
  );
}

